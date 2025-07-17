import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue,useSpring,useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight, Star, Users, Zap } from 'lucide-react';

  const ContactSection = () => (
    <section id="contact" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            variants={itemVariants}
          >
            Ready to Start?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-12 text-gray-300"
            variants={itemVariants}
          >
            Let's create something amazing together. Get in touch with our team today.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.button
              className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Quote
            </motion.button>
            
            <motion.button
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-full font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );


  export default ContactSection;