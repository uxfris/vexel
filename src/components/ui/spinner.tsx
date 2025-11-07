import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      className="w-12 h-12 border-4 border-t-black border-gray-200 rounded-full mx-auto"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
};

export default Spinner;
