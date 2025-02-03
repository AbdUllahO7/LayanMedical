'use client'
import Categories from '@/components/Products/Categories'
import React from 'react'
import {  } from 'next/navigation'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'

const CategoryPage = () => {
  
  return (
      <div className='mt-[100px] mb-[150px] '>
    
              <BackgroundBeamsWithCollision className='mb-10'>
                        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                            What&apos;s cooler than Beams?{" "}
                            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                  <span className="">Exploding beams.</span>
                              </div>
                            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                                <span className="">Exploding beams.</span>
                            </div>
                            </div>
                        </h2>
                    </BackgroundBeamsWithCollision>
                    <div className="mx-auto mb-10 text-center">
        <h2 className="font-bold text-3xl text-[#137E8C]">Categories</h2>
      </div>
      <div className='container'>
        <Categories/>

      </div>
    </div>
  )
}

export default CategoryPage;
