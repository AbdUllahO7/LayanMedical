import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"



export function Category() {
  return (
    <div className=" bg-white w-full flex justify-center items-center">
         <div className="container bg-white  w-full">
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
   
  )
}
