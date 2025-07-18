// src/components/PageTransition.js
import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 0.95,
  },
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
