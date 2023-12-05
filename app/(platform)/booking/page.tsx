import React from 'react';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs';

const BookingPage = () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  return <div>BookingPage</div>;
};

export default BookingPage;
