import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Upload, Info } from "lucide-react";
import { Tooltip } from "./ui/Tooltip";

const ActionButton = ({ icon: Icon, label }) => {
  const [tooltipMessage, settooltipMessage] = useState("");
  const [tooltipPosition, settooltipPosition] = useState({
    x: -1,
    y: -1,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    settooltipPosition({
      x: rect.left,
      y: rect.top + rect.height / 2,
    });

    settooltipMessage(`${label}`);
  };

  const handleMouseLeave = () => {
    settooltipMessage("");
    settooltipPosition({ x: -1, y: -1 });
  };

  console.log(tooltipPosition, tooltipMessage);

  return (
    <div className=" relative">
      {/* Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-[120%] top-1/2 -translate-y-1/2 mb-3 z-50 pointer-events-none"
          >
            <div className="relative bg-[#0F111A] text-white text-[13px] py-2 px-4 rounded-lg whitespace-nowrap shadow-xl border border-white/5 font-medium">
              {label}
              <div
  className="absolute left-[98%] top-1/2 -translate-y-1/2 w-0 h-0 
  border-t-[6px] border-t-transparent 
  border-b-[6px] border-b-transparent 
  border-l-[6px] border-l-[#0F111A]"
></div>
            </div>
          </motion.div>
        )}
      <div
        className="relative flex justify-center items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Button */}
        <button className="p-2.5 rounded-full border border-gray-200 text-[#1A1D26] hover:border-gray-300 transition-colors bg-white cursor-pointer">
          <Icon size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export const IconStack = ({ className }) => {
  return (
    <div className={`flex flex-col space-y-5 items-center ${className}`}>
      <ActionButton icon={MessageSquare} label="Feedback" />
      <ActionButton icon={Upload} label="Share" />
      <ActionButton icon={Info} label="Details" />
    </div>
  );
};
