
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  href: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  index,
  href,
}: FeatureCardProps) => {
  return (
    <Link to={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 10px 30px -15px rgba(0,0,0,0.15)", 
          y: -5 
        }}
        className="glass-card p-6 rounded-2xl cursor-pointer group"
      >
        <motion.div 
          className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-morocco-sand group-hover:bg-morocco-terracotta transition-colors duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="h-6 w-6 text-morocco-clay group-hover:text-white transition-colors duration-300" />
        </motion.div>
        
        <motion.h3 
          className="mb-2 text-xl font-semibold group-hover:text-morocco-terracotta transition-colors duration-300"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-muted-foreground">{description}</p>
        
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          className="h-0.5 bg-morocco-terracotta mt-4 rounded-full origin-left"
        />
      </motion.div>
    </Link>
  );
};

export default FeatureCard;
