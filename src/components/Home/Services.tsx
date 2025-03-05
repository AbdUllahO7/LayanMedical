"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define proper types
interface ServiceItem {
  title: string;
  description?: string;
  header: React.ReactElement<any>; // Use ReactElement<any> to allow any props
}

export function Services() {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Set up carousel
  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="py-16 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto mb-12 text-center">
          <h2 className="font-bold text-4xl md:text-5xl text-main bg-clip-text  bg-gradient-to-r from-green-600 to-green-800 mb-3">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional medical equipment maintenance and support for healthcare facilities
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {items.map((item, i) => (
              <CarouselItem key={i} className={cn("pl-4 md:basis-1/2 lg:basis-1/3", isMobile ? "basis-full" : "")}>
                <div className="p-1 h-full">
                  <Card className="overflow-hidden border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] bg-white rounded-xl">
                    <div className="relative h-48 w-full overflow-hidden">
                      {React.isValidElement(item.header) ? (
                        <div className="w-full h-full">
                          {/* Use type assertion to tell TypeScript this is safe */}
                          {React.cloneElement(item.header as React.ReactElement<any>, {
                            className: "w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          })}
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>
                      )}
                    </CardContent>

                    <CardFooter className="p-5 pt-0">
                      <a
                        href="https://api.whatsapp.com/message/CI6MVAYVPTSUF1?autoload=1&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button className="w-full bg-main text-white group">
                          Contact Us
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center mt-8 gap-2">
            <CarouselPrevious
              variant="outline"
              className="relative h-9 w-9 rounded-full border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            />

            <div className="flex items-center gap-1.5 mx-4">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? "w-6 bg-blue-600" : "w-2 bg-blue-200 hover:bg-blue-300"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <CarouselNext
              variant="outline"
              className="relative h-9 w-9 rounded-full border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

// Type-safe items array
const items: ServiceItem[] = [
  {
    title: "Maintenance contracts for medical centers",
    description: "Comprehensive service agreements to keep your medical facility running smoothly",
    header: (
      <Image
        src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/handshake-close-up-executives_inbesr.jpg"
        className="w-full h-full rounded-t-lg"
        width={500}
        height={300}
        alt="Maintenance contracts"
        unoptimized={true}
      />
    ),
  },
  {
    title: "Maintenance of all medical devices",
    description: "Expert servicing for all types of medical equipment to ensure optimal performance",
    header: (
      <Image
        src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/dental_htu9ab.jpg"
        className="w-full h-full rounded-t-lg"
        width={500}
        height={300}
        alt="Medical device maintenance"
        unoptimized={true}
      />
    ),
  },
  {
    title: "Maintenance of all dental handpieces",
    description: "Specialized care for dental handpieces to maintain precision and longevity",
    header: (
      <Image
        src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/dental-2_ckejyz.jpg"
        className="w-full h-full rounded-t-lg"
        width={500}
        height={300}
        alt="Dental handpiece maintenance"
        unoptimized={true}
      />
    ),
  },
  {
    title: "Dental chair maintenance",
    description: "Complete servicing of dental chairs to ensure patient comfort and operational reliability",
    header: (
      <Image
        src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115007/freepik__upload__44998_ts1p2d.png"
        className="w-full h-full rounded-t-lg"
        width={500}
        height={300}
        alt="Dental chair maintenance"
        unoptimized={true}
      />
    ),
  },
  {
    title: "X-ray room balancing and insulation",
    description: "Professional balancing and insulation services for X-ray rooms to ensure safety and compliance",
    header: (
      <Image
        src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/Xray-room_d74qxu.jpg"
        className="w-full h-full rounded-t-lg"
        width={500}
        height={300}
        alt="X-ray room services"
        unoptimized={true}
      />
    ),
  },
]