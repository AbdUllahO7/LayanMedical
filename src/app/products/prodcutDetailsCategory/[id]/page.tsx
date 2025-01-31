'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../../../store'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ProductsByCategory } from '@/components/Products/ProductsByCategory'

const ProductDetailsCategory = () => { // Change 'productDetailsCategory' to 'ProductDetailsCategory'
    const { id } = useParams();
    const productId = Array.isArray(id) ? id[0] : id;  // Ensure it's a single string
    const router = useRouter()

    return (
        <Provider store={store} >
        <div className='h-full flex w-full justify-center items-start mt-[100px]'>
            <div className="">
                <Button  className='bg-lightColor hover:bg-logoColor' onClick={()=> router.back()}>
                <span><ArrowLeftCircle/></span>
                Back
            </Button>
            </div>
            <ProductsByCategory categoryId={productId} />

        </div>
        </Provider>
    )
}

export default ProductDetailsCategory; 
