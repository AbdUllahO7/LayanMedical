import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"



export function Category({showButton} : {showButton : boolean}) {
  return (
    <div className="flex-col justify-center items-center w-full mt-10">
      <div className="mx-auto mb-10 text-center">
        <h2 className="font-bold text-3xl text-[#137E8C]">Categories</h2>
      </div>
        <div className=" w-full flex justify-center items-center">
            <div className="container   w-full">
            <Carousel className="w-full">
                <CarouselContent className="-ml-1 w-full">
                    {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
                        <div className="p-1 ">
                        <Link href="/product/:id">
                      <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-2xl font-semibold">{index + 1}</span>
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
      <div className="mx-auto mt-10 mb-10 text-center">
      {
          showButton &&  (
          <Link href="/category" className="font-bold text-xl hover:bg-logoColor p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-[#137E8C]">
              Show All
          </Link>
          ) 
        }
      </div>
    </div>
  )
}
