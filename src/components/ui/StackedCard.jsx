import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const StackedCard = ({ imageSrc, label }) => {
  // Generates random "whitish" pastel colors once per component mount
  const bgColors = useMemo(() => {
    const generateWhitishRGBA = () => {
      const r = 235 + Math.floor(Math.random() * 15);
      const g = 235 + Math.floor(Math.random() * 15);
      const b = 235 + Math.floor(Math.random() * 15);
      return `rgb(${r}, ${g}, ${b})`;
    };
    return [generateWhitishRGBA(), generateWhitishRGBA()];
  }, []);

  // Animation variants for the background layers
  const layerVariants = {
    initial2: { x: 6, y: -6 },
    hover2: { x: 8, y: -8 },
    initial3: { x: 10, y: -10 },
    hover3: { x: 15, y: -15 },
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <motion.div
        className="relative group cursor-pointer"
        initial="initial"
        whileHover="hover"
      >
        {/* Layer 3 */}
        <motion.div
          style={{ backgroundColor: bgColors[1] }}
          variants={{
            initial: layerVariants.initial3,
            hover: layerVariants.hover3,
          }}
          transition={{
            delay: 0.1,
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-md -z-20 "
        />

        {/* Layer 2 */}
        <motion.div
          style={{ backgroundColor: bgColors[0] }}
          variants={{
            initial: layerVariants.initial2,
            hover: layerVariants.hover2,
          }}
          transition={{
            delay: 0.2,
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-md -z-10 border-2 border-white"
        />

        {/* Layer 1 */}
        <motion.div className="relative bg-white rounded-md border-2 border-white overflow-hidden ">
          <img
            src={imageSrc}
            alt={label}
            className="w-[200px] h-[150px] object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Label Prop */}
      <h3 className="text-base font-semibold text-slate-800 tracking-tight">
        {label}
      </h3>
    </div>
  );
};

