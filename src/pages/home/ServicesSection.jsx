import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue,useSpring,useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight, Star, Users, Zap } from 'lucide-react';
import HeroSection from './HeroSection';
import Header from './Header';
import AboutSection from './AboutSection';


  // Services Section
  const ServicesSection = () => {
    const services = [
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Performance Optimization",
        description: "Lightning-fast websites that load instantly and provide smooth user experiences across all devices.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "User Experience Design",
        description: "Intuitive interfaces designed with your users in mind, ensuring maximum engagement and satisfaction.",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        icon: <Star className="w-8 h-8" />,
        title: "Premium Development",
        description: "High-quality code that's maintainable, scalable, and built using the latest web technologies.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      }
    ];

    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"
              variants={fadeInUp}
            >
              Our Services
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden group cursor-pointer"
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateY: 5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Service Image with Parallax */}
                  <motion.div 
                    className="h-48 overflow-hidden relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.2, rotate: 2 }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Overlay with Dialog Animation */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 flex items-end"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="p-6 text-white"
                        variants={dialogVariants}
                        initial="hidden"
                        whileHover="visible"
                        exit="exit"
                      >
                        <motion.h4 
                          className="font-semibold text-lg mb-2"
                          initial={{ x: -20, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {service.title}
                        </motion.h4>
                        <motion.p 
                          className="text-sm opacity-90"
                          initial={{ x: -20, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Learn more about our approach
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Service Content */}
                  <motion.div 
                    className="p-8 text-center"
                    variants={fadeInUp}
                  >
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full mb-6"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.2,
                        boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)"
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-semibold mb-4 text-gray-800"
                      variants={fadeInUp}
                    >
                      {service.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      variants={fadeInUp}
                      transition={{ delay: 0.1 }}
                    >
                      {service.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  };


  export default ServicesSection;