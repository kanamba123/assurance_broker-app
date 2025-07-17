import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue,useSpring,useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight, Star, Users, Zap } from 'lucide-react';

 // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            YourBrand
          </div>
          <p className="text-gray-400 mb-8">
            Building the future, one pixel at a time.
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              © 2024 YourBrand. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );

  export default Footer;