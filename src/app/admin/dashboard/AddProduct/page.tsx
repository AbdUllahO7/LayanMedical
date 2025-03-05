"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../../../store"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { createProduct, fetchProductById, updateProduct } from "../../../../../store/admin/ProductsSlice"
import { fetchCategories } from "../../../../../store/admin/CategoriesSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Plus, Save } from "lucide-react"
import { apiRequest } from "../../../../../store/api/DataHelper"
import ProductForm from "@/components/admin/dashboard/Products/ProductForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"

const AddProduct = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const edit = searchParams.get("edit")
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
    const [DialogOpen, setDialogOpen] = useState(false)
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([])
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [features, setFeatures] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const queryClient = useQueryClient()

    const {
        data: categories,
        isLoading: categoriesLoading,
        isError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => apiRequest("Categories/getAllCategories"),
        staleTime: 0,
    })

    useEffect(() => {
        if (edit) {
        dispatch(fetchProductById(edit))
            .unwrap()
            .then((product) => {
            setTitle(product.title)
            setDescription(product.description)
            setFeatures(product.features || "")
            setSelectedCategoryIds(product.categories?.map((category) => category._id) || [])
            setUploadedImageUrls(product.listImages || [])
            setEditingProduct(product)
            setIsEditMode(true)
            })
            .catch(() => {
            toast({
                title: "Error fetching product",
                description: "Could not load product data. Please try again.",
                variant: "destructive",
            })
            })
        } else {
        resetForm()
        }
    }, [edit, dispatch, toast]) // Added toast to dependencies

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setSelectedCategoryIds([])
        setImageFiles([])
        setUploadedImageUrls([])
        setDialogOpen(false)
        setIsEditMode(false)
        setEditingProduct(null)
        setFeatures("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !description) {
        return toast({
            title: "Missing information",
            description: "Please fill in all required fields",
            variant: "destructive",
        })
        }

    setIsSubmitting(true)
    setImageLoadingState(true)

    try {
        let uploadedUrls = [...uploadedImageUrls]
        if (imageFiles.length > 0) {
        const formData = new FormData()
        imageFiles.forEach((file) => formData.append("images", file))

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}ProductsRoutes/upload-images`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } },
        )

        if (!response.data.success) {
            throw new Error("Image upload failed")
        }
        uploadedUrls = [...response.data.images]
    }
        const productData = { title, description, listImages: uploadedUrls, features, selectedCategoryIds }

        if (isEditMode && editingProduct) {
            await dispatch(updateProduct({ id: editingProduct._id, data: productData })).unwrap()
            toast({
            title: "Product updated",
            description: "Your product has been updated successfully",
            })
            router.push("/admin/dashboard")
        } else {
            await dispatch(createProduct({ formData: productData, selectedCategoryIds })).unwrap()
            toast({
            title: "Product created",
            description: "Your new product has been added successfully",
            })
            router.push("/admin/dashboard")
        }

        queryClient.invalidateQueries({ queryKey: ["products"] })
        resetForm()
        } catch (error) {
        console.error("Error:", error)
        toast({
            title: "Operation failed",
            description: "There was an error processing your request. Please try again.",
            variant: "destructive",
        })
        } finally {
            setImageLoadingState(false)
            setIsSubmitting(false)
        }
    }

    if (categoriesLoading) {
        return (
        <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
            <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
            <Card>
                <CardHeader>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <div className="flex justify-end space-x-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
        <div className="space-y-6">
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink>{isEditMode ? "Edit Product" : "Add Product"}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                Back
            </Button>
            </div>

            <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                <div className="flex items-center gap-2">
                {isEditMode ? (
                    <div className="bg-amber-500/10 text-amber-500 p-1.5 rounded-md">
                    <Save className="h-5 w-5" />
                    </div>
                ) : (
                    <div className="bg-primary/10 text-primary p-1.5 rounded-md">
                    <Plus className="h-5 w-5" />
                    </div>
                )}
                <div>
                    <CardTitle className="text-2xl">{isEditMode ? "Edit Product" : "Add New Product"}</CardTitle>
                    <CardDescription>
                    {isEditMode
                        ? "Update your product information and details"
                        : "Fill in the details to create a new product"}
                    </CardDescription>
                </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <ProductForm
                title={title}
                description={description}
                isEditMode={isEditMode}
                editingProduct={editingProduct}
                categories={categories}
                categoriesLoading={categoriesLoading}
                error={isError}
                handleSubmit={handleSubmit}
                setTitle={setTitle}
                setDescription={setDescription}
                setFeatures={setFeatures}
                features={features}
                setSelectedCategoryIds={setSelectedCategoryIds}
                selectedCategoryIds={selectedCategoryIds}
                uploadedImageUrls={uploadedImageUrls}
                setImageFiles={setImageFiles}
                imageFiles={imageFiles}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                />
            </CardContent>
            </Card>
        </div>
        </div>
    )
}

export default AddProduct

