"use client";
import React, { useState } from 'react';

import { ChevronLeft } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useBookingStore from '@/hooks/useBookingStore';

import { ServiceAccordionItem } from './service-accordion-item';

const BookingForm = () => {
  const [activeItem, setActiveItem] = useState<string>("item-1");
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);
  const [isCollapseable, setIsCollapseable] = useState<boolean>(true);
  const [nestedAccordionValue, setNestedAccordionValue] = useState<
    string | undefined
  >(undefined);

  const booking = useBookingStore();
  const services = {
    classic: ["Full Set Classic Extensions", "Classic Refill"],
    "3D": ["Full Set 3D Extensions", "3D Refill"],
    "5D": ["Full Set 5D Extensions", "5D Refill"],
    Hybrid: ["Full Set Hybrid Extensions", "Hybrid Refill"],
    // Add more services and their options here
  };

  const handleTriggerClick = (trigger: string) => {
    setActiveTrigger(trigger);
    setNestedAccordionValue(trigger);
    setIsCollapseable(false);
    useBookingStore.getState().setServiceName(trigger);
  };

  const handleTriggerReset = () => {
    setActiveTrigger(null);
    setIsCollapseable(true);
    setNestedAccordionValue(undefined);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
      value={activeItem}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="w-7 h-7 bg-neutral-700 rounded-full text-white hover:no-underline mr-2">
            <span className="text-xl">1</span>
          </div>
          Choose Appointment
        </AccordionTrigger>
        <AccordionContent>
          {!activeTrigger ? (
            <p className="text-sm text-muted-foreground text-left">
              Choose a service...
            </p>
          ) : (
            <div
              className="text-sm text-muted-foreground text-left flex items-center justify-start hover:underline hover:cursor-pointer"
              onClick={handleTriggerReset}
            >
              <ChevronLeft /> View all categories
            </div>
          )}
          <Accordion
            type="single"
            collapsible={isCollapseable}
            value={nestedAccordionValue}
            className="w-full space-x-4"
          >
            {Object.entries(services).map(([serviceName, options]) => (
              <ServiceAccordionItem
                key={serviceName}
                serviceName={serviceName}
                options={options}
              />
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="w-7 h-7 bg-neutral-700 rounded-full text-white hover:no-underline mr-2">
            <span className="text-xl">2</span>
          </div>
          Your Information
        </AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="w-7 h-7 bg-neutral-700 rounded-full text-white hover:no-underline mr-2">
            <span className="text-xl">3</span>
          </div>
          Confirmation
        </AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BookingForm;
