"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "./ui/navbar-menu";
import Image from "next/image";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center bg-[#137E8C]">
      <Navbar className="top-2 " />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);


  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}
    >
      
      <Menu setActive={setActive} >
      <div className="w-[100px]">
          <Image 
            src="/assets/images/logo.jpg" 
            alt="logo" 
            width={30}
            height={30}
            className="rounded-xl"
          />
        </div>
          
        <div className="flex gap-8 items-center">
        <Link href="/" className="text-white">
          Home
        </Link>
        <Link href="/products" className="text-white">
          Products
        </Link>
        <Link href="/category" className="text-white">
          Category
        </Link>
        <Link href="/admin" className="text-white">
          Admin
        </Link>

        </div>
      
      </Menu>
    </div>
  );
}
