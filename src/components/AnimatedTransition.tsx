
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTransitionProps {
  children: ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideRight' | 'slideLeft' | 'scale' | 'bounce' | 'rotate' | 'flip' | 'elastic' | 'reveal' | 'glide' | 'blur';
  delay?: number;
  duration?: number;
  once?: boolean;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  slideRight: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  slideLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 30 }
  },
  bounce: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { 
      duration: 0.6, 
      type: "spring", 
      stiffness: 300, 
      damping: 15,
      bounce: 0.5
    }
  },
  rotate: {
    initial: { opacity: 0, rotate: -5, scale: 0.95 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 5, scale: 0.95 },
    transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 20 }
  },
  flip: {
    initial: { opacity: 0, rotateX: 80 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -80 },
    transition: { duration: 0.6, type: "spring", stiffness: 300, damping: 15 }
  },
  elastic: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10,
      mass: 1.2
    }
  },
  reveal: {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  glide: {
    initial: { opacity: 0, y: 20, skewY: 2 },
    animate: { opacity: 1, y: 0, skewY: 0 },
    exit: { opacity: 0, y: 20, skewY: 2 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
    transition: { duration: 0.6 }
  }
};

const AnimatedTransition = ({ 
  children, 
  variant = 'fade',
  delay = 0,
  duration = 0.5,
  once = false
}: AnimatedTransitionProps) => {
  const selectedVariant = variants[variant];
  
  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={{ 
        ...selectedVariant.transition, 
        delay, 
        duration 
      }}
      className="w-full"
      viewport={once ? { once: true, margin: "-100px" } : undefined}
      whileInView={once ? selectedVariant.animate : undefined}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
