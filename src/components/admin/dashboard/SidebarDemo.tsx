"use client";
import React, { useState } from "react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Products from "./Products";
import Categories from "./Categories";
import { useRouter } from "next/navigation";

export function SidebarDemo() {
  const router = useRouter(); // Initialize the router

  // State to track which component to display
    const [activeComponent, setActiveComponent] = useState("products");

    const links = [
        {
        label: "Products",
        href: "#", // Keep it as a placeholder since we handle navigation via state
        icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        onClick: () => setActiveComponent("products"), // Set active component to "products"
        },
        {
        label: "Categories",
        href: "#", // Keep it as a placeholder since we handle navigation via state
        icon: (
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        onClick: () => setActiveComponent("categories"), // Set active component to "categories"
        },
        {
        label: "Logout",
        href: "#",
        icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        onClick: () => {
            router.push("/login");
        },
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <div
        className={cn(
            "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
            "h-[100%]"
        )}
        >
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} onClick={link.onClick} />
                ))}
                </div>
            </div>
            <div>
                <SidebarLink
                link={{
                    label: "Manu Arora",
                    href: "#",
                    icon: (
                    <Image
                        src="https://assets.aceternity.com/manu.png"
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                    />
                    ),
                }}
                />
            </div>
            </SidebarBody>
        </Sidebar>
        <Dashboard activeComponent={activeComponent} />
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
        href="#"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium text-black dark:text-white whitespace-pre"
        >
            Acet Labs
        </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
        href="#"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};

// Dummy dashboard component with content
const Dashboard = ({ activeComponent }) => {
    return (
        <div className="flex w-full">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
            <div className="flex gap-2">
            {activeComponent === "products" && <Products />}
            {activeComponent === "categories" && <Categories />}
            </div>
        </div>
        </div>
    );
};
