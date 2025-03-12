
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'footer';
  showText?: boolean;
}

const Logo = ({ variant = 'default', showText = true }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center group">
      <motion.div
        whileHover={{ rotate: [0, -5, 5, -5, 5, 0], scale: 1.1 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 15,
          rotate: { duration: 0.5, ease: "easeInOut" }
        }}
        className={`h-8 w-8 rounded-md ${variant === 'footer' ? 'bg-morocco-terracotta' : 'bg-morocco-clay'} flex items-center justify-center mr-2 overflow-hidden shadow-md`}
      >
        <motion.span 
          initial={{ y: 0 }}
          whileHover={{ y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="font-bold text-white text-xl">A</span>
          <span className="font-bold text-white text-xl mt-5">ز</span>
        </motion.span>
      </motion.div>
      
      {showText && (
        <motion.span
          initial={{ width: "auto" }}
          whileHover={{ scale: 1.05, x: 3 }}
          transition={{ duration: 0.2 }}
          className="font-bold text-xl tracking-tight bg-gradient-to-r from-morocco-clay to-morocco-terracotta bg-clip-text text-transparent"
        >
          Azoul
        </motion.span>
      )}
    </Link>
  );
};

export default Logo;
