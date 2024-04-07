import React from 'react';

import { format } from 'date-fns';

import useBookingStore from '@/hooks/useBookingStore';

type BookingData = {
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type BookingConfirmationProps = {
  data: BookingData;
};

const BookingConfirmation = ({ data }: BookingConfirmationProps) => {
  const { date } = useBookingStore();
  const displayDate = format(date!, "MM-dd-yyyy hh:mm a");

  return (
    <div className="flex flex-col items-stretch justify-center space-y-3 mb-24">
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Name:
        </h3>
        <p className="leading-7">{`${data.firstName} ${data.lastName}`}</p>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Service:
        </h3>
        <p className="leading-7">{data.service}</p>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Date:
        </h3>
        <p className="leading-7">{displayDate}</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
