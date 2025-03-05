'use client'
import React from 'react'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { ProductsSection } from '@/components/Products/ProductsSection'

const ProductsPage = () => {
    
    return (
        <div className='h-full flex w-full flex-wrap justify-center items-start mt-[100px]'>
            <ProductsSection showButton={false} showFilter={true}/>
        </div>
    )
}

export default ProductsPage
