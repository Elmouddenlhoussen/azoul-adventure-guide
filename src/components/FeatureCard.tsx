
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  index,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card p-6 rounded-2xl hover-scale"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-morocco-sand">
        <Icon className="h-6 w-6 text-morocco-clay" />
      </div>
      
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
