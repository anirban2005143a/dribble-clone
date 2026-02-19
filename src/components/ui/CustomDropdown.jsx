import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropdown = ({ label, options, value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" relative z-50 overflow-visible " ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center cursor-pointer justify-between px-3 py-2 text-sm  rounded-md text-gray-800 font-semibold"
      >
        <span className="capitalize">{value}</span>

        <span>
          {!isOpen && (
            <ChevronDown className="w-4 h-4 ml-1.5 mt-1 text-gray-800" />
          )}
          {isOpen && (
            <ChevronUp className="w-4 h-4 ml-1.5 mt-1 text-gray-800" />
          )}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-9999 p-3 top-[105%] min-w-[150px] -space-y-0.5 left-0 bg-white rounded-md shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setValue(option.value);
                  setIsOpen(false);
                }}
                className={`z-9999 w-full text-left cursor-pointer text-[15px] px-3 py-2 rounded-md transition hover:bg-slate-50 ${
                  value === option.value
                    ? " text-gray-800 font-bold"
                    : "text-gray-800 "
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
