"use client"

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";
export const runtime = "edge";
export function SpotlightPreview() {
  return (
    <>
    <Spotlight
    className="-top-40 left-0 md:left-60 md:-top-20"
    fill="#D6D4D2"
  />
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-[calc(100%-4rem)] mx-auto rounded-md h-screen overflow-hidden flex flex-col items-center justify-center"
  >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-white text-3xl md:text-7xl font-bold text-center mb-6"
      >
          Sell through Solana Blinks
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-white text-sm md:text-xl max-w-xl text-center mb-5"
      >
          Take sale & distribution to a next-level scale with {<br></br>}
          {<span className="font-bold ml-1">blinkify</span>} - sell your products through blinks.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white font-semibold shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          >
              Try Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 text-white hover:underline"
          >
              Watch trailer
          </motion.button>
      </motion.div>
  </motion.div>
  </>
  );
}
