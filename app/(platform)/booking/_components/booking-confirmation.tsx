import React from 'react';

import { format } from 'date-fns';

import useBookingStore from '@/hooks/useBookingStore';

type BookingData = {
  service: string;
  dateTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type BookingConfirmationProps = {
  data: BookingData;
};

const BookingConfirmation = ({ data }: BookingConfirmationProps) => {
  const { dateTime } = useBookingStore();

  const displayDateTime = format(new Date(dateTime), "MM-dd-yyyy hh:mm a");
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
        <p className="leading-7">{displayDateTime}</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
