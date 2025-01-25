"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";

export function TracingBeamDemo() {
    return (
        <TracingBeam className="px-6 h-[100%]">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                {dummyContent.map((item, index) => (
                    <div key={`content-${index}`} className="mb-10">
                        <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                            {item.badge}
                        </h2>

                        <p className={twMerge("text-xl mb-4")}>{item.title}</p>

                        <div className="text-sm prose prose-sm dark:prose-invert">
                            {item.images?.map((image, idx) => (
                                <Image
                                    key={`image-${index}-${idx}`}
                                    src={image}
                                    alt={`blog-thumbnail-${index}-${idx}`}
                                    height={1000}
                                    width={1000}
                                    className="rounded-lg mb-10 object-cover"
                                />
                            ))}
                        </div>
                        {item.description}
                    </div>
                ))}
            </div>
        </TracingBeam>
    );
}

const dummyContent = [
    {
        title: "Lorem Ipsum Dolor Sit Amet",
        description: (
            <>
                <p>
                    Sit duis est minim proident non nisi velit non consectetur.
                    Esse adipisicing laboris consectetur enim ipsum reprehenderit
                    eu deserunt Lorem ut aliqua anim do. Duis cupidatat qui irure
                    cupidatat incididunt incididunt enim magna id est qui sunt
                    fugiat. Laboris do duis pariatur fugiat Lorem aute sit
                    ullamco. Qui deserunt non reprehenderit dolore nisi velit
                    exercitation Lorem qui do enim culpa. Aliqua eiusmod in
                    occaecat reprehenderit laborum nostrud fugiat voluptate do
                    Lorem culpa officia sint labore. Tempor consectetur excepteur
                    ut fugiat veniam commodo et labore dolore commodo pariatur.
                </p>
            
            </>
        ),
        badge: "React",
        images: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        ],
    },
];
