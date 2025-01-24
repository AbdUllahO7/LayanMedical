import { Category } from "@/components/Category";
import { HeroHighlightDemo } from "@/components/HeroHighlight";
import { NavbarDemo } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-black">
        <NavbarDemo/>
        <HeroHighlightDemo/>
        <Category/>

    </div>
  );
}
