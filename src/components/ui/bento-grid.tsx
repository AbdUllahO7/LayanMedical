import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string ;
  description?: string ;
  header?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-neutral-200 border-transparent justify-between flex flex-col space-y-4 dark:border-neutral-800",
        className
      )}
    >
        <Image
              src={header ? header : 'https://img.freepik.com/free-photo/cement-texture_1194-6521.jpg?semt=ais_hybrid'}
              alt={title}
              width={100}
              height={100}
              className="w-32 h-32 object-cover"
          />
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <p className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 line-clamp-1">
          {title}
        </p>
        <p className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 line-clamp-1">
            {description}
        </p>
      </div>
    </div>
  );
};
