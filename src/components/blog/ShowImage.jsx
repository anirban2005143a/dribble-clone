// import { motion } from "framer-motion";

// export const ShowImage = ({ url, w }) => {
//   return (
//     <motion.div
//       className=" rounded-xl overflow-hidden w-[90%] max-w-237.5 mx-auto"
//       style={{ width: w ? `${w}%` : "90%" }}
//       initial={{opacity:0}}
//       whileInView={{opacity:100}}
//       transition={{
//         duration:0.5,
//         ease:"easeInOut"
//       }}
//     >
//
//     </motion.div>
//   );
// };

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react"; // Or any icon library

export const ShowImage = ({ url, w }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setIsZoomed(false); // Reset zoom when closing
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail Card */}
      <motion.div
        className=" rounded-xl overflow-hidden w-[90%] cursor-pointer max-w-237.5 mx-auto"
        style={{ width: w ? `${w}%` : "90%" }}
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 100,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        onClick={toggleModal}
      >
        <img
          src={url}
          aria-label={url}
          draggable={false}
          alt={`Media ${url}`}
          className=" w-full"
        />
      </motion.div>

      {/* Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            {/* buttons  */}
            <div className="absolute top-6 right-6 flex gap-4 z-[60]">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
              <button
                onClick={toggleModal}
                className="p-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
              className="relative w-[100dvw] h-[100dvh] overflow-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={url}
                alt="Full view"
                animate={{ scale: isZoomed ? 1.5 : 1 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className={`max-w-[95dvw] max-h-[95dvh] object-contain ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </motion.div>

            <div className="absolute inset-0 -z-10" onClick={toggleModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
