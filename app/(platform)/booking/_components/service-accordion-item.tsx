import React from 'react';

import { ChevronDownIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { ServiceOption } from './service-option';

interface ServiceAccordionItemProps {
  serviceName: string;
  options: string[];
}
export const ServiceAccordionItem = ({
  serviceName,
  options,
}: ServiceAccordionItemProps) => {
  return (
    <AccordionItem value={serviceName}>
      <AccordionTrigger>
        <div className="flex items-center justify-between w-full">
          <p className="uppercase text-lg font-semibold">{serviceName}</p>
          <ChevronDownIcon
            className="transition-all [&[data-state=open]>svg]:rotate-180"
            aria-hidden
          />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Accordion type="single" collapsible>
          {options.map((option) => (
            <ServiceOption key={option} optionName={option} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};
