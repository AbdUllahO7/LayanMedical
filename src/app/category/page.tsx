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
        <h2 className="text-3xl font-bold tracking-tight pb-2 md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Categories</h2>
      </div>
      <div className='container'>
        <Categories/>
        <ProductsSection showButton={true} showFilter={false}/>
        
      </div>
    </div>
  )
}

export default CategoryPage;
