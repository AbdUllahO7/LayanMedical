"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../store/api/DataHelper"
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import FilterComponent from "../FilterCompoennt"
import { Button } from "../ui/button"
import { SkeletonCard } from "../skeleton-card"
import { motion, AnimatePresence } from "framer-motion"

export function ModernProductCarousel({ showButton, showFilter }) {
  const [filters, setFilters] = useState({ category: "", search: "" })
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef(null)
  const touchStartX = useRef(0)
  const carouselRef = useRef(null)

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiRequest("ProductsRoutes", "GET"),
    staleTime: 0,
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

    // Get the last 5 products after sorting
    const lastProducts = sortedProducts.slice(-5)

    // Apply filters on the products
    return lastProducts.filter((item) => {
      const categoryMatch = filters.category ? item.categories?.[0]?.title === filters.category : true
      const searchMatch = filters.search ? item.title.toLowerCase().includes(filters.search.toLowerCase()) : true
      return categoryMatch && searchMatch
    })
  }, [filters, products, sortBy, sortOrder])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying]) // Removed unnecessary dependencies: currentIndex, filteredProducts.length

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex === filteredProducts.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredProducts.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const applyFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentIndex(0)
  }

  const resetFilters = () => {
    setFilters({ category: "", search: "" })
    setCurrentIndex(0)
  }

  const handleSortChange = (e) => {
    const [criteria, order] = e.target.value.split(":")
    setSortBy(criteria)
    setSortOrder(order)
    setCurrentIndex(0)
  }

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
      }
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
        transition: {
          duration: 0.5,
        },
      }
    },
  }

  return (
    <div className="flex w-full flex-wrap">
      {showFilter && (
        <aside className="md:w-1/6 min-w-[300px] h-screen bg-white shadow-lg p-6 sticky top-0 xs:w-full">
          <select
            onChange={handleSortChange}
            className="mt-4 p-2 border rounded-lg w-full"
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

      {/* Modern Products Carousel */}
      <div className="flex-1 flex flex-col items-center p-6 mt-10">
        <div className="mx-auto mb-10 text-center">
          <h2 className="font-bold text-5xl text-main">Most Popular</h2>
          {showButton && (
          <div className="mt-10">
            <Link
              href="/products"
              className="font-bold text-xl hover:bg-[#0e6974] p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-main transition-all duration-300"
            >
              Show All
            </Link>
          </div>
        )}
        </div>

        <div
          className="w-full max-w-7xl relative"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-xl relative h-[400px] md:h-[450px] bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                  {/* Product Image */}
                  <div className="w-full md:w-1/2 relative h-[200px] md:h-[350px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#137E8C]/10 to-transparent rounded-2xl" />
                    <Image
                      src={filteredProducts[currentIndex]?.listImages[0] || "/placeholder.svg"}
                      alt={filteredProducts[currentIndex]?.title || "Product"}
                      fill
                      style={{ objectFit: "contain" }}
                      className="rounded-2xl z-10"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="w-full md:w-1/2 flex flex-col space-y-4 p-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {filteredProducts[currentIndex]?.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {filteredProducts[currentIndex]?.description}
                    </p>
                    <div className="mt-auto">
                      <Button className="rounded-full px-6 py-2 text-white bg-main hover:bg-[#0e6974] transition-all duration-300 text-sm font-medium">
                        <Link href={`/products/productDetails/${filteredProducts[currentIndex]?._id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button className="rounded-full px-6 py-2 text-white bg-main hover:bg-gray-800 transition-all duration-300 text-sm font-medium ml-2">
                        <Link href="https://layandent.com/">Buy Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-black/50 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-all duration-300"
              aria-label="Previous product"
            >
              <ChevronLeft className="h-6 w-6 text-[#137E8C]" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-black/50 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-all duration-300"
              aria-label="Next product"
            >
              <ChevronRight className="h-6 w-6 text-[#137E8C]" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1 mt-6 rounded-full overflow-hidden">
            <div
              className="bg-main h-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentIndex + 1) / filteredProducts.length) * 100}%`,
              }}
            />
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-6 gap-2 overflow-x-auto pb-2 max-w-full">
            {filteredProducts.map((product, index) => (
              <button
                key={product._id}
                onClick={() => goToSlide(index)}
                className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? "border-[#137E8C] scale-110"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`Go to product ${index + 1}`}
              >
                <Image
                  src={product.listImages[0] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  )
}

