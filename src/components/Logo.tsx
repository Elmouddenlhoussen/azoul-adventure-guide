
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

  // Logo box animation
  const logoBoxVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  // Logo box spin on load
  const initialRotateVariants = {
    initial: { rotate: -180, opacity: 0 },
    animate: { 
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1
      }
    }
  };

  // Arabic letter animation
  const arabicLetterVariants = {
    rest: { y: 0 },
    hover: { 
      y: -20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Combined initial and animate states
  const combinedInitial = {
    ...logoBoxVariants.rest,
    ...initialRotateVariants.initial
  };
  
  const combinedAnimate = {
    ...logoBoxVariants.rest,
    ...initialRotateVariants.animate
  };

  // Enhanced gradient colors based on variant
  const gradientColors = variant === 'footer' 
    ? "from-morocco-gold to-morocco-terracotta" 
    : "from-morocco-clay to-morocco-terracotta";

  return (
    <Link to="/" className="flex items-center group">
      <motion.div
        initial={combinedInitial}
        animate={combinedAnimate}
        whileHover="hover"
        whileTap="tap"
        variants={logoBoxVariants}
        className={`h-10 w-10 rounded-full relative ${
          variant === 'footer' 
            ? 'bg-gradient-to-br from-morocco-gold to-morocco-terracotta' 
            : 'bg-gradient-to-br from-morocco-teal to-morocco-clay'
        } flex items-center justify-center mr-2 overflow-hidden shadow-lg`}
      >
        {/* Inner circle with glow effect */}
        <motion.div 
          className="absolute inset-0.5 rounded-full bg-white/10 backdrop-blur-sm"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.span 
          variants={arabicLetterVariants}
          initial="rest"
          whileHover="hover"
          className="flex flex-col items-center relative z-10"
        >
          <motion.span 
            className="font-bold text-white text-xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A
          </motion.span>
          <motion.span 
            className="font-bold text-white text-xl mt-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            ز
          </motion.span>
        </motion.span>
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
