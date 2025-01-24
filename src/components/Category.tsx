import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"



export function Category() {
  return (
    <div className="flex-col justify-center items-center w-full mt-10">
      <div className="mx-auto mb-10 text-center">
        <h2 className="font-bold text-3xl text-[#137E8C]">Categories</h2>
      </div>
        <div className="  w-full flex justify-center items-center">
            <div className="container   w-full">
            <Carousel className="w-full">
                <CarouselContent className="-ml-1 w-full">
                    {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
                        <div className="p-1 ">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-2xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
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
        <Button className="font-bold text-xl hover:bg-logoColor  hover:text-white bg-[#137E8C]">Show All</Button>
      </div>
    </div>
  )
}
