import { Eye, InfoIcon, MessagesSquare } from "lucide-react";
import { IconArrowWaveRightUp, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { HoverEffect } from "../ui/card-hover-effect";

export function AboutUsSection() {
  return (
    <div className="max-w-8xl mx-auto px-8 container">
      <div className="mx-auto mt-10 text-center">
            <h2 className="font-bold text-5xl text-main">About us</h2>
      </div>
      <HoverEffect items={projects} />
      
    </div>
  );
}
export const projects = [
  {
    title: "Maintenance contracts for medical centers",
    description: "Providing comprehensive maintenance contracts for the upkeep of medical equipment and facilities.",
    icon: <IconClipboardCopy className="h-6 w-6 " />
  },
  {
    title: "Maintenance of all medical devices",
    description: "Ensuring the reliability and longevity of medical devices through scheduled maintenance and inspections.",
    icon: <IconFileBroken className="h-6 w-6 " />
  },
  {
    title: "Maintenance of all dental handpieces",
    description: "Specialized maintenance services for dental handpieces to ensure optimal performance.",
    icon: <IconSignature className="h-6 w-6 " />
  },
  {
    title: "Dental chair maintenance",
    description: "Regular inspection and maintenance of dental chairs to ensure patient comfort and safety.",
    icon: <IconTableColumn className="h-6 w-6 " />
  },
  {
    title: "X-ray room balancing and insulation",
    description: "Maintaining and balancing X-ray rooms to meet safety standards, along with insulation checks.",
    icon: <IconArrowWaveRightUp className="h-6 w-6 " />
  },
];
