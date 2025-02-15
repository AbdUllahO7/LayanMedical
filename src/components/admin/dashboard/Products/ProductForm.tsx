'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiImageUpload } from '../../../../../hooks/MlutiImageUpload';

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface ProductFormProps {
  isEditMode: boolean;
  editingProduct: any;
  categories: any[];
  categoriesLoading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFeatures: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategoryIds: string[];
  uploadedImageUrls: string[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imageFiles: File[];
  imageLoadingState: boolean;
  setImageLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  features: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  isEditMode,
  editingProduct,
  categories,
  categoriesLoading,
  error,
  handleSubmit,
  setTitle,
  setDescription,
  setFeatures,
  setSelectedCategoryIds,
  uploadedImageUrls,
  setImageFiles,
  imageFiles,
  imageLoadingState,
  setImageLoadingState,
  selectedCategoryIds,
  title,
  description,
  features
}) => {
  useEffect(() => {
    if (isEditMode && editingProduct) {
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setSelectedCategoryIds(editingProduct.categories || []);
      setFeatures(editingProduct.features || '');
    }
  }, [isEditMode, editingProduct, setTitle, setDescription, setSelectedCategoryIds, setFeatures]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        {/* Description Textarea */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Features Editor */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="features">Features</Label>
          <div className="border rounded-md overflow-hidden min-h-[150px]">
            <JoditEditor
              value={features}
              onChange={(newContent) => setFeatures(newContent)}
        
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="flex flex-col gap-2">
          <Label>Categories</Label>
          <Select
            value={selectedCategoryIds.join(',')}
            onValueChange={(value) => setSelectedCategoryIds(value.split(','))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select categories..." />
            </SelectTrigger>
            <SelectContent>
              {categoriesLoading ? (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
              ) : error ? (
                <SelectItem value="error" disabled>Error loading categories</SelectItem>
              ) : categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
        <MultiImageUpload
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isEditMode={!!isEditMode}
        />
      </div>

      {/* Dialog Footer */}
      <DialogFooter>
        <Button type="submit" disabled={imageLoadingState}>
          {isEditMode ? 'Update Product' : 'Create Product'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
