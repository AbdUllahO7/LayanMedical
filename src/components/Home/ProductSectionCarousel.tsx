"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowRight, Pause, Play } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "../ui/badge"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../../../store/api/DataHelper"
import { SkeletonCard } from "../skeleton-card"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Sample card data - replace with your actual data
const cardData = [
  {
    id: 1,
    title: "Tropical Paradise",
    description:
      "Experience the ultimate relaxation in pristine beaches with crystal clear waters and lush palm trees.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Beach",
  },
  {
    id: 2,
    title: "Urban Exploration",
    description:
      "Discover hidden gems in vibrant city streets, from local cafés to stunning architecture and street art.",
    image: "/placeholder.svg?height=400&width=600",
    category: "City",
  },
  {
    id: 3,
    title: "Mountain Adventure",
    description: "Challenge yourself with thrilling hikes and breathtaking views from majestic mountain peaks.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Adventure",
  },
  {
    id: 4,
    title: "Cultural Immersion",
    description: "Dive deep into rich traditions, authentic cuisine, and historical landmarks of diverse cultures.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Culture",
  },
  {
    id: 5,
    title: "Wildlife Safari",
    description:
      "Witness magnificent animals in their natural habitat on an unforgettable journey through the wilderness.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Nature",
  },
]

export default function ProductSectionCarousel({ showButton, showFilter }) {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [autoPlay, setAutoPlay] = React.useState(true)
  const [isPaused, setIsPaused] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()


  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiRequest("ProductsRoutes", "GET"),
    staleTime: 0,
  })

  console.log(products)

  // Handle autoplay
  React.useEffect(() => {
    if (!api || !autoPlay || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [api, autoPlay, isPaused])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const toggleAutoPlay = () => {
    setIsPaused(!isPaused)
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
  return (
    <div className="px-4 py-12 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Discover Amazing Products
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            Explore our handpicked selection of extraordinary destinations 
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="font-bold text-xl  p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-main transition-all duration-300"
            >
              Show All
            </Link>
          </div>
        </div>

        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {products.map((card) => (
                <CarouselItem key={card._id} className="pl-4 md:basis-1/2 lg:basis-1/3 md:pl-6">
                  <div className="h-full p-1">
                    <Card className="h-full overflow-hidden border-0 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:translate-y-[-5px]">
                      <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <Badge className="absolute top-4 left-4 z-20 bg-primary/90 hover:bg-primary">
                          {card.categories?.[0]?.title}
                        </Badge>
                        <Image
                          src={card.listImages[0] || "/placeholder.svg"}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <CardTitle className="line-clamp-1 text-xl font-bold">{card.title}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-3 text-sm">{card.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button onClick={() => router.push(`/products/productDetails/${card._id}`)} className="group w-full bg-main hover:from-primary/90 hover:to-primary transition-all duration-300">
                          Explore Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-primary/20"
                onClick={toggleAutoPlay}
              >
                {isPaused ? <Play className="h-4 w-4 text-primary" /> : <Pause className="h-4 w-4 text-primary" />}
              </Button>

              <div className="flex items-center gap-1.5 mx-4">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current - 1 ? "w-6 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <CarouselPrevious
                variant="outline"
                className="relative left-0 h-8 w-8 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
              />
              <CarouselNext
                variant="outline"
                className="relative right-0 h-8 w-8 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

