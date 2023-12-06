import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useBookingStore from '@/hooks/useBookingStore';

import BookingCalendar from './booking-calendar';

interface ServiceOptionProps {
  optionName: string;
}

export const ServiceOption: React.FC<ServiceOptionProps> = ({ optionName }) => {
  const { setServiceName } = useBookingStore();

  const handleSelectOption = () => {
    setServiceName(optionName);
  };

  return (
    <AccordionItem value={optionName}>
      <AccordionTrigger onClick={handleSelectOption}>
        <div className="flex items-center justify-between w-full">
          <p className="text-md">{optionName}</p>
          <Button onClick={handleSelectOption}>Select</Button>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex items-center justify-between">
          <BookingCalendar />
          <Button>Enter</Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
