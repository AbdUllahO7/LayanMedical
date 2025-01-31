'use client'

import { TracingBeamDemo } from '@/components/admin/dashboard/productDetails/TracingBeamDemo';
import { useParams } from 'next/navigation';
import React from 'react';

const ProductDetails = () => {
  // Destructure the `id` parameter from `useParams`
    const { id } = useParams();

    console.log(id);

  return (
        <div className='mt-[100px]'>
          <TracingBeamDemo /> 
        </div>
  );
};

export default ProductDetails;
