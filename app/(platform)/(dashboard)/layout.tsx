import React from 'react';

import { Navbar } from '@/components/navbar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default DashboardLayout;
