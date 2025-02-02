"use client";
import React, { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../../../store/admin/ProductsSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

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
                <Button  className='bg-lightColor hover:bg-logoColor w-fit' onClick={()=> router.back()}>
                <span><ArrowLeftCircle/></span>
                    Back
            </Button>
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
                        <Link href={`/products/productDetails/${item._id}`} key={item._id}>
                            <BentoGridItem
                                title={item.title}
                                description={item.description}
                                header={item.listImages[0]}
                                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                            />
                        </Link>
                    ))}
                </BentoGrid>
            )}
        </div>
    );
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
