import { BentoGridDemo } from "@/components/BentoGridDemo";
import { CardHoverEffectDemo } from "@/components/CardHoverEffectDemo";
import { Category } from "@/components/Category";
import { ContactInfo } from "@/components/ContactInfo";
import { ImagesSliderDemo } from "@/components/ImagesSliderDemo";

export default function Home() {
  return (
    <div className="w-full">
        <ImagesSliderDemo/>
        <Category showButton={true}/>
        <BentoGridDemo showButton={true}/>
        <CardHoverEffectDemo/>
        <ContactInfo/>
    </div>
  );
}
