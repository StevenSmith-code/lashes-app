"use client";

import React, { useState } from 'react';

import axios from 'axios';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface PaymentButtonProps {
  service: React.ReactNode;
}

export const PaymentButton = ({ service }: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/booking/checkout`, {
        service,
      });

      window.location.assign(response.data.url);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Continue to payment
    </Button>
  );
};
