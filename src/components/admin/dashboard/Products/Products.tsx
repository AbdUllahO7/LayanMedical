import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from '../../../../../store';
import { fetchCategories } from '../../../../../store/admin/CategoriesSlice';
import { createProduct, deleteProduct, fetchAllProducts, updateProduct } from '../../../../../store/admin/ProductsSlice';
import ProductsList from './ProductsList';
import ProductForm from './ProductForm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../../../../store/api/DataHelper';

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
  const [features, setFeatures] = useState('');
  const queryClient = useQueryClient();

  const { categories, loading: categoriesLoading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiRequest("ProductsRoutes", "GET"),
  });


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);


  const handleEditClick = (product: any) => {

    setEditingProduct(product);
    setTitle(product.title);  // Set the title
    setDescription(product.description);  // Set the description
    setSelectedCategoryIds(product.categories || []);  // Set selected categories
    setUploadedImageUrls([]);  // Set the uploaded images
    setFeatures(product.features || '');  // Set the features text
    setDialogOpen(true);
    setIsEditMode(true); // Set edit mode to true when editing an existing product
  };
  
  
  const handleAddProductClick = () => {
    setIsEditMode(false); // Ensure we're not in edit mode
    setDialogOpen(true);
    setTitle('')
    setDescription('')
    setFeatures('')
    resetForm();

  };
  
  // In Products component
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      return toast.toast({ title: 'All fields are required!', variant: 'destructive' });
    }

    setImageLoadingState(true);

    try {
      let uploadedUrls = [...uploadedImageUrls];

      // Upload new images if any
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
        uploadedUrls = [...response.data.images];
      }

      const productData = { 
        title, 
        description, 
        listImages: uploadedUrls,
        features, 
        selectedCategoryIds 
      };

      if (isEditMode && editingProduct) {
        await dispatch(updateProduct({ 
          id: editingProduct._id, 
          data: productData 
        })).unwrap();
        toast.toast({ title: 'Product updated successfully!' });
      } else {
        await dispatch(createProduct({ 
          formData: productData, 
          selectedCategoryIds 
        })).unwrap();
        toast.toast({ title: 'Product created successfully!' });
      }

      // Invalidate queries and reset form
      queryClient.invalidateQueries({ queryKey: ['products'] });
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.toast({ title: 'Operation failed', variant: 'destructive' });
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
        await dispatch(deleteProduct(id)).unwrap();
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.toast({ title: 'Product deleted successfully' });
      } catch (error) {
        toast.toast({ title: 'Deletion failed', variant: 'destructive' });
      }
    };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full items-center">
        <h2 className="font-bold text-2xl">Products</h2>
        <Dialog onOpenChange={setDialogOpen} open={DialogOpen} >
        <DialogTrigger asChild>
              <Button variant="outline" onClick={handleAddProductClick}>
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill out the form below to add a new product.</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
            <ProductForm
                  title={title}
                  description={description}
                  isEditMode={isEditMode}
                  editingProduct={editingProduct}
                  categories={categories}
                  categoriesLoading={categoriesLoading}
                  error={error}
                  handleSubmit={handleSubmit}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setFeatures={setFeatures}
                  features={features}
                  setSelectedCategoryIds={setSelectedCategoryIds}
                  selectedCategoryIds = {selectedCategoryIds}
                  uploadedImageUrls={uploadedImageUrls}
                  setImageFiles={setImageFiles}
                  imageFiles={imageFiles}
                  imageLoadingState={imageLoadingState}
                  setImageLoadingState={setImageLoadingState}
          />
                </div>
          </DialogContent>
        </Dialog>
      
      </div>
         {/* List of products */}
          <ProductsList 
            products={products}
            onDelete={handleDelete}
            onEdit={handleEditClick}
            
          />
      
    </div>
  );
};

export default Products;  


