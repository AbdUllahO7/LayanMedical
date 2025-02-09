"use client";
import React, { useEffect, useState } from "react";
import { apiRequest } from "../../../store/api/DataHelper";
import { BentoGrid } from "../ui/bento-grid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import { Button } from "../ui/button";

export function ProductsByCategory({ categoryId }: { categoryId: string }) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [delayedLoading, setDelayedLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Simulate delay for skeleton loader (100ms delay)
        const timer = setTimeout(() => {
            if (isMounted) setDelayedLoading(false);
        }, 100);

        // Fetch products using apiRequest
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await apiRequest(`ProductsRoutes/products/category/${categoryId}`, "GET");
                if (isMounted) setProducts(data); // Ensure the component is still mounted before updating state
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProducts();

        // Cleanup function
        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [categoryId]); // Re-run when categoryId changes

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mx-auto mb-10 text-center">
                <h2 className="font-bold text-3xl text-[#137E8C]">Products</h2>
            </div>

            {/* Conditional Rendering: Show Skeleton if delayedLoading or loading is true, otherwise show products */}
            {delayedLoading || loading ? (
                <BentoGrid className="max-w-4xl mx-auto">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </BentoGrid>
            ) : (
                <BentoGrid className="max-w-4xl mx-auto">
                    {products?.length > 0 ? (
                        products?.map((item) => (
                            <div key={item._id} className="h-full">
                                <BackgroundGradient className="rounded-[22px] h-full p-4 sm:p-6 bg-white dark:bg-zinc-900 flex flex-col">
                                <Link href={`/products/productDetails/${item._id}`} className="block relative h-48">
                                    <Image
                                    src={item.listImages[0]}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    className="rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </Link>
                            
                                <div className="flex-1 mt-4">
                                    <p className="text-base sm:text-xl text-black mb-2 dark:text-neutral-200 line-clamp-1">
                                    {item.title}
                                    </p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                                    {item.description}
                                    </p>
                                </div>
                            
                                <Button className="rounded-full pl-4 pr-4 py-1 text-white bg-black mt-4 text-xs font-bold dark:bg-zinc-800 self-start">
                                    <Link href="https://layandent.com/">Buy now</Link>
                                </Button>
                                </BackgroundGradient>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No products found.</p>
                    )}
                </BentoGrid>
            )}
        </div>
    );
}

// Skeleton Loader Component
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
