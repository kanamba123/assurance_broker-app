import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue,useSpring,useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight, Star, Users, Zap } from 'lucide-react';
import HeroSection from './HeroSection';
import Header from './Header';


  // About Section
  const AboutSection = () => (
    <section id="about" className="py-20 bg-gray-50">
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
            About Our Vision
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content with Right Animation */}
            <motion.div variants={fadeInLeft}>
              <motion.h3 
                className="text-2xl font-semibold mb-6 text-gray-800"
                variants={fadeInUp}
              >
                Innovation Meets Design
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 mb-6 leading-relaxed"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                We believe in creating digital experiences that not only look stunning but also provide seamless functionality. Our team combines cutting-edge technology with creative design to deliver solutions that exceed expectations.
              </motion.p>
              
              <motion.p 
                className="text-gray-600 leading-relaxed mb-8"
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
              >
                From concept to deployment, we ensure every pixel serves a purpose and every interaction feels natural and intuitive.
              </motion.p>
              
              {/* Team Image with Parallax Effect */}
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-lg relative"
                variants={scaleIn}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Team collaboration"
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 opacity-0"
                  whileHover={{ opacity: 1, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-medium text-gray-800">Our Creative Team</p>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right Stats Card with Left Animation */}
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg"
              variants={fadeInRight}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="grid grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { number: "150+", label: "Projects Completed", delay: 0.1 },
                  { number: "98%", label: "Client Satisfaction", delay: 0.2 },
                  { number: "5+", label: "Years Experience", delay: 0.3 },
                  { number: "24/7", label: "Support", delay: 0.4 }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ delay: stat.delay, type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-purple-600 mb-2"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: stat.delay, 
                        type: "spring", 
                        stiffness: 200,
                        damping: 10
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <motion.p 
                      className="text-gray-600 text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: stat.delay + 0.2 }}
                    >
                      {stat.label}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  export default AboutSection;