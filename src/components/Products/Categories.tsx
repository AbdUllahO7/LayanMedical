'use client'
import React from 'react'
import { CardContent } from '../ui/card'
import { Card } from '../ui/card-hover-effect'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '../../../store/api/DataHelper'
import { SkeletonCard } from '../skeleton-card'

const Categories = () => {


    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => apiRequest("Categories/getAllCategories", "GET"),
        staleTime: 0,

    });
   if(isLoading) {
            return<>
                {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
                ))}
            </>
        }


    return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            {categories?.map((cat, index) => (
            <div className="p-1 bg-white" key={index} >
            <Link href={`/products/prodcutDetailsCategory/${cat._id}`}>

            <Card className='bg-white shadow-xl hover:bg-blue-100 transition-colors duration-300'>
                <CardContent className="flex-col flex aspect-square items-center justify-center p-6 gap-4">
                        <Image
                            src={`${cat.image.replace('http://', 'https://')}`}
                            alt={cat.title}
                            width={100}
                            height={100}
                            className="w-100 h-100 object-cover"
                    />  
                        <p className='text-center pt-4 font-bold'>
                            {cat.title}
                        </p>
                    </CardContent>
            </Card>
            </Link>

            </div>
        ))}

    </div>

    )
}

export default Categories
