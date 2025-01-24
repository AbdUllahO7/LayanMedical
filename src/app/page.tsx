import { BentoGridDemo } from "@/components/BentoGridDemo";
import { CardHoverEffectDemo } from "@/components/CardHoverEffectDemo";
import { Category } from "@/components/Category";
import { ContactInfo } from "@/components/ContactInfo";
import { Footer } from "@/components/footer";
import { HeroHighlightDemo } from "@/components/HeroHighlight";
import { NavbarDemo } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
        <NavbarDemo />
        <HeroHighlightDemo />
        <Category/>
        {/* <BentoGridDemo/>
        <CardHoverEffectDemo/>
        <ContactInfo/>
        <Footer/> */}
    </div>
  );
}
