// Loader.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const svgVariants = {
    start: { rotate: 0 },
    end: { rotate: 360 }
};

const innerSvgVariants = {
    start: { rotate: 0 },
    end: { rotate: -360 } // Rotate in the opposite direction
};

const textVariants = {
    start: { opacity: 0.5, scale: 0.8 },
    end: { opacity: 1, scale: 1.2 }
};

const Loader = () => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                position: 'relative'
            }}
        >
            <motion.svg
                variants={svgVariants}
                animate="end"
                initial="start"
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                width="150" height="150" viewBox="0 0 150 150"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <defs>
                    {/* Rainbow Gradient Definition */}
                    
                    <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                        <stop offset="16%" style={{ stopColor: "#FF7F00", stopOpacity: 1 }} />
                        <stop offset="33%" style={{ stopColor: "#FFFF00", stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: "#00FF00", stopOpacity: 1 }} />
                        <stop offset="66%" style={{ stopColor: "#0000FF", stopOpacity: 1 }} />
                        <stop offset="83%" style={{ stopColor: "#4B0082", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#9400D3", stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Inverse Rainbow Gradient Definition */}

                    <linearGradient id="inverse-rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#9400D3", stopOpacity: 1 }} />
                        <stop offset="16%" style={{ stopColor: "#4B0082", stopOpacity: 1 }} />
                        <stop offset="33%" style={{ stopColor: "#0000FF", stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: "#00FF00", stopOpacity: 1 }} />
                        <stop offset="66%" style={{ stopColor: "#FFFF00", stopOpacity: 1 }} />
                        <stop offset="83%" style={{ stopColor: "#FF7F00", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                
                {/* Rotating outer circle with gradient */}
                <circle cx="75" cy="75" r="60" stroke="url(#rainbow-gradient)" strokeWidth="10" fill="none" />
                
                {/* Rotating inner circle with inverse gradient */}
                <motion.circle
                    variants={innerSvgVariants}
                    animate="end"
                    initial="start"
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    cx="75" cy="75" r="40" stroke="url(#inverse-rainbow-gradient)" strokeWidth="10" fill="none"
                />
                
                {/* Animated text */}
                <motion.text
                    variants={textVariants}
                    animate="end"
                    initial="start"
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    x="50%" y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="40"
                    fill="url(#rainbow-gradient)" // Apply gradient to the text fill
                    fontFamily="Arial, sans-serif"
                    fontWeight="bold"
                >
                    {/* Text Content */}
                    D$D
                </motion.text>
            </motion.svg>
            <Typography
                variant="h6"
                sx={{ 
                    mt: 2, 
                    position: 'relative', 
                    zIndex: 1,
                    background: 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold'
                }}
            >
                Loading...
            </Typography>
        </Box>
    );
};

export default Loader;
