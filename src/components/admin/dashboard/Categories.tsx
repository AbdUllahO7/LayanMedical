'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../../../store/admin/CategoriesSlice';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import ImageUpload from '../../../../hooks/ImageUpload';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Categories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);

  // Form state
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any | null>(null); // For updating an existing category
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle form submission for adding or updating a category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return toast.toast({ title: 'Please enter a title.', variant: 'destructive' });
    if (!uploadedImageUrl) {
      toast.toast({ title: 'Image is required', variant: 'destructive' });
      return;
    }
  
    const categoryData = { title, image: uploadedImageUrl };
  
    if (currentCategory) {
      await dispatch(updateCategory({ id: currentCategory._id, ...categoryData }))
        .unwrap()
        .then(() => {
          toast.toast({ title: 'Category updated successfully' });
        })
        .catch(() => {
          toast.toast({ title: 'Error updating category', variant: 'destructive' });
        });
    } else {
      await dispatch(createCategory(categoryData))
        .unwrap()
        .then(() => {
          toast.toast({ title: 'Category added successfully' });
        })
        .catch(() => {
          toast.toast({ title: 'Error adding category', variant: 'destructive' });
        });
    }
  
    // Reset form and close dialog
    setTitle('');
    setImageFile(null);
    setUploadedImageUrl('');
    setIsDialogOpen(false);
    setCurrentCategory(null);
  };
  
  // Handle delete category
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.toast({ title: 'Category deleted successfully' });
    } catch (error) {
      toast.toast({ title: 'Error deleting category', variant: 'destructive' });
    }
  };
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full">
      <div className="flex justify-between w-full items-center">
        <h2 className="font-bold text-2xl">Categories</h2>
        <Dialog open={isDialogOpen}  onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setCurrentCategory(null);
                setTitle('');
                setImageFile(null);
                setUploadedImageUrl('');
              }
            }}>
          <DialogTrigger asChild>
            <Button variant="outline">{currentCategory ? 'Update Category' : 'Add New Category'}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentCategory ? 'Update Category' : 'Add New Category'}</DialogTitle>
              <DialogDescription>
                Fill out the form below to {currentCategory ? 'update' : 'add'} a category.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3 w-[280px]"
                  />
                </div>
                {/* Image Upload */}
                <ImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isEditMode={!!currentCategory} // If updating, set to true
                    urlToUpload={`${process.env.NEXT_PUBLIC_API_BASE_URL}Categories/upload-image`}
                  />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={imageLoadingState}>{currentCategory ? 'Update' : 'Save'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* List of Categories */}
      <div className='flex flex-wrap justify-center items-center gap-4 mt-4 '>
        {categories.map((category: any) => (
          <Card key={category._id} className='w-[300px] text-center flex flex-col justify-items-center items-center gap-2'>
          <CardHeader>
            <CardTitle>
              {category.image && (
                <Image
                  src={`${category.image.replace('http://', 'https://')}`}
                  alt={category.title}
                  width={100}
                  height={100}
                  className="w-32 h-32 object-cover"
                />
              )}
            </CardTitle>
            <CardDescription>{category.title}</CardDescription>
          </CardHeader>
          <DialogFooter className="flex justify-center items-center  pb-2 gap-2">
          
            <Button  
              onClick={() => {
                      setCurrentCategory(category); // Set the selected category
                      setTitle(category.title); // Populate title
                      setUploadedImageUrl(category.image); // Populate image URL
                      setIsDialogOpen(true); // Open the dialog
                    }}
                >Update</Button>
                  <Button  className='bg-red-900 text-white  transition-all' onClick={() => handleDelete(category._id)}>
              Delete
            </Button>
          </DialogFooter>
        </Card>
        
        ))}
      </div>
    </div>
  );
};

export default Categories;
