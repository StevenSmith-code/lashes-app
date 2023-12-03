import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  refillPrice: number;
}

const ServiceCard = ({
  name,
  description,
  price,
  refillPrice,
}: ServiceCardProps) => {
  return (
    <Card className="flex items-center justify-center flex-col max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Price: ${price}</p>
      </CardContent>
      <CardFooter>
        <p>Refill price: ${refillPrice}</p>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
