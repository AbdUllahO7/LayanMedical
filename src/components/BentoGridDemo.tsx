'use client';

import React, { useEffect } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchAllProducts } from "../../store/admin/ProductsSlice";
import { BackgroundGradient } from "./ui/background-gradient";

export function BentoGridDemo({ showButton }: { showButton: boolean }) {
  const { products, loading: productsLoading } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mb-10 text-center">
        <h2 className="font-bold text-3xl text-[#137E8C]">Products</h2>
      </div>

      {/* Display Skeleton when products are loading */}
      {productsLoading ? (
        <BentoGrid className="max-w-4xl mx-auto">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </BentoGrid>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {products.slice(0,8).map((item) => (
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
        </div>
      )}

      <div className="mt-10">
        {showButton && (
          <Link
            href="/products"
            className="font-bold text-xl hover:bg-logoColor p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-[#137E8C]"
          >
            Show All
          </Link>
        )}
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
