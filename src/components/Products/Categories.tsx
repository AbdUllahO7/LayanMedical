import React from 'react'
import { CardContent } from '../ui/card'
import { Card } from '../ui/card-hover-effect'
import Link from 'next/link'

const Categories = () => {
  return (

    <div className='grid grid-cols-1 md:grid-cols-6 gap-8'>
            {Array.from({ length: 10 }).map((_, index) => (
            <div className="p-1 bg-white" key={index} >
            <Link href="/products/product/:id">

            <Card className='bg-white shadow-xl'>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
            </Card>
            </Link>

            </div>
        ))}

    </div>

    )
}

export default Categories
