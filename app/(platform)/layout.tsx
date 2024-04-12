import React from 'react';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <Navbar />
      <main className=" bg-slate-100">{children}</main>
      <Footer />
    </>
  );
}
