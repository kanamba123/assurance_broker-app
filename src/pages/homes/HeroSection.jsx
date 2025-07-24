import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FlayerLogo from '../../components/ui/FlayerLogo';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nodes, setNodes] = useState([]);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { t } = useTranslation();

  // Mouse tracking with smooth spring animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Initialize spider web nodes
  useEffect(() => {
    const initializeNodes = () => {
      const newNodes = [];
      const nodeCount = 50;

      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      setNodes(newNodes);
    };

    initializeNodes();
    window.addEventListener('resize', initializeNodes);
    return () => window.removeEventListener('resize', initializeNodes);
  }, []);

  // Calculate connections and draw spider web
  const updateSpiderWeb = useCallback(() => {
    if (!canvasRef.current || nodes.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const maxDistance = 120;
    const mouseRadius = 150;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update node positions
    const updatedNodes = nodes.map(node => {
      let newX = node.x + node.vx;
      let newY = node.y + node.vy;
      let newVx = node.vx;
      let newVy = node.vy;

      // Bounce off walls
      if (newX <= 0 || newX >= canvas.width) newVx *= -1;
      if (newY <= 0 || newY >= canvas.height) newVy *= -1;

      // Mouse attraction
      const mouseDistX = mousePosition.x - newX;
      const mouseDistY = mousePosition.y - newY;
      const mouseDistance = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);

      if (mouseDistance < mouseRadius) {
        const force = (mouseRadius - mouseDistance) / mouseRadius;
        newVx += (mouseDistX / mouseDistance) * force * 0.03;
        newVy += (mouseDistY / mouseDistance) * force * 0.03;
      }

      // Apply friction
      newVx *= 0.99;
      newVy *= 0.99;

      return {
        ...node,
        x: Math.max(0, Math.min(canvas.width, newX)),
        y: Math.max(0, Math.min(canvas.height, newY)),
        vx: newVx,
        vy: newVy,
      };
    });

    setNodes(updatedNodes);

    // Draw connections
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i < updatedNodes.length; i++) {
      for (let j = i + 1; j < updatedNodes.length; j++) {
        const nodeA = updatedNodes[i];
        const nodeB = updatedNodes[j];

        const distance = Math.sqrt(
          (nodeA.x - nodeB.x) ** 2 + (nodeA.y - nodeB.y) ** 2
        );

        if (distance < maxDistance) {
          const opacity = (maxDistance - distance) / maxDistance;
          ctx.globalAlpha = opacity * 0.3;

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }
    }

    // Draw mouse connections
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
    ctx.lineWidth = 2;

    updatedNodes.forEach(node => {
      const distance = Math.sqrt(
        (node.x - mousePosition.x) ** 2 + (node.y - mousePosition.y) ** 2
      );

      if (distance < mouseRadius) {
        const opacity = (mouseRadius - distance) / mouseRadius;
        ctx.globalAlpha = opacity;

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    updatedNodes.forEach(node => {
      const distance = Math.sqrt(
        (node.x - mousePosition.x) ** 2 + (node.y - mousePosition.y) ** 2
      );

      if (distance < mouseRadius) {
        ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.globalAlpha = node.opacity;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw mouse node
    ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw mouse glow
    const gradient = ctx.createRadialGradient(
      mousePosition.x, mousePosition.y, 0,
      mousePosition.x, mousePosition.y, 50
    );
    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');

    ctx.fillStyle = gradient;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }, [nodes, mousePosition]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updateSpiderWeb();
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [updateSpiderWeb]);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div >
      {/* <div>
        <FlayerLogo />
      </div> */}


      <section
        id="contact"
        className="relative w-screen h-screen bg-center bg-no-repeat bg-contain text-primary overflow-hidden"
        style={{
          backgroundImage:
            "url('https://bestassurbrokers.com/assets/img/back/slide/diapositive1.jpg')",
        }}
      >
      </section>




      <section
        ref={containerRef}
        id="home"
        className=" flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden py-10"
      >

        {/* Spider Web Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Background Gradient Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-blue-800/30 to-indigo-800/30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Main Content */}
        <motion.div
          className="text-center z-10 px-4 relative"
          style={{
            x: smoothMouseX.get() * 0.02,
            y: smoothMouseY.get() * 0.02,
          }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 relative"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.05,
              filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent opacity-50"
              animate={{
                x: [0, 2, 0],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
            </motion.span>

            Welcome to the
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              assurance broker
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            whileHover={{
              scale: 1.02,
              color: "#ffffff",
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
            }}
          >
            Des solutions d’assurance innovantes et personnalisées pour particuliers et entreprises.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 30px rgba(124, 58, 237, 0.4)",
                filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">{t('home.hero.button1')}</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('services')}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -2,
                borderColor: "#ec4899",
                color: "#ec4899",
                boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">{t('home.hero.button2')}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Interactive Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{
            scale: 1.2,
            color: "#ec4899",
            filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))'
          }}
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown size={32} className="text-white opacity-60" />
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;