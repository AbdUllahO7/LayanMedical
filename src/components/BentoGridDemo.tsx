'use client'

import React, { useEffect } from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchAllProducts } from "../../store/admin/ProductsSlice";

export function BentoGridDemo({showButton} : {showButton : boolean}) {

  const { products , loading: productsLoading } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mb-10 text-center">
        <h2 className="font-bold text-3xl text-[#137E8C]">Products</h2>
      </div>
      
      {/* Display Skeleton when products are loading */}
      {productsLoading ? (
        <BentoGrid className="max-w-4xl mx-auto">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </BentoGrid>
      ) : (
        <BentoGrid className="max-w-4xl mx-auto">
          {products.map((item, i) => (
            <Link href={`/products/productDetails/${item._id}`} key={item._id}>
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.listImages[0]}
                icon="IconBoxAlignTopLeft"
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            </Link>
          ))}
        </BentoGrid>
      )}

      <div className="mt-10">
        {showButton && (
          <Link
            href="/products"
            className="font-bold text-xl hover:bg-logoColor p-2 pr-3 pl-3 text-white rounded-lg hover:text-white bg-[#137E8C]"
          >
            Show All
          </Link>
        )}
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
