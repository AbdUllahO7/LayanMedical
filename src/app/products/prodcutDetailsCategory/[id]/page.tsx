'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { ProductsByCategory } from '@/components/Products/ProductsByCategory'

const ProductDetailsCategory = () => { // Change 'productDetailsCategory' to 'ProductDetailsCategory'
    const { id } = useParams();
    const productId = Array.isArray(id) ? id[0] : id;  // Ensure it's a single string


    return (
        <div className='h-full flex w-full justify-center items-start mt-[100px]'>
            <div className="">
              
            </div>
            <ProductsByCategory categoryId={productId} />

        </div>
    )
}

export default ProductDetailsCategory; 
