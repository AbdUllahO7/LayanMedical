import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Editor } from "primereact/editor";
import { MultiImageUpload } from '../../../../../hooks/MlutiImageUpload';

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
  selectedCategoryIds : string[];
  uploadedImageUrls: string[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imageFiles: File[];
  imageLoadingState: boolean;
  setImageLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  title : string,
  description : string,
  features : string 
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
      // Set fields to editing product values when in edit mode
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setSelectedCategoryIds(editingProduct.categories || []);
      setFeatures(editingProduct.features || '');
    }
  }, [isEditMode, editingProduct, setTitle, setDescription, setSelectedCategoryIds, setFeatures]);

  return (
    <DialogContent className="sm:max-w-[825px] h-[95vh]">
      <DialogHeader>
        <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogDescription>
          {isEditMode ? "Edit the details of the product." : "Fill out the form below to add a new product."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="flex-col justify-center items-center gap-3">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              value={title}  // Ensure this field is controlled
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="flex-col justify-center items-center gap-3">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              value={description}  // Controlled component
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <div className="flex-col justify-center items-center gap-3">
            <Label htmlFor="features" className="text-right">Features</Label>
            <Editor
              value={features}  // Controlled component for features
              onTextChange={(e) => setFeatures(e.htmlValue)} 
              style={{ height: '120px', width: '100%' }} 
            />
          </div>
          {/* Category select */}
          <div className="flex-col justify-center items-center gap-3">
            <Label htmlFor="category" className="text-right">Categories</Label>
            <Select
              value={selectedCategoryIds.join(',')}  // Bind to state
              onValueChange={(value) => setSelectedCategoryIds(value.split(','))} 
            >
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
            isEditMode={!!isEditMode}
          />
        </div>
        <DialogFooter>
          <Button type="submit">{isEditMode ? 'Update' : 'Save'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};


export default ProductForm;
