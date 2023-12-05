import React from 'react';

import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';

import ServiceCard from './service-card';

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// this is temp until prisma is setup
const listOfServices = [
  {
    name: "Classic",
    description:
      "Classic eyelash extensions are a single eyelash extension attached to a single eyelash.",
    price: 150,
    refillPrice: 65,
  },
  {
    name: "3D",
    description:
      "3D eyelash extensions are thinner, light weight extensions, 3 extensions per lash,a more natural look.",
    price: 150,
    refillPrice: 65,
  },
  {
    name: "5D",
    description:
      "5D Volume lashes are a more dramatic look using 5 very lightweight and thin extensions.",
    price: 150,
    refillPrice: 65,
  },
  {
    name: "Hybrid",
    description:
      "Hybrid lashes are a mix of Classic and 3D. They will fall out naturally along with the natural growth cycle of each lash.",
    price: 150,
    refillPrice: 65,
  },
];

const Services = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-col",
        headingFont.className
      )}
    >
      <h1 className="text-3xl md:text-5xl text-center text-neutral-800 mb-4 max-w-4xl">
        Services
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-2 mb-5">
        {listOfServices.map((service) => (
          <ServiceCard
            key={service.name}
            name={service.name}
            description={service.description}
            price={service.price}
            refillPrice={service.refillPrice}
          />
        ))}
      </div>
      <p
        className={cn(
          " text-sm md:text-xl text-neutral-400 mt-2 max-w-xs md:max-w-2xl text-center w-fit",
          textFont.className
        )}
      >
        <span className="font-bold break-normal">
          NOVALASH AND TEXAS STATE BOARD CERTIFIED. COLORADO AESTHETICIAN STATE
          BOARD CERTIFIED
        </span>
        <br />I suggest scheduling a refill every 2-4 weeks, depending on your
        personal care routine. Feel free to shower, swim, and exercise as usual.
        However, please avoid curling your lashes or applying mascara before
        your appointment. To maintain your lashes, use water-based cleansers
        instead of oil-based ones.
      </p>
    </div>
  );
};

export default Services;
