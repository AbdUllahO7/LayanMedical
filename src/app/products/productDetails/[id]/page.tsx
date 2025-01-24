'use client'

import { useParams } from 'next/navigation';
import React from 'react';

const ProductDetails = () => {
  // Destructure the `id` parameter from `useParams`
    const { id } = useParams();

  return (
        <div>
        <h1>Product Detail</h1>
        <p>Product ID: {id}</p>
        </div>
  );
};

export default ProductDetails;
