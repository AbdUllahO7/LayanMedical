"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Edit, Eye, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'


// Animation variants for staggered card appearance
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

const ProductsList = ({ 
  products = [], 
  onEdit, 
  onDelete 
}) => {
  // Function to handle image error
  const handleImageError = (e) => {
    e.target.src = 'https://img.freepik.com/free-photo/cement-texture_1194-6521.jpg?semt=ais_hybrid'
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products?.map((product) => (
        <motion.div key={product._id} variants={itemVariants}>
          <Card className="h-full overflow-hidden group bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="relative pt-4 px-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                {product.listImages && (
                  <Image
                    src={product.listImages[0] 
                      ? product.listImages[0].replace('http://', 'https://') 
                      : 'https://img.freepik.com/free-photo/cement-texture_1194-6521.jpg?semt=ais_hybrid'
                    }
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={handleImageError}
                  />
                )}
                
                {/* Optional: Add a status badge if you have product status */}
                <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                  In Stock
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4 pt-5">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 mb-1">
                {product.title}
              </h3>
              
              {/* Optional: Add a short description if available */}
              <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px]">
                {product.description || "High-quality product for medical professionals"}
              </p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 justify-between">
              <Link 
                href={`/products/productDetails/${product._id}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Details</span>
              </Link>
              
              <Link 
                href={`/admin/dashboard/AddProduct?edit=${product._id}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product
                      and remove its data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => onDelete(product._id)}
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
      
      {products.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-6 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">Get started by adding your first product.</p>
          <Button className="mt-4 bg-green-600 hover:bg-green-700">
            Add Product
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export default ProductsList
