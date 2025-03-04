import React from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";


export function Services() {


    return (
        <div>
    <div className="mx-auto  mb-10 text-center">
        <h2 className="font-bold text-5xl text-[#137E8C]">Services</h2>
      </div>
    <div className="mx-auto mb-[100px] grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6 container transition">
        {items.map((item, i) => (
            <Card key={i} className="min-w-[200px] xs:w-full w-[250px] transition duration-500 rounded-lg shadow-lg hover:shadow-2xl shadow-lightColor p-0 hover:bg-gray-100 ">
                <CardHeader className="p-0">
                    <CardTitle className="rounded-lg">
                        {item.header}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-2 font-bold px-2 pb-0 ">
                    {item.title}
                </CardContent>
                <CardContent className="pt-0 mt-1 font-semibold text-sm  px-2 line-clamp-1">
                    {item.description}
                </CardContent>
                <CardFooter className="pt-0 mt-1 font-semibold text-sm px-2 pb-2">
                    <a target="_blank" className="bg-lightColor px-2 py-2 rounded-lg text-white" href="https://api.whatsapp.com/message/CI6MVAYVPTSUF1?autoload=1&app_absent=0">Contact Us</a>
                </CardFooter>
            </Card>
        ))}
    </div>
        </div>
    
    );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "Maintenance contracts for medical centers",
    description: "",
    header: <Image src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/handshake-close-up-executives_inbesr.jpg" className="w-full h-full  rounded-t-lg"  width={100} alt="Contract" height={100} unoptimized={true}/>,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Maintenance of all medical devices",
    description: "",
    header: <Image src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/dental_htu9ab.jpg" className="w-full h-full  rounded-t-lg"  width={100} alt="Contract" height={100} unoptimized={true}/>,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Maintenance of all dental handpieces",
    description: "",
    header: <Image src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/dental-2_ckejyz.jpg" className="w-full h-full  rounded-t-lg"  width={100} alt="Contract" height={100} unoptimized={true}/>,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Dental chair maintenance",
    description: "Join the quest for understanding and enlightenment.",
    header: <Image src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115007/freepik__upload__44998_ts1p2d.png" className="w-full h-full rounded-t-lg"  width={100} alt="Contract" height={100} unoptimized={true}/>,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "X-ray room balancing and insulation",
    description:
      "",
      header: <Image src="https://res.cloudinary.com/dqo1hj5qt/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1741115008/Xray-room_d74qxu.jpg" className="w-full h-full  rounded-t-lg"  width={100} alt="Contract" height={100} unoptimized={true}/>,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  
];
