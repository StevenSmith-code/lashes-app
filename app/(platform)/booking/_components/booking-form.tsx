"use client";
import {
  useEffect,
  useState,
} from 'react';

import { format } from 'date-fns-tz';
import { motion } from 'framer-motion';
import {
  Controller,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { getAppointments } from '@/actions/get-appointments';
import { ServiceList } from '@/actions/get-services';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FormDataSchema } from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import BookingCalendar from './booking-calendar';
import BookingConfirmation from './booking-confirmation';
import BookingTimePicker from './booking-time-picker';
import { PaymentButton } from './payment-button';

export type Inputs = z.infer<typeof FormDataSchema>;
type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  refillPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
type Appointment = {
  id: string;
  userId: string;
  serviceId: string;
  dateTime: Date;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  service: Service;
};

const steps = [
  { id: 1, name: "Service", fields: ["service"] },
  { id: 2, name: "Date and time", fields: ["dateTime"] },

  { id: 3, name: "Confirmation" },
];

const BookingForm = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setformData] = useState({
    price: 0,
    service: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Record<string, Set<string>>>(
    {}
  );

  const getBookedTimeSlots = (
    appointments: Appointment[]
  ): Record<string, Set<string>> => {
    const bookedSlots: Record<string, Set<string>> = {};
    appointments.forEach((appointment) => {
      const isoString = appointment.dateTime.toISOString();
      const dateObject = new Date(isoString);
      const dateStr = format(dateObject, "yyyy-MM-dd", {
        timeZone: "UTC",
      });
      const timeStr = format(dateObject, "HH:mm", {
        timeZone: "UTC",
      });

      if (!bookedSlots[dateStr]) {
        bookedSlots[dateStr] = new Set();
      }
      bookedSlots[dateStr].add(timeStr);
    });
    return bookedSlots;
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const { appointments } = await getAppointments();

      setAppointments(appointments);
      const newBookedSlots = getBookedTimeSlots(appointments);
      setBookedSlots(newBookedSlots); // Set the booked slots based on appointments
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const services = async () => {
      const services = await ServiceList();
      setServices(services);
    };
    services();
  }, []);

  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="flex flex-col justify-between mt-10 ">
      {/* steps */}
      <nav aria-label="Progress">
        <ol
          role="list"
          className="space-y-4 md:flex md:space-x-8 md:space-y-0 w-full"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Service Options
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Choose a service you would like to be done.
            </p>
            <div className="mt-10 space-y-10">
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Accordion type="single" collapsible>
                    {services.map((service) => (
                      <AccordionItem key={service.id} value={service.name}>
                        <AccordionTrigger
                          onClick={() => field.onChange(service.name)}
                        >
                          {service.name}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col items-center justify-center space-y-5">
                          <p className="text-base text-muted-foreground text-left">
                            {service.description}
                          </p>
                          <p className="text-sm">
                            ${service.price} for a full set and $
                            {service.refillPrice} for a refill.
                          </p>
                          <div className="w-1/3 flex justify-between">
                            <Button
                              variant={"default"}
                              onClick={() => {
                                setformData({
                                  ...formData,
                                  service: service.name,
                                  price: service.price,
                                });
                                next();
                              }}
                            >
                              Full set
                            </Button>
                            <Button
                              variant={"default"}
                              onClick={() => {
                                setformData({
                                  ...formData,
                                  service: service.name,
                                  price: service.refillPrice,
                                });
                                next();
                              }}
                            >
                              Refill
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              />

              {errors.service && (
                <p className="text-red-500">
                  Service is {errors.service.message}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Date and time
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Pick a date and time that fits best for you.
            </p>

            <div className="mt-10">
              <Controller
                name="dateTime"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-center space-x-6">
                    <BookingCalendar
                      withPopover
                      appointments={appointments}
                      onDateChange={(date: Date) => {
                        const formattedDate = format(date, "yyyy-MM-dd");
                        const timePart = field.value
                          ? field.value.split("T")[1]
                          : "00:00:00";
                        field.onChange(`${formattedDate}T${timePart}`);
                      }}
                    />
                    <BookingTimePicker
                      appointments={appointments}
                      bookedSlots={bookedSlots}
                    />
                  </div>
                )}
              />
              {errors.dateTime && (
                <p className="text-red-500">
                  Date and Time is {errors.dateTime.message}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <BookingConfirmation
              service={formData.service}
              servicePrice={formData.price}
            />
            <PaymentButton
              service={formData.service}
              servicePrice={formData.price}
            />
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Button>
          <Button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
