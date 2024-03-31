import React from 'react';

import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { redirect } from 'next/navigation';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs';

import BookingForm from './_components/booking-form';

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const BookingPage = () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  return (
    <div className="flex items-center justify-center flex-col h-[calc(100vh-56px)]">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 max-w-4xl">
          Book Online
        </h1>
      </div>

      <Tabs defaultValue="lashes" className="w-[600px] text-center">
        <TabsList>
          <TabsTrigger value="lashes">Lashes</TabsTrigger>
        </TabsList>
        <TabsContent value="lashes">
          <div
            className={cn(
              " text-sm md:text-lg text-neutral-400 mt-4 mb-8 max-w-xs md:max-w-2xl text-left w-fit break-normal",
              textFont.className
            )}
          >
            If you are unable to make your appointment, PLEASE cancel or
            reschedule 24 hours or more prior to appointment, do it at the
            online scheduling or text me at{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-md font-semibold">
              832-570-0681
            </code>
            . If this is not done it will be considered a{" "}
            <span className="text-lg font-semibold">NO SHOW</span>, you{" "}
            <span className="text-lg font-semibold">WILL</span> be charged for
            the Full amount of the service you scheduled for.
          </div>
          <BookingForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingPage;
