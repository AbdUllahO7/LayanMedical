'use client'

import { AboutUsSection } from "@/components/Home/AboutUsSection";
import { Category } from "@/components/Home/Category";
import { ContactInfo } from "@/components/Home/ContactInfo";
import { Services } from "@/components/Home/Services";
import { ModernProductCarousel } from "@/components/Home/MostPopularSection";
import ProductSectionCarousel from "@/components/Home/ProductSectionCarousel";
import { HeroSection } from "@/components/Home/HeroSection";

export default function Home() {
  return (
      <div className="w-full bg-[#F5F5F5]">
          <HeroSection/> 
          <Category showButton={true}/>
          <ProductSectionCarousel showButton={true} showFilter={false}/>
          <ModernProductCarousel showButton={true} showFilter={false}/>
          <Services/>
          <AboutUsSection/>
          <ContactInfo/>
      </div>
  );
}
