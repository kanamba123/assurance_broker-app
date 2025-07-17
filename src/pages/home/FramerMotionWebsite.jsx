import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight, Star, Users, Zap } from 'lucide-react';
import HeroSection from './HeroSection';

const FramerMotionWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  // Header component
  const Header = () => (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            YourBrand
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-gray-700 hover:text-purple-600 transition-colors ${
                  activeSection === item.id ? 'text-purple-600 font-semibold' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-purple-600"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );



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

  // Add a new Portfolio/Gallery Section
  const PortfolioSection = () => {
    const projects = [
      {
        title: "E-commerce Platform",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Modern e-commerce solution with seamless checkout experience"
      },
      {
        title: "Mobile Banking App",
        category: "Mobile Design",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        description: "Secure and intuitive mobile banking interface"
      },
      {
        title: "Dashboard Analytics",
        category: "Data Visualization",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Advanced analytics dashboard with real-time insights"
      },
      {
        title: "Social Media Platform",
        category: "Social Network",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80",
        description: "Next-generation social platform with enhanced privacy"
      }
    ];

    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"
              variants={itemVariants}
            >
              Our Portfolio
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-sm font-medium bg-purple-600 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  };
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

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection/>
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default FramerMotionWebsite;