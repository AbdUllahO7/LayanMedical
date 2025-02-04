'use client';

import React, { useState, useMemo } from "react";
import { BentoGrid } from "./ui/bento-grid";
import Link from "next/link";
import Image from "next/image";
import { BackgroundGradient } from "./ui/background-gradient";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../store/api/DataHelper";
import { RotateCcw } from "lucide-react";
import FilterComponent from "./FilterCompoennt";

export function ProductsSection({ showButton, showFilter }) {
  const [filters, setFilters] = useState({ category: "", search: "" });

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiRequest("ProductsRoutes", "GET"),
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((item) => {
      const categoryMatch = filters.category ? item.categories?.[0]?.title === filters.category : true;
      const searchMatch = filters.search ? item.title.toLowerCase().includes(filters.search.toLowerCase()) : true;
      return categoryMatch && searchMatch;
    });
  }, [filters, products]);

  const applyFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ category: "", search: "" });
  };

  return (
    <div className="flex w-full  flex-wrap">
      {showFilter && (
        <aside className="md:w-1/6 min-w-[300px] h-screen bg-white shadow-lg p-6 sticky top-0 xs:w-full">
          <FilterComponent filters={filters} handleFilter={applyFilter} />
          <button
            onClick={resetFilters}
            className="mt-4 bg-lightColor text-white px-4 py-2 rounded-lg text-title hover:bg-hover duration-300 flex items-center gap-2 w-full"
          >
            <RotateCcw /> Reset Filters
          </button>
          
        </aside>
      )}

    

      {/* Products Grid */}
      <div className="flex-1 flex flex-col items-center p-6">
        <div className="mx-auto mb-10 text-center">
          <h2 className="font-bold text-5xl text-[#137E8C]">Products</h2>
        </div>
        {isLoading ? (
          <BentoGrid className="max-w-4xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </BentoGrid>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full min-w-[300px] max-w-7xl">
            {filteredProducts.map((item) => (
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
                  </button>
                </BackgroundGradient>
              </div>
            ))}
          </div>
        )}

        {showButton && (
          <div className="mt-10">
            <Link
              href="/products"
              className="font-bold text-xl hover:bg-logoColor p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-[#137E8C]"
            >
              Show All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="w-full h-40 rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
