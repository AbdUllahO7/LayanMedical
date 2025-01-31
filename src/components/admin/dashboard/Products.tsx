import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { fetchCategories } from '../../../../store/admin/CategoriesSlice';
import { createProduct, deleteProduct, fetchAllProducts, updateProduct } from '../../../../store/admin/ProductsSlice';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '../../../../hooks/ImageUpload';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { MultiImageUpload } from '../../../../hooks/MlutiImageUpload';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { BentoGridItem } from '@/components/ui/bento-grid';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [DialogOpen, setDialogOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { categories, loading: categoriesLoading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const { products , loading: productsLoading } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);


  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setSelectedCategoryIds(product.categories || []);
    setUploadedImageUrls(product.listImages || []);
    setDialogOpen(true);
    setIsEditMode(true);
  };

  
  // In Products component
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || selectedCategoryIds.length === 0) {
      return toast.toast({ title: 'All fields are required!', variant: 'destructive' });
    }

    setImageLoadingState(true);

    try {
      let uploadedUrls = isEditMode ? [] : [...uploadedImageUrls]; // Reset old images in edit mode

      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("images", file));

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/upload-images`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (!response.data.success) {
          throw new Error("Image upload failed");
        }

        uploadedUrls = [...response.data.images]; // Only use newly uploaded images
      }

      const productData = { 
        title, 
        description, 
        listImages: uploadedUrls, 
        selectedCategoryIds 
      };

      if (isEditMode && editingProduct) {
        // Update existing product
        await dispatch(updateProduct({ id: editingProduct._id, data: productData })).unwrap();
        toast.toast({ title: 'Product updated successfully!', variant: 'default' });
      } else {
        // Create new product
        await dispatch(createProduct({ formData: productData, selectedCategoryIds })).unwrap();
        toast.toast({ title: 'Product created successfully!', variant: 'default' });
      }

      // Reset form
      resetForm();
      dispatch(fetchAllProducts());
    } catch (error) {
      console.error("Error:", error);
      toast.toast({ title: 'Failed to submit product', variant: 'destructive' });
    } finally {
      setImageLoadingState(false);
    }
  };


  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedCategoryIds([]);
    setImageFiles([]);
    setUploadedImageUrls([]);
    setDialogOpen(false);
    setIsEditMode(false);
    setEditingProduct(null);
  };





    // Handle delete category
    const handleDelete = async (id: string) => {
      try {
        // Dispatch the delete category action
        await dispatch(deleteProduct(id));
    
        // Fetch the updated list of categories
        dispatch(fetchAllProducts());
    
        // Optionally, show a success toast
        toast.toast({ title: 'Product deleted successfully'});
      } catch (error) {
        // Handle any errors that occur during the delete operation
        toast.toast({ title: 'Error deleting Product', variant: 'destructive' });
      }
    };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full items-center">
        <h2 className="font-bold text-2xl">Products</h2>
        <Dialog onOpenChange={setDialogOpen} open={DialogOpen} >
          <DialogTrigger asChild>
            <Button variant="outline">Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill out the form below to add a new product.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-[300px]" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                </div>

                {/* select category */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Categories</Label>
                  <Select value={selectedCategoryIds.join(',')} onValueChange={(value) => setSelectedCategoryIds(value.split(','))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select categories..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesLoading ? (
                        <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                      ) : error ? (
                        <SelectItem value="error" disabled>Failed to load categories</SelectItem>
                      ) : categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>{category.title}</SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-data" disabled>No categories available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <MultiImageUpload
                    imageFiles={imageFiles}
                    setImageFiles={setImageFiles}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isEditMode={false}
                  />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      
      </div>
         {/* List of products */}
        <div className='flex flex-wrap justify-center items-center gap-4 mt-4 '>
          {products.map((product: any) => (
          <Card key={product._id} className='w-[300px] text-center flex flex-col justify-center items-center gap-2'>
          <CardHeader>
            <CardTitle>
                {product.listImages && (
                    <Image
                      src={`${product.listImages[0].replace('http://', 'https://')}`}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover"
                    />
                  )}

            </CardTitle>
                  <CardDescription><span className='text-primary text-xl font-bold'>{product.title}</span></CardDescription>

          </CardHeader>
          <DialogFooter className="flex justify-center items-center  pb-2 gap-2">
          <Link className='bg-green-950 px-3 py-2 rounded-lg text-white' href={`/products/productDetails/${product._id}`} key={product._id}>
              Details
          </Link>
            <Button className='bg-blue-950'  onClick={() => handleEditClick(product)}>Edit</Button>

            <Button  className='bg-red-900 text-white  transition-all' onClick={() => handleDelete(product._id)}>
              Delete
            </Button>
            
            </DialogFooter>
        </Card>
        
        ))}
      </div>
    </div>
  );
};

export default Products;
