import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, useEffect } from 'react'
import { createProducts } from '../../../../store/admin/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchCategories } from '../../../../store/admin/CategoriesSlice'
import { AppDispatch } from '../../../../store'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])  // Storing multiple category IDs
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = {
            title,
            description,
        }

        try {
            // Dispatch the create product action
            await dispatch(createProducts({ formData, selectedCategoryIds }))  // Send categories as an array
            // Reset form state on success (optional)
            setTitle('')
            setDescription('')
            setSelectedCategoryIds([])  // Reset the category selection
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

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
                                Make changes here. Click save when you're done.
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
                                        className="col-span-12 w-[270px]"
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

                                {/* Category selection */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Categories
                                    </Label>
                                    <Select
                                        value={selectedCategoryIds}  // Handle multiple selection
                                        onValueChange={(value) => setSelectedCategoryIds(value.split(','))}  // Split selected values into an array
                                        multiple
                                    >
                                        <SelectTrigger className="w-[270px]">
                                            <SelectValue placeholder="Select categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category._id} value={category._id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Products
