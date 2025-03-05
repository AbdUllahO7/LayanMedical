'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AppDispatch } from '../../../../../store'
import { createCategory, updateCategory, deleteCategory } from '../../../../../store/admin/CategoriesSlice'
import { apiRequest } from '../../../../../store/api/DataHelper'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Loader2, Plus, Search, Trash2, Upload } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SkeletonCard } from '@/components/skeleton-card'
import ImageUpload from '../../../../../hooks/ImageUpload'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

const Categories: React.FC = () => {
  // Form state
  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const { toast } = useToast()
  const dispatch = useDispatch<AppDispatch>()
  const queryClient = useQueryClient()

  // Fetch categories with React Query
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiRequest("Categories/getAllCategories"),
    staleTime: 0,
  })

  // Filter categories based on search query
  const filteredCategories = categories 
    ? categories.filter((category: any) => 
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  // Handle form submission for adding or updating a category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validation
    if (title.trim() === '') {
      toast({
        title: 'Validation Error',
        description: 'Please enter a category title',
        variant: 'destructive'
      })
      return
    }
    
    if (!uploadedImageUrl) {
      toast({
        title: 'Validation Error',
        description: 'Please upload a category image',
        variant: 'destructive'
      })
      return
    }

    const categoryData = { title, image: uploadedImageUrl }

    try {
      if (currentCategory) {
        await dispatch(updateCategory({ id: currentCategory._id, ...categoryData })).unwrap()
        toast({
          title: 'Success',
          description: 'Category updated successfully',
          variant: 'default'
        })
      } else {
        await dispatch(createCategory(categoryData)).unwrap()
        toast({
          title: 'Success',
          description: 'Category added successfully',
          variant: 'default'
        })
      }
      
      // Invalidate the categories query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      
      // Reset form
      resetForm()
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${currentCategory ? 'update' : 'add'} category. Please try again.`,
        variant: 'destructive'
      })
    }
  }
  
  // Handle delete category
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCategory(id)).unwrap()
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
        variant: 'default'
      })
      // Invalidate the categories query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsDeleteDialogOpen(false)
      setCategoryToDelete(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete category. Please try again.',
        variant: 'destructive'
      })
    }
  }
  
  // Reset form fields
  const resetForm = () => {
    setTitle('')
    setImageFile(null)
    setUploadedImageUrl('')
    setIsDialogOpen(false)
    setCurrentCategory(null)
  }

  // Handle edit category
  const handleEdit = (category: any) => {
    setCurrentCategory(category)
    setTitle(category.title)
    setUploadedImageUrl(category.image)
    setIsDialogOpen(true)
  }

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Categories</h2>
          <div className="w-32 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    )
  }

  // Render error state
  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-red-800">Error Loading Categories</h3>
          <p className="mt-2 text-sm text-red-700">
            We couldn't load the categories. Please try refreshing the page.
          </p>
          <Button 
            className="mt-4" 
            variant="outline"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['categories'] })}
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-[250px]"
            />
          </div>
          
          {/* Add category button */}
          <Dialog 
            open={isDialogOpen} 
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-main hover:bg-main/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {currentCategory ? 'Update Category' : 'Add New Category'}
                </DialogTitle>
                <DialogDescription>
                  Fill out the form below to {currentCategory ? 'update the' : 'add a new'} category.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                {/* Title input */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Category Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter category title"
                    className="w-full"
                  />
                </div>
                
                {/* Image upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category Image</Label>
                  <div className="mt-1 flex flex-col gap-4">
                    {/* Image preview */}
                    {uploadedImageUrl && (
                      <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={uploadedImageUrl.replace('http://', 'https://') || "/placeholder.svg"}
                          alt="Category preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Custom image upload UI */}
                    <div className="flex items-center justify-center">
                      <ImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={!!currentCategory}
                        urlToUpload={`${process.env.NEXT_PUBLIC_API_BASE_URL}Categories/upload-image`}
                      
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={imageLoadingState || !title.trim() || !uploadedImageUrl}
                    className="bg-main hover:bg-main/90"
                  >
                    {currentCategory ? 'Update Category' : 'Add Category'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Categories grid */}
      {filteredCategories.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No Categories Found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery 
              ? `No categories matching "${searchQuery}". Try a different search term.` 
              : "Get started by adding your first category."}
          </p>
          {searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredCategories.map((category: any) => (
              <motion.div 
                key={category._id} 
                variants={itemVariants}
                layout
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Card className="overflow-hidden h-full group hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="relative pt-4 px-4">
                    <div className="relative w-full h-48  overflow-hidden bg-gray-100">
                      {category.image && (
                        <Image
                          src={category.image.replace('http://', 'https://') || "/placeholder.svg"}
                          alt={category.title}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-center line-clamp-1 mb-1">
                      {category.title}
                    </h3>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-center gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1 hover:bg-gray-50"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    
                    <AlertDialog
                      open={isDeleteDialogOpen && categoryToDelete === category._id}
                      onOpenChange={(open) => {
                        setIsDeleteDialogOpen(open)
                        if (!open) setCategoryToDelete(null)
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive"
                          className="flex-1"
                          onClick={() => setCategoryToDelete(category._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{category.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(category._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default Categories
