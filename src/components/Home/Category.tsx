import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../store/api/DataHelper";
import { SkeletonCard } from "../skeleton-card";

export function Category({ showButton }: { showButton: boolean }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiRequest("Categories/getAllCategories", "GET"),
    staleTime: 0,
  });

  const categories = Array.isArray(data) ? data : []; 

  if(isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  
  if (isError) return <p className="text-center text-red-500 p-4">Failed to load categories</p>;

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6 md:mt-10 px-4">
      <div className="w-full max-w-screen-xl mx-auto mb-6 md:mb-10 text-center">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight pb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Discover Amazing Categories
          </h2>
          <p className="mt-2 md:mt-4 max-w-[700px] text-sm md:text-base text-muted-foreground px-4">
            Explore our handpicked selection of extraordinary destinations 
          </p>
          {showButton && (
            <div className="mt-6 md:mt-10 mb-6 md:mb-10 text-center">
              <Link 
                href="/category" 
                className="font-bold text-sm md:text-xl hover:bg-logoColor p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-main transition-colors"
              >
                Show All
              </Link>
            </div>
          )}
        </div>      
      </div>
      
      <div className="w-full max-w-screen-xl">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 w-full">
            {categories.map((cat: any, index: number) => (
              <CarouselItem 
                key={index} 
                className="pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <div className="p-1">
                  <Link href={`/products/prodcutDetailsCategory/${cat._id}`}>
                    <Card className="flex justify-center items-center shadow-md hover:shadow-2xl transition duration-500 h-full min-h-[220px] md:min-h-[240px] lg:min-h-[260px]">
                      <CardContent className="flex flex-col items-center justify-center p-4 md:p-6 gap-2 md:gap-4 w-full">
                        <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative">
                          <Image
                            src={cat.image.replace("http://", "https://")}
                            alt={cat.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-center pt-2 md:pt-4 font-bold text-xs md:text-sm truncate w-full">
                          {cat.title}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-1 md:left-2" />
            <CarouselNext className="right-1 md:right-2" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}