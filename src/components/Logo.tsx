
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'footer';
  showText?: boolean;
}

const Logo = ({ variant = 'default', showText = true }: LogoProps) => {
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

  // Logo animations
  const logoContainerVariants = {
    initial: { 
      scale: 0.9, 
      opacity: 0,
      rotate: -10
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

  // Star animation
  const starVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { 
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Tifinagh symbol animation
  const tifinaghVariants = {
    initial: { scale: 0, opacity: 0 },
    hover: { 
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  // Circle glow animation
  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: [0.5, 0.8, 0.5],
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
    }
  };

  // Enhanced gradient colors based on variant
  const gradientColors = variant === 'footer' 
    ? "from-morocco-terracotta to-morocco-gold" 
    : "from-morocco-clay to-morocco-terracotta";

  return (
    <Link to="/" className="flex items-center group">
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        variants={logoContainerVariants}
        className={`h-10 w-10 rounded-full relative ${
          variant === 'footer' 
            ? 'bg-gradient-to-br from-morocco-terracotta to-morocco-gold' 
            : 'bg-gradient-to-br from-morocco-clay to-morocco-terracotta'
        } flex items-center justify-center mr-2 overflow-hidden shadow-lg`}
      >
        {/* Inner circle with glow effect */}
        <motion.div 
          className="absolute inset-0.5 rounded-full bg-white/10 backdrop-blur-sm"
          variants={glowVariants}
        />
        
        {/* Moroccan flag star that transforms on hover */}
        <motion.div className="relative z-10" variants={starVariants}>
          <Star className="h-6 w-6 text-white fill-morocco-gold stroke-morocco-gold" strokeWidth={1} />
        </motion.div>
        
        {/* Tifinagh symbol "ⵣ" (Yaz) - symbolizes free men (Amazigh) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          variants={tifinaghVariants}
        >
          <span className="text-white text-xl font-bold">ⵣ</span>
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
                className="font-bold text-xl inline-block tracking-tight bg-gradient-to-r from-morocco-teal to-morocco-terracotta bg-clip-text text-transparent hover:tracking-normal transition-all duration-300"
              >
                {letter}
              </motion.span>
            ))}
            {/* Animated underline effect */}
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-morocco-teal to-morocco-terracotta rounded-full"
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
