
import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
  icon,
  index,
  href
}: FeatureCardProps) => {
  // Animation variants
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      <Link to={href} className="block h-full">
        <Card className="p-6 h-full border border-border hover:border-morocco-clay/30 transition-colors hover:shadow-md">
          <div className="mb-4 inline-flex p-3 rounded-full bg-morocco-sand/20">
            {createElement(icon, { className: "h-6 w-6 text-morocco-clay" })}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </Card>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;
