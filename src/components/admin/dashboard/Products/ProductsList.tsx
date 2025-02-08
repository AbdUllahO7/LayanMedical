import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ProductsList = ({ products, onEdit, onDelete }) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
        {products?.map((product) => (
            <Card key={product._id} className="w-[300px] text-center flex flex-col justify-center items-center gap-2">
            <CardHeader>
                <CardTitle>
                {product.listImages && (
                    <Image
                    src={product.listImages[0] ? product.listImages[0].replace('http://', 'https://') : 'https://img.freepik.com/free-photo/cement-texture_1194-6521.jpg?semt=ais_hybrid'}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover"
                    />
                )}
                </CardTitle>
                <CardDescription>
                <span className="text-primary text-xl font-bold line-clamp-1">{product.title}</span>
                </CardDescription>
            </CardHeader>
            <div className="flex justify-center items-center pb-2 gap-2">
                <Link className="bg-green-950 px-3 py-2 rounded-lg text-white" href={`/products/productDetails/${product._id}`}>
                    Details
                </Link>
                <Button className="bg-blue-950" onClick={() => onEdit(product)}>Edit</Button>
                <Button className="bg-red-900 text-white transition-all" onClick={() => onDelete(product._id)}>Delete</Button>
            </div>
            </Card>
        ))}
        </div>
    );
};

export default ProductsList;
