"use client"

import { useState } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight, ChevronRight, ExternalLink, Maximize2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { apiRequest } from "../../../store/api/DataHelper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export function ProductDetailsSection({ productId }: { productId: string }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxImage, setLightboxImage] = useState("")

    const {
        data: selectedProduct,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["selectedProduct", productId],
        queryFn: () => apiRequest(`ProductsRoutes/${productId}`, "GET"),
        enabled: !!productId,
        staleTime: 0,
    })

    const openLightbox = (image: string, index: number) => {
        setLightboxImage(image)
        setLightboxOpen(true)
        setActiveImageIndex(index)
    }

    if (isLoading) {
        return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-4">
                <div className="aspect-square w-full bg-gray-100 rounded-xl animate-pulse" />
                <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
                ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
                <div className="h-8 w-32 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-10 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-4 w-1/4 bg-gray-100 rounded animate-pulse" />
                <div className="space-y-2 pt-4">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                </div>
            </div>
            </div>
        </div>
        )
    }

    if (isError || !selectedProduct) {
        return (
        <div className="container mx-auto px-4 py-12 text-center">
            <div className="max-w-md mx-auto">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <X className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Product</h3>
                <p className="text-sm text-gray-500 mb-4">
                We couldn't load the product details. Please try again or contact support if the problem persists.
                </p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
            </div>
        </div>
        )
    }

    const mainImage = selectedProduct?.listImages?.[activeImageIndex] || "/placeholder.svg?height=600&width=600"
    const hasMultipleImages = selectedProduct?.listImages?.length > 1

    return (
        <div className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
            <a href="#" className="hover:text-primary transition-colors">
                Products
            </a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href="#" className="hover:text-primary transition-colors">
                {selectedProduct?.categories?.[0]?.title || "Category"}
            </a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{selectedProduct?.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Images */}
            <div className="w-full lg:w-3/5 space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden border shadow-sm group">
                <Image
                    src={mainImage || "/placeholder.svg"}
                    alt={selectedProduct?.title || "Product image"}
                    fill
                    className="object-contain p-4"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => openLightbox(mainImage, activeImageIndex)}
                >
                    <Maximize2 className="h-5 w-5" />
                    <span className="sr-only">Zoom</span>
                </Button>
                </div>

                {/* Thumbnail Gallery */}
                {hasMultipleImages && (
                <div className="grid grid-cols-5 gap-2 sm:gap-4">
                    {selectedProduct?.listImages?.map((image, idx) => (
                    <button
                        key={`thumb-${idx}`}
                        className={cn(
                        "relative aspect-square rounded-lg overflow-hidden border transition-all",
                        activeImageIndex === idx
                            ? "ring-2 ring-primary ring-offset-2"
                            : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-1",
                        )}
                        onClick={() => setActiveImageIndex(idx)}
                    >
                        <Image
                        src={image || "/placeholder.svg"}
                        alt={`${selectedProduct?.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        />
                    </button>
                    ))}
                </div>
                )}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-2/5">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                {selectedProduct?.categories?.map((category: any) => (
                    <Badge key={category._id} variant="outline" className="bg-primary/5 hover:bg-primary/10">
                    {category.title}
                    </Badge>
                ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                {selectedProduct?.title}
                </h1>

                {/* Description */}
                <div className="prose prose-gray dark:prose-invert mb-8">
                <p className="text-muted-foreground leading-relaxed">{selectedProduct?.description}</p>
                </div>

                {/* Tabs for additional information */}
                <Tabs defaultValue="features" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="pt-4">
                    {selectedProduct?.features ? (
                    <Card>
                        <CardContent className="p-4 prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: selectedProduct?.features }} />
                        </CardContent>
                    </Card>
                    ) : (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                        <p>No feature information available for this product.</p>
                        </CardContent>
                    </Card>
                    )}
                </TabsContent>
                <TabsContent value="specifications" className="pt-4">
                    <Card>
                    <CardContent className="p-4">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                            <dd className="mt-1 text-sm text-foreground">
                            {selectedProduct?.categories?.[0]?.title || "Uncategorized"}
                            </dd>
                        </div>
                        {/* Add more specifications as needed */}
                        </dl>
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                <a
                        href="https://api.whatsapp.com/message/CI6MVAYVPTSUF1?autoload=1&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                        >
                            <Button className="w-full bg-main text-white group">
                            Contact Us
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </a>
                    
                </div>
            </div>
            </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
            {lightboxOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setLightboxOpen(false)}
            >
                <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10"
                onClick={(e) => {
                    e.stopPropagation()
                    setLightboxOpen(false)
                }}
                >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
                </Button>

                <div className="relative w-full max-w-5xl aspect-square" onClick={(e) => e.stopPropagation()}>
                <Image
                    src={lightboxImage || "/placeholder.svg"}
                    alt={selectedProduct?.title || "Product image"}
                    fill
                    className="object-contain"
                />
                </div>

                {hasMultipleImages && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedProduct?.listImages?.map((_, idx) => (
                    <button
                        key={`lightbox-dot-${idx}`}
                        className={cn(
                        "w-3 h-3 rounded-full transition-all",
                        activeImageIndex === idx ? "bg-white" : "bg-white/30 hover:bg-white/60",
                        )}
                        onClick={(e) => {
                        e.stopPropagation()
                        setActiveImageIndex(idx)
                        setLightboxImage(selectedProduct.listImages[idx])
                        }}
                    />
                    ))}
                </div>
                )}
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    )
}

