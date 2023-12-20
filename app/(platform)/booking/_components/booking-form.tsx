"use client";
import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  Controller,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FormDataSchema } from '@/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  { id: 1, name: "Service", fields: ["service"] },
  { id: 2, name: "Date and time" },
  { id: 3, name: "Personal" },
  { id: 4, name: "Confirmation" },
];
const services = [
  {
    id: 1,
    name: "Classic",
    description:
      "Classic eyelash extensions are a single eyelash extension attached to a single eyelash.",
  },
  {
    id: 2,
    name: "3D",
    description:
      "3D eyelash extensions are thinner, light weight extensions, 3 extensions per lash,a more natural look.",
  },
  {
    id: 3,
    name: "5D",
    description:
      "5D Volume lashes are a more dramatic look using 5 very lightweight and thin extensions.",
  },
  {
    id: 4,
    name: "Hybrid",
    description:
      "Hybrid lashes are a mix of Classic and 3D. They will fall out naturally along with the natural growth cycle of each lash.",
  },
];

const BookingForm = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setformData] = useState({
    service: "",
    dateTime: "",
    contactInfo: "",
  });
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
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">
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
                      <AccordionItem
                        key={service.id}
                        value={service.id.toString()}
                      >
                        <AccordionTrigger
                          onClick={() => field.onChange(service.id.toString())}
                        >
                          {service.name}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col items-center justify-center space-y-5">
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                          <Button
                            variant={"ghost"}
                            onClick={() => {
                              setformData({
                                ...formData,
                                service: service.name,
                              });
                              next();
                            }}
                          >
                            Select
                          </Button>
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
              Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
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
