'use client'

import { ProductsSection } from "@/components/ProductsSection";
import { AboutUsSection } from "@/components/AboutUsSection";
import { Category } from "@/components/Category";
import { ContactInfo } from "@/components/ContactInfo";
import { ImagesSliderDemo } from "@/components/ImagesSliderDemo";
import { Services } from "@/components/Home/Services";

export default function Home() {
  return (
      <div className="w-full">
          <ImagesSliderDemo/> 
          <Category showButton={true}/>
          <Services/>
          <ProductsSection showButton={true}/>
          <AboutUsSection/>
          <ContactInfo/>
      </div>
  );
}
