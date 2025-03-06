'use client'

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftCircle } from 'lucide-react';
import { ProductDetailsSection } from '@/components/Products/ProductDetailsSection';

const ProductDetails = () => {
  // Accessing the `id` from the useParams and ensuring it is a string
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;  // Ensure it's a single string

  return (
    <div className='h-full flex w-full justify-center items-start mt-[100px]'>
        <div className="w-fit">
              
            </div>
          
        <ProductDetailsSection productId={productId} />
    </div>
  );
};

export default ProductDetails;
