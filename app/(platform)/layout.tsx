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
      {children}
      <Footer />
    </>
  );
}
