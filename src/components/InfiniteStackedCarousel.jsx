import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { StackedCard } from "./ui/StackedCard"; // The component we built

export const InfiniteStackedCarousel = ({ items }) => {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-white py-24">
      <motion.div
        className="flex gap-12 w-max px-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 80,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex-shrink-0">
            <StackedCard imageSrc={item.imgUrl} label={item.label} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
