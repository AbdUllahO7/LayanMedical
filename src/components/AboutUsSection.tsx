import { Eye, InfoIcon, MessagesSquare } from "lucide-react";
import { HoverEffect } from "./ui/card-hover-effect";

export function AboutUsSection() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="mx-auto mt-10 text-center">
            <h2 className="font-bold text-3xl text-[#137E8C]">About us</h2>
      </div>
      <HoverEffect items={projects} />
      
    </div>
  );
}
export const projects = [
  {
    icon : <MessagesSquare/>,
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    icon : <Eye/>,

    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    icon : <InfoIcon/>,
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },

];
