"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

export const LayoutTextFlip = ({
  text = "",
  words = [
    "Premium Websites",
    "Luxury Websites",
    "SaaS Websites",
    "Business Websites",
    "Startup Websites",
    "AI-Powered Websites",
  ],
  duration = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <div className="home-animation">
      {/* Static text */}
      <motion.span
        layoutId="subtext"
        className="ltf-text text-2xl font-bold tracking-tight md:text-4xl"
      >
        {text}
      </motion.span>

      {/* Flipping text */}
      <motion.span
        layout
        className="ltf-container relative w-fit overflow-hidden px-4 py-2 font-sans text-2xl font-bold tracking-tight md:text-4xl"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ y: -20, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 20, opacity: 0, filter: "blur(6px)" }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            className={cn("ltf-word inline-block")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};
