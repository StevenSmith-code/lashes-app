import React from 'react';

import { Toaster } from 'sonner';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <Navbar />
      <main className=" pt-40 pb-20 bg-slate-100 h-screen">{children}</main>
      <Footer />
    </>
  );
}
