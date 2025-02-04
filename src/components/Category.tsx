import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../store/api/DataHelper";

export function Category({ showButton }: { showButton: boolean }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiRequest("Categories/getAllCategories", "GET"),
  });


  const categories = Array.isArray(data) ? data : []; 

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  if (isError) return <p className="text-center text-red-500">Failed to load categories</p>;

  return (
    <div className="flex-col justify-center items-center w-full mt-10">
      <div className="mx-auto mb-10 text-center">
        <h2 className="font-bold text-3xl text-[#137E8C]">Categories</h2>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="container w-full">
          <Carousel className="w-full">
            <CarouselContent className="-ml-1 w-full">
              {categories.map((cat: any, index: number) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
                  <div className="p-1">
                    <Link href={`/products/prodcutDetailsCategory/${cat._id}`}>
                      <Card className="flex justify-center items-center">
                        <CardContent className="flex-col aspect-square items-center justify-center p-6 gap-4">
                          <Image
                            src={cat.image.replace("http://", "https://")}
                            alt={cat.title}
                            width={100}
                            height={100}
                            className="w-32 h-32 object-cover"
                          />
                          <p className="text-center pt-4 font-bold">{cat.title}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      {showButton && (
        <div className="mx-auto mt-10 mb-10 text-center">
          <Link href="/category" className="font-bold text-xl hover:bg-logoColor p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-[#137E8C]">
            Show All
          </Link>
        </div>
      )}
    </div>
  );
}
