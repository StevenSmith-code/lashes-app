"use client";
import React, { useState } from 'react';

import { ChevronLeft } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useBookingStore from '@/hooks/useBookingStore';

import BookingCalendar from './booking-calendar';

const BookingForm = () => {
  const [activeItem, setActiveItem] = useState<string>("item-1");
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);
  const [isCollapseable, setIsCollapseable] = useState<boolean>(true);
  const [nestedAccordionValue, setNestedAccordionValue] = useState<
    string | undefined
  >(undefined);

  const booking = useBookingStore();

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
            {(!activeTrigger || activeTrigger === "classic") && (
              <AccordionItem value="classic">
                <AccordionTrigger onClick={() => handleTriggerClick("classic")}>
                  <div className="flex items-center justify-between w-full">
                    <p className="uppercase">
                      Full set classic eyelash extensions
                    </p>
                    {!activeTrigger && (
                      <Button onClick={() => handleTriggerClick("classic")}>
                        Select
                      </Button>
                    )}
                  </div>
                </AccordionTrigger>

                <AccordionContent hidden={nestedAccordionValue === undefined}>
                  <div>
                    <p className="text-sm text-muted-foreground text-left mb-4">
                      I would like to schedule...
                    </p>
                    <Accordion type="single" defaultValue={undefined}>
                      <AccordionItem value="classic-calendar">
                        <AccordionTrigger>
                          <div className="flex flex-col items-stretch justify-center">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-lg">
                                  Full Set Classic Extensions
                                </p>
                                <p className="text-sm text-muted-foreground text-left">
                                  30~40 min. $150
                                </p>
                              </div>
                              <input
                                type="text"
                                name="classic"
                                hidden
                                value={"classic"}
                                readOnly
                              />
                              <Button type="submit">Select</Button>
                            </div>
                            <p className="text-sm text-muted-foreground text-left mt-4">
                              I recommend refills every 2 to 4 weeks depending
                              on personal maintenance. Don't wait too long to
                              schedule your refills. You may be charged up to a
                              full set if more than half of your eyelashes need
                              extensions.
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex items-center justify-between">
                            <BookingCalendar />
                            <Button onClick={() => console.log(booking)}>
                              Select
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="refill-calendar">
                        <AccordionTrigger>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <p className="text-lg">Classic Refill</p>
                              <p className="text-sm text-muted-foreground text-left">
                                30~40 min. $65
                              </p>
                            </div>
                            <Button id="classic-refill" type="submit">
                              Select
                            </Button>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>test</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
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
