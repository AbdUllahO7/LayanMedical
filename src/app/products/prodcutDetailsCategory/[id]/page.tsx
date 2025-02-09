'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { ProductsByCategory } from '@/components/Products/ProductsByCategory'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'

const ProductDetailsCategory = () => { // Change 'productDetailsCategory' to 'ProductDetailsCategory'
    const { id } = useParams();
    const productId = Array.isArray(id) ? id[0] : id;  // Ensure it's a single string


    return (
        <div className='h-full flex w-full flex-wrap justify-center items-start mt-[100px]'>
            <ProductsByCategory categoryId={productId} />

        </div>
    )
}

export default ProductDetailsCategory; 
