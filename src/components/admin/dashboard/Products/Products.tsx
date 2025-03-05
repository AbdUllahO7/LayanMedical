import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from '../../../../../store';
import { fetchCategories } from '../../../../../store/admin/CategoriesSlice';
import {  deleteProduct, fetchAllProducts } from '../../../../../store/admin/ProductsSlice';
import ProductsList from './ProductsList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../../../../store/api/DataHelper';
import { SkeletonCard } from '@/components/skeleton-card';
import { Plus } from 'lucide-react';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const router = useRouter()
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



  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiRequest("ProductsRoutes", "GET"),
    staleTime: 0,
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

    router.push('/admin/dashboard/AddProduct')

  };
  
  
  const handleAddProductClick = () => {
    setIsEditMode(false); // Ensure we're not in edit mode
    setTitle('')
    setDescription('')
    setFeatures('')
    resetForm();
    router.push('/admin/dashboard/AddProduct')
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
  if(isLoading) {
          return<>
              {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
              ))}
          </>
      }
  return (
    <div className="w-full">
      <div className="flex justify-between w-full items-center">
        <h2 className="font-bold text-2xl">Products</h2>
          <Button variant="outline" className='bg-main text-white duration-500' onClick={handleAddProductClick}>
                Add New Product <Plus/> 
              </Button>
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


