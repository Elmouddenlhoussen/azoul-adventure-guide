
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, MountainSnow, Compass, Palmtree } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'footer';
  showText?: boolean;
}

const Logo = ({ variant = 'default', showText = true }: LogoProps) => {
  // Logo animations
  const logoContainerVariants = {
    initial: { 
      scale: 0.9, 
      opacity: 0,
      rotate: -5
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  // Inner elements animation
  const innerElementsVariants = {
    initial: { 
      opacity: 0, 
      y: 10,
      scale: 0.8
    },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: (i: number) => ({ 
      y: [-2, 0, -2],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: i * 0.1
      }
    })
  };

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    })
  };

  // Glow animation
  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: [0.5, 0.8, 0.5],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "reverse" as const
      }
    }
  };

  // Moroccan-inspired color palette
  const bgGradient = "bg-gradient-to-br from-morocco-terracotta to-morocco-clay";
  const textGradient = "bg-gradient-to-r from-morocco-gold via-morocco-terracotta to-morocco-clay bg-clip-text text-transparent";

  return (
    <Link to="/" className="flex items-center group">
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={logoContainerVariants}
        className={`h-12 w-12 rounded-xl relative ${bgGradient} flex items-center justify-center mr-3 overflow-hidden shadow-lg border border-morocco-sand/20`}
      >
        {/* Inner glow effect */}
        <motion.div 
          className="absolute inset-1 rounded-lg bg-white/10 backdrop-blur-sm"
          variants={glowVariants}
        />
        
        {/* Logo elements - Moroccan inspired */}
        <div className="relative grid grid-cols-2 gap-0.5 p-1">
          <motion.div 
            custom={0}
            variants={innerElementsVariants}
            className="flex items-center justify-center"
          >
            <Sun className="h-4 w-4 text-white/90" strokeWidth={2.5} />
          </motion.div>
          
          <motion.div 
            custom={1}
            variants={innerElementsVariants}
            className="flex items-center justify-center"
          >
            <MountainSnow className="h-4 w-4 text-white/90" strokeWidth={2.5} />
          </motion.div>
          
          <motion.div 
            custom={2}
            variants={innerElementsVariants}
            className="flex items-center justify-center"
          >
            <Compass className="h-4 w-4 text-white/90" strokeWidth={2.5} />
          </motion.div>
          
          <motion.div 
            custom={3}
            variants={innerElementsVariants}
            className="flex items-center justify-center"
          >
            <Palmtree className="h-4 w-4 text-white/90" strokeWidth={2.5} />
          </motion.div>
        </div>
        
        {/* Traditional Moroccan symbol overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
        >
          <span className="text-white text-2xl">ⵣ</span>
        </motion.div>
      </motion.div>
      
      {showText && (
        <motion.div className="overflow-hidden">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative"
          >
            {Array.from("Azoul").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={`font-bold text-2xl inline-block tracking-tight ${textGradient} hover:tracking-normal transition-all duration-300`}
              >
                {letter}
              </motion.span>
            ))}
            
            {/* Animated underline effect */}
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-morocco-gold via-morocco-terracotta to-morocco-clay rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;
