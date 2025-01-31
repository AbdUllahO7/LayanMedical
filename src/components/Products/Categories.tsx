'use client'
import React from 'react'
import { CardContent } from '../ui/card'
import { Card } from '../ui/card-hover-effect'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { fetchCategories } from '../../../store/admin/CategoriesSlice'
import Image from 'next/image'

const Categories = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-8'>
            {categories.map((cat, index) => (
            <div className="p-1 bg-white" key={index} >
            <Link href={`/products/prodcutDetailsCategory/${cat._id}`}>

            <Card className='bg-white shadow-xl hover:bg-blue-100 transition-colors duration-300'>
                <CardContent className="flex-col  aspect-square items-center justify-center p-6 gap-4">
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
