import { motion } from "framer-motion";

export const ShowImage = ({ url, w }) => {
  return (
    <motion.div
      className=" rounded-xl overflow-hidden w-[90%] max-w-237.5 mx-auto"
      style={{ width: w ? `${w}%` : "90%" }}
      initial={{opacity:0}}
      whileInView={{opacity:100}}
      transition={{
        duration:0.5,
        ease:"easeInOut"
      }}
    >
      <img
        src={url}
        aria-label={url}
        draggable={false}
        alt={`${url}`}
        className=" w-full"
      />
    </motion.div>
  );
};
