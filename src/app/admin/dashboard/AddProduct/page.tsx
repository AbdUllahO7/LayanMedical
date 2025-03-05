'use client'

import ProductForm from '@/components/admin/dashboard/Products/ProductForm'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { createProduct, fetchProductById, updateProduct } from '../../../../../store/admin/ProductsSlice';
import { fetchCategories } from '../../../../../store/admin/CategoriesSlice';
import { useRouter, useSearchParams } from 'next/navigation'; // ✅ استبدال useRouter بـ useSearchParams
import { Router } from 'lucide-react';

const AddProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const toast = useToast();
    const searchParams = useSearchParams(); // ✅ استخدام useSearchParams بدلاً من useRouter
    const edit = searchParams.get('edit'); // ✅ جلب معرف المنتج من الـ URL
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

    const { categories, loading: categoriesLoading, error } = useSelector(
        (state: RootState) => state.categories
    );

    useEffect(() => {
        if (edit) {
            dispatch(fetchProductById(edit))
                .unwrap()
                .then((product) => {
                    setTitle(product.title);
                    setDescription(product.description);
                    setFeatures(product.features || '');
                    setSelectedCategoryIds(product.categories?.map((category) => category._id) || []);
                    setUploadedImageUrls(product.listImages || []);
                    setEditingProduct(product);
                    setIsEditMode(true);
                })
                .catch(() => {
                    toast.toast({ title: 'Error fetching product data', variant: 'destructive' });
                });
        } else {
            resetForm(); // إذا لم يكن في وضع التعديل، إعادة ضبط النموذج
        }
    }, [edit, dispatch]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            return toast.toast({ title: 'All fields are required!', variant: 'destructive' });
        }
    
        setImageLoadingState(true);
    
        try {
            let uploadedUrls = [...uploadedImageUrls];
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
            const productData = { title, description, listImages: uploadedUrls, features, selectedCategoryIds };

            if (isEditMode && editingProduct) {
                await dispatch(updateProduct({ id: editingProduct._id, data: productData })).unwrap();
                toast.toast({ title: 'Product updated successfully!' });
                router.push('/admin/dashboard');
            } else {
                await dispatch(createProduct({ formData: productData, selectedCategoryIds })).unwrap();
                toast.toast({ title: 'Product created successfully!' });
                router.push('/admin/dashboard');

            }
        
            queryClient.invalidateQueries({ queryKey: ['products'] });
            resetForm();
        } catch (error) {
            console.error("Error:", error);
            toast.toast({ title: 'Operation failed', variant: 'destructive' });
        } finally {
            setImageLoadingState(false);
        }
    };

    return (
        <div className='container mx-auto justify-center items-center flex-col flex mt-[200px] shadow-xl mb-20'>
            <h2 className='text-2xl font-bold '>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
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
    );
};

export default AddProduct;
