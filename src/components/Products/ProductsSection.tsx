"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import {  RotateCcw, SlidersHorizontal } from "lucide-react"
import { apiRequest } from "../../../store/api/DataHelper"
import FilterComponent from "../FilterCompoennt"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

export function ProductsSection({ showButton = true, showFilter = true }) {
  const [filters, setFilters] = useState({ category: "", search: "" })
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiRequest("ProductsRoutes", "GET"),
  })

  const filteredProducts = useMemo(() => {
    if (!products) return []

    // Sort products by selected criteria and order
    const sortedProducts = [...products].sort((a, b) => {
      const valueA = sortBy === "createdAt" ? new Date(a.createdAt).getTime() : a[sortBy]
      const valueB = sortBy === "createdAt" ? new Date(b.createdAt).getTime() : b[sortBy]

      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1
      } else {
        return valueA < valueB ? 1 : -1
      }
    })

    // If showFilter is false, return the last 5 products
    if (!showFilter) {
      return sortedProducts.slice(-5)
    }

    // Apply filters
    return sortedProducts.filter((item) => {
      const categoryMatch = filters.category ? item.categories?.[0]?.title === filters.category : true
      const searchMatch = filters.search ? item.title.toLowerCase().includes(filters.search.toLowerCase()) : true
      return categoryMatch && searchMatch
    })
  }, [filters, products, sortBy, sortOrder, showFilter])

  const applyFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({ category: "", search: "" })
  }

  const handleSortChange = (value) => {
    const [criteria, order] = value.split(":")
    setSortBy(criteria)
    setSortOrder(order)
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {filters.category || filters.search ? (
          <Badge variant="outline" className="flex items-center gap-1">
            {Object.values(filters).filter(Boolean).length} active
          </Badge>
        ) : null}
      </div>

      <div className="space-y-4">
        <Select defaultValue={`${sortBy}:${sortOrder}`} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt:desc">Latest First</SelectItem>
            <SelectItem value="createdAt:asc">Oldest First</SelectItem>
            <SelectItem value="price:asc">Price: Low to High</SelectItem>
            <SelectItem value="price:desc">Price: High to Low</SelectItem>
            <SelectItem value="title:asc">Name: A-Z</SelectItem>
            <SelectItem value="title:desc">Name: Z-A</SelectItem>
          </SelectContent>
        </Select>

        <FilterComponent filters={filters} handleFilter={applyFilter} />

        <Button onClick={resetFilters} variant="outline" className="w-full flex items-center gap-2">
          <RotateCcw className="h-4 w-4" /> Reset Filters
        </Button>
      </div>
    </div>
  )

  return (
    <div className="w-full">

      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-main mb-4">Latest Products</h2>
          {showFilter && (
            <div className="md:hidden flex justify-center mt-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                      Filters & Sort
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
        

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for desktop */}
          {showFilter && (
            <aside className="hidden md:block w-full md:w-64 lg:w-72 shrink-0">
              <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-6">
                <FilterSidebar />
              </div>
              
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">No products found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-500">Try adjusting your filters</p>
                <Button onClick={resetFilters} variant="outline" className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}

            {showButton && filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <Button asChild size="lg" className="rounded-full px-8 bg-main hover:bg-main/90">
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-50 dark:bg-zinc-800">
        <Link href={`/products/productDetails/${product._id}`} className="block w-full h-full">
          <Image
            src={product.listImages[0] || "/placeholder.svg"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <CardContent className="p-4 flex-1">
        <h3 className="font-medium text-lg line-clamp-1 mb-1 group-hover:text-main transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>

        {product.categories?.[0]?.title && (
          <Badge variant="outline" className="mt-3">
            {product.categories[0].title}
          </Badge>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full rounded-full bg-main hover:bg-main/90">
          <Link href={`/products/productDetails/${product._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

const ProductSkeleton = () => (
  <Card className="overflow-hidden h-full">
    <div className="h-48 sm:h-56">
      <Skeleton className="h-full w-full" />
    </div>
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-6 w-16 mt-3" />
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Skeleton className="h-10 w-full rounded-full" />
    </CardFooter>
  </Card>
)

