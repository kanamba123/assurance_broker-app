import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const { t } = useTranslation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const initializeNodes = () => {
      const nodeCount = 50;
      const newNodes = Array.from({ length: nodeCount }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      }));
      nodesRef.current = newNodes;
    };

    initializeNodes();
    window.addEventListener('resize', initializeNodes);
    return () => window.removeEventListener('resize', initializeNodes);
  }, []);

  const updateSpiderWeb = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodesRef.current.length === 0) return;
    const ctx = canvas.getContext('2d');
    const maxDistance = 120;
    const mouseRadius = 150;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const updatedNodes = nodesRef.current.map((node) => {
      let { x, y, vx, vy } = node;

      x += vx;
      y += vy;

      if (x <= 0 || x >= canvas.width) vx *= -1;
      if (y <= 0 || y >= canvas.height) vy *= -1;

      const dx = mousePosition.x - x;
      const dy = mousePosition.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseRadius) {
        const force = (mouseRadius - dist) / mouseRadius;
        vx += (dx / dist) * force * 0.03;
        vy += (dy / dist) * force * 0.03;
      }

      vx *= 0.99;
      vy *= 0.99;

      return {
        ...node,
        x: Math.max(0, Math.min(canvas.width, x)),
        y: Math.max(0, Math.min(canvas.height, y)),
        vx,
        vy,
      };
    });

    nodesRef.current = updatedNodes;

    // Draw lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i < updatedNodes.length; i++) {
      for (let j = i + 1; j < updatedNodes.length; j++) {
        const a = updatedNodes[i];
        const b = updatedNodes[j];
        const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        if (dist < maxDistance) {
          ctx.globalAlpha = ((maxDistance - dist) / maxDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw mouse connections
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
    ctx.lineWidth = 2;

    updatedNodes.forEach((node) => {
      const dist = Math.sqrt((node.x - mousePosition.x) ** 2 + (node.y - mousePosition.y) ** 2);
      if (dist < mouseRadius) {
        ctx.globalAlpha = (mouseRadius - dist) / mouseRadius;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    updatedNodes.forEach((node) => {
      const dist = Math.sqrt((node.x - mousePosition.x) ** 2 + (node.y - mousePosition.y) ** 2);
      ctx.fillStyle = dist < mouseRadius ? 'rgba(236, 72, 153, 0.8)' : 'rgba(255, 255, 255, 0.6)';
      ctx.globalAlpha = dist < mouseRadius ? 1 : node.opacity;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw mouse glow
    ctx.globalAlpha = 1;
    const gradient = ctx.createRadialGradient(mousePosition.x, mousePosition.y, 0, mousePosition.x, mousePosition.y, 50);
    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)');
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mousePosition.x, mousePosition.y, 50, 0, Math.PI * 2);
    ctx.fill();
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => containerRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const animate = () => {
      updateSpiderWeb();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [updateSpiderWeb]);

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (

    <div>
        <section
        id="contact"
        className="relative w-screen h-screen bg-center bg-no-repeat bg-contain text-primary overflow-hidden"
        style={{
          backgroundImage:
            "url('https://bestassurbrokers.com/assets/img/back/slide/diapositive1.jpg')",
        }}
      >
      </section>

      
    <section ref={containerRef} id="home" className="relative w-screen h-screen bg-black text-white overflow-hidden flex items-center justify-center">
       
      
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <motion.div
        className="text-center relative z-10 px-4"
        style={{
          x: smoothMouseX.get() * 0.02,
          y: smoothMouseY.get() * 0.02,
        }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          Welcome to the <br />
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
          <button
            onClick={() => scrollToSection('about')}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all"
          >
            {t('home.hero.button1')} <ArrowRight size={20} />
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-6 py-3 rounded-full transition-all"
          >
            {t('home.hero.button2')}
          </button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown size={32} className="text-white opacity-60" />
        </motion.div>
      </motion.div>
    </section>
    </div>
  );
};

export default HeroSection;
