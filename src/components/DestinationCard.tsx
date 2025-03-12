
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  title: string;
  description: string;
  image: string;
  location: string;
  href: string;
  index: number;
}

const DestinationCard = ({
  title,
  description,
  image,
  location,
  href,
  index,
}: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative overflow-hidden rounded-xl"
    >
      <Link to={href} className="block">
        <div className="aspect-[5/6] w-full overflow-hidden rounded-xl bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-full w-full">
            {/* Image */}
            <motion.img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              loading="lazy"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <motion.div 
                className="mb-3 flex items-center"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, x: 3 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-flex items-center text-xs font-medium text-white/90 group-hover:text-white transition-colors">
                  <MapPin className="mr-1 h-3 w-3" />
                  {location}
                </span>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold text-white mb-2 group-hover:text-morocco-sand transition-colors duration-300"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h3>
              
              <motion.p 
                className="text-sm text-white/80 line-clamp-2 group-hover:text-white/95 transition-colors"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {description}
              </motion.p>
              
              <motion.div 
                className="mt-4 h-0.5 bg-morocco-terracotta rounded opacity-70"
                initial={{ width: 48 }}
                whileHover={{ width: 80, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
