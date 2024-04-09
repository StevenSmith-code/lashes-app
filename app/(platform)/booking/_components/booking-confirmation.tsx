import React from 'react';

import { format } from 'date-fns';

import useBookingStore from '@/hooks/useBookingStore';
import { useUser } from '@clerk/nextjs';

type BookingConfirmationProps = {
  service: string;
  servicePrice: number;
};

const BookingConfirmation = ({
  service,
  servicePrice,
}: BookingConfirmationProps) => {
  const { date } = useBookingStore();
  const { user } = useUser();
  const displayDate = format(date!, "MM-dd-yyyy hh:mm a");

  return (
    <div className="grid grid-cols-2 gap-5 mb-24 ">
      <div className="flex-col justify-center items-center ">
        <h3 className="scroll-m-20 text-xl font-medium tracking-tight">
          Name:
        </h3>
        <p className="leading-7">{`${user?.firstName} ${user?.lastName}`}</p>
      </div>
      <div className="flex-col justify-center items-center ">
        <h3 className="scroll-m-20 text-xl font-medium tracking-tight">
          Service:
        </h3>
        <p className="leading-7">{service}</p>
      </div>
      <div className="flex-col justify-center items-center ">
        <h3 className="scroll-m-20 text-xl font-medium tracking-tight">
          Price:
        </h3>
        <p className="leading-7">${servicePrice}</p>
      </div>
      <div className="flex-col justify-center items-center ">
        <h3 className="scroll-m-20 text-xl font-medium tracking-tight">
          Date:
        </h3>
        <p className="leading-7">{displayDate}</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
