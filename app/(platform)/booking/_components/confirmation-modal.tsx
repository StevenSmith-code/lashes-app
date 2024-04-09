"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

const ConfirmationModal = ({ status }: { status: string }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const circleAnimation = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const checkmarkAnimation = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { delay: 1, duration: 0.5, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
    }, 1500); // Delay for circle animation to complete plus some buffer

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[calc(100vh-56px)] flex justify-center items-center">
      <div className="w-1/2 h-2/3 rounded-lg shadow-sm flex flex-col justify-center items-center text-center border border-black/10 space-y-5  ">
        <motion.svg
          initial="hidden"
          animate="visible"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32"
        >
          {/* Circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="60"
            stroke={status === "1" ? "green" : "red"}
            strokeWidth="4"
            fill="transparent"
            variants={circleAnimation}
          />

          {/* Checkmark or X */}
          {status === "1" ? (
            <motion.path
              d="M40,65 l16,16 l32,-32"
              fill="transparent"
              stroke="green"
              strokeWidth="4"
              strokeLinecap="round"
              variants={checkmarkAnimation}
            />
          ) : (
            animationCompleted && (
              <motion.g fill="none" stroke="red" strokeWidth="4">
                <motion.line
                  x1="48"
                  y1="48"
                  x2="80"
                  y2="80"
                  strokeLinecap="round"
                />
                <motion.line
                  x1="80"
                  y1="48"
                  x2="48"
                  y2="80"
                  strokeLinecap="round"
                />
              </motion.g>
            )
          )}
        </motion.svg>
        <div className="flex-col justify-center items-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-5xl">
            Appointment {status === "1" ? "Set" : "Canceled"}
          </h1>
          <p className="text-xl text-muted-foreground mt-5">
            {status === "1"
              ? "A confirmation email has been sent to you for your upcoming appointment."
              : "Something went wrong... Please try again later."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
