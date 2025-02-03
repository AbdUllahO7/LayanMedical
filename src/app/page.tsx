'use client'

import { ProductsSection } from "@/components/ProductsSection";
import { AboutUsSection } from "@/components/AboutUsSection";
import { Category } from "@/components/Category";
import { ContactInfo } from "@/components/ContactInfo";
import { ImagesSliderDemo } from "@/components/ImagesSliderDemo";

export default function Home() {
  return (
      <div className="w-full">
          <ImagesSliderDemo/>
          <Category showButton={true}/>
          <ProductsSection showButton={true}/>
          <AboutUsSection/>
          <ContactInfo/>
      </div>
  );
}
