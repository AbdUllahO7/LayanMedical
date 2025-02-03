"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { fetchProductById } from "../../../store/admin/ProductsSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

// Destructure the 'productId' prop correctly
export function ProductDetailsSection({ productId }: { productId: string }) {

    const selectedProduct = useSelector((state: RootState) => state.products?.selectedProduct);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=> {
                dispatch(fetchProductById(productId));
    } , [dispatch, productId])



    return (
        <div className="px-6">
            <div className="max-w-2xl mx-auto antialiased relative w-full">
                    <div className="mb-10">
                        <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                            {selectedProduct?.title}
                        </h2>
                        {/* Display the productId */}
                        <p className={twMerge("text-xl mb-4")}>{selectedProduct?.description}</p>
                        <p className={twMerge("text-xl mb-4")}>
                                {selectedProduct?.categories[0]?.title}
                        </p>

                        <div className="text-sm prose prose-sm dark:prose-invert flex flex-wrap gap-9">
                            {selectedProduct?.listImages?.map((image, idx) => (
                                <Image
                                    key={`image}-${idx}`}
                                    src={image}
                                    alt={`blog-thumbnail-${idx}`}
                                    height={300}
                                    width={300}
                                    className="rounded-lg mb-10 object-cover  "
                                />
                            ))}
                        </div>
                        <div className="px-4 p-0 m-0 justify prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedProduct?.features}} />
                        </div>
            </div>
        </div>
    );
}
