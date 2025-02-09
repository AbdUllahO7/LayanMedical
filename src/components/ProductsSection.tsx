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
import { Button } from "./ui/button";

export function ProductsSection({ showButton, showFilter }) {
  const [filters, setFilters] = useState({ category: "", search: "" });
  const [sortBy, setSortBy] = useState("createdAt"); // Default sort by createdAt
  const [sortOrder, setSortOrder] = useState("desc"); // Default descending order

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiRequest("ProductsRoutes", "GET"),
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
  
    // Sort products by selected criteria and order
    const sortedProducts = [...products].sort((a, b) => {
      const valueA = sortBy === "createdAt" ? new Date(a.createdAt).getTime() : a[sortBy];
      const valueB = sortBy === "createdAt" ? new Date(b.createdAt).getTime() : b[sortBy];
  
      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  
    // If showFilter is false, return the last 6 products
    if (!showFilter) {
      return sortedProducts.slice(-5);
    }
  

  
    // Apply filters on the last 6 products
    return sortedProducts.filter((item) => {
      const categoryMatch = filters.category ? item.categories?.[0]?.title === filters.category : true;
      const searchMatch = filters.search ? item.title.toLowerCase().includes(filters.search.toLowerCase()) : true;
      return categoryMatch && searchMatch;
    });
  }, [filters, products, sortBy, sortOrder, showFilter]);
  
  const applyFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ category: "", search: "" });
  };

  const handleSortChange = (e) => {
    const [criteria, order] = e.target.value.split(":");
    setSortBy(criteria);
    setSortOrder(order);
  };

  return (
    <div className="flex w-full flex-wrap">
      {showFilter && (
        <aside className="md:w-1/6 min-w-[300px] h-screen bg-white shadow-lg p-6 sticky top-0 xs:w-full">
            {/* Sort By Dropdown */}
            <select
            onChange={handleSortChange}
            className="mt-4 p-2 border rounded-lg"
            defaultValue="createdAt:desc"
          >
            <option value="createdAt:desc">Sort by Latest</option>
            <option value="createdAt:asc">Sort by Oldest</option>
            <option value="price:asc">Sort by Price (Low to High)</option>
            <option value="price:desc">Sort by Price (High to Low)</option>
            <option value="title:asc">Sort by Name (A-Z)</option>
            <option value="title:desc">Sort by Name (Z-A)</option>
          </select>
          
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
          <h2 className="font-bold text-5xl text-[#137E8C]">Latest Products</h2>
          
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
        <Link target="_blank" href="https://layandent.com/">Buy now</Link>
      </Button>
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
