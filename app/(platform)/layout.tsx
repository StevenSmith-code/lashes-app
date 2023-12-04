import React from 'react';

import { Toaster } from 'sonner';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
