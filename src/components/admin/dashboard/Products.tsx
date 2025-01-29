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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { fetchCategories } from '../../../../store/admin/CategoriesSlice';
import { createProduct } from '../../../../store/admin/ProductsSlice';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { categories, loading: categoriesLoading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const { loading: productLoading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds((prev) => prev.filter((id) => id !== categoryId));
    } else {
      setSelectedCategoryIds((prev) => [...prev, categoryId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Form validation
    if (!title) {
      alert("Please enter a title.");
      return;
    }
    if (!description) {
      alert("Please enter a description.");
      return;
    }
    if (selectedCategoryIds.length === 0) {
      alert("Please select at least one category.");
      return;
    }
  
    setIsSubmitting(true);
  
    const formData = {
      title,
      description,
    };
  
    try {
      // Dispatch createProduct action
      await dispatch(createProduct({ formData, selectedCategoryIds })).unwrap();
      alert("Product created successfully!");
  
      // Reset form fields
      setTitle("");
      setDescription("");
      setSelectedCategoryIds([]);
    } catch (error: any) {
      alert(error || "Failed to create product.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="w-full">
      <div className="flex justify-between w-full items-center">
        <h2 className="font-bold text-2xl">Products</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill out the form below and click save to add a new product.
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
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="category" className="text-right">
    Categories
  </Label>
  <div className="col-span-3">
    {categoriesLoading ? (
      <p>Loading categories...</p>
    ) : error ? (
      <p className="text-red-500">Failed to load categories. Please try again later.</p>
    ) : categories.length > 0 ? (
      categories.map((category) => (
        <div key={category._id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`category-${category._id}`}
            checked={selectedCategoryIds.includes(category._id)}
            onChange={() => handleCategoryChange(category._id)}
            className="checkbox"
          />
          <label htmlFor={`category-${category._id}`} className="text-sm">
            {category.title}
          </label>
        </div>
      ))
    ) : (
      <p>No categories available.</p>
    )}
  </div>
                </div>

              </div>
              <DialogFooter>
              <Button type="submit" disabled={isSubmitting || productLoading}>
              {isSubmitting || productLoading ? "Saving..." : "Save changes"}
            </Button>

              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Products;
