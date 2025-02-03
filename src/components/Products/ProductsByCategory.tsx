"use client";
import React, { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../../store/admin/ProductsSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { BentoGrid } from "../ui/bento-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";

export function ProductsByCategory({ categoryId }: { categoryId: string }) {
    const { products, loading: productsLoading } = useSelector(
        (state: RootState) => state.products
    );
    const router = useRouter()
    const [delayedLoading, setDelayedLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Simulate delay for skeleton loader (1 second delay)
        const timer = setTimeout(() => {
            setDelayedLoading(false); // Stop the delay after 1 second
        }, 100);

        // Fetch products after the delay
        dispatch(fetchProductsByCategory(categoryId));

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [dispatch, categoryId]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mx-auto mb-10 text-center">
                <h2 className="font-bold text-3xl text-[#137E8C]">Products</h2>
            
            </div>
            {/* Conditional Rendering: Show Skeleton if delayedLoading is true, otherwise show products */}
            {delayedLoading || productsLoading ? (
                <BentoGrid className="max-w-4xl mx-auto">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </BentoGrid>
            ) : (
                <BentoGrid className="max-w-4xl mx-auto">
                    {products.map((item, i) => (
                        <div key={item._id}>
                    <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 bg-white dark:bg-zinc-900">
                        <Link href={`/products/productDetails/${item._id}`} key={item._id}>
                          <Image
                            src={item.listImages[0]}
                            alt={item.title}
                            height="400"
                            width="400"
                            className="object-contain rounded-lg"
                          />
                        </Link>
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 line-clamp-1">
                            {item.title}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                            {item.description}
                        </p>
                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <Link href="https://layandent.com/">Buy now</Link>
          
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                              {/* ${item.price || "100"} */}
                            </span>
                          </button>
                        </BackgroundGradient>
                      </div>
                    ))}
                </BentoGrid>
            )}
        </div>
    );
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
