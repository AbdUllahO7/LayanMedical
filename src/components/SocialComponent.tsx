import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandSnapchat,
    IconBrandX,

} from "@tabler/icons-react";

export function SocialComponent() {
    const links = [
        {
            title: "Facebook",
            icon: (
            <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
        title: "X",
        icon: (
            <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
        },

        {
        title: "Instagram",
        icon: (
            <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
        },
    

        {
        title: "Snapchat",
        icon: (
            <IconBrandSnapchat className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "#",
        },
    ];
return (
    <div className="flex items-center justify-center  ">
        <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
        />
    </div>
);
}
