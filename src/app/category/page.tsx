'use client'
import Categories from '@/components/Products/Categories'
import React from 'react'
import {  } from 'next/navigation'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { ProductsSection } from '@/components/Products/ProductsSection'

const CategoryPage = () => {
  
  return (
      <div className='mt-[100px] mb-[150px] '>
          
        <div className="mx-auto mb-10 text-center">
        <h2 className="font-bold text-3xl text-main">Categories</h2>
      </div>
      <div className='container'>
        <Categories/>
        <ProductsSection showButton={true} showFilter={false}/>
        
      </div>
    </div>
  )
}

export default CategoryPage;
