'use client'

import { ProductsSection } from "@/components/ProductsSection";
import { AboutUsSection } from "@/components/AboutUsSection";
import { Category } from "@/components/Category";
import { ContactInfo } from "@/components/ContactInfo";
import { ImagesSliderDemo } from "@/components/ImagesSliderDemo";
import { Services } from "@/components/Home/Services";
import { AnotherProductSection } from "@/components/AnotherProductSection";

export default function Home() {
  return (
      <div className="w-full bg-[#F5F5F5]">
          <ImagesSliderDemo/> 
          <Category showButton={true}/>
          <ProductsSection showButton={true} showFilter={false}/>
          <AnotherProductSection showButton={true} showFilter={false}/>
          <Services/>
          <AboutUsSection/>
          <ContactInfo/>
      </div>
  );
}
