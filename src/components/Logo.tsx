
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
      y: -30,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <Link to="/" className="flex items-center group">
      <motion.div
        variants={logoBoxVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        className={`h-9 w-9 rounded-md ${variant === 'footer' ? 'bg-morocco-terracotta' : 'bg-morocco-clay'} flex items-center justify-center mr-2 overflow-hidden shadow-md`}
        // Fixed issue by combining these into a single animate/initial props with the variants
        animate={initialRotateVariants.animate}
        initial={initialRotateVariants.initial}
      >
        <motion.span 
          variants={arabicLetterVariants}
          initial="rest"
          whileHover="hover"
          className="flex flex-col items-center"
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
          >
            {Array.from("Azoul").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="font-bold text-xl inline-block tracking-tight bg-gradient-to-r from-morocco-clay to-morocco-terracotta bg-clip-text text-transparent hover:tracking-normal transition-all duration-300"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;
