import React from 'react';

import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import Maps from './_components/maps';
import Services from './_components/services';

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MarketingPage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm px-4 py-3 bg-amber-100 text-amber-700 rounded-full uppercase">
          New website launched
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 max-w-4xl">
          Experience the allure of flawless lashes or a radiant tan in
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-2 w-fit ">
          one place.
        </div>
      </div>

      <div
        className={cn(
          " text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center w-fit",
          textFont.className
        )}
      >
        Choose from either classic, 3D, 5D, Hybrid (a mix of classic & 3D) as
        well as tanning
      </div>
      <Button className="mt-6 mb-40" size={"lg"} asChild>
        <Link href={"/sign-up"}>Book an appointmnet today</Link>
      </Button>
      <Maps />
      <Services />
    </div>
  );
}
