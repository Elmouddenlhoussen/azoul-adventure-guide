
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

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
      className="group relative overflow-hidden rounded-xl hover-scale"
    >
      <a href={href} className="block">
        <div className="aspect-[5/6] w-full overflow-hidden rounded-xl bg-gray-100">
          <div className="relative h-full w-full">
            {/* Image */}
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="mb-3 flex items-center">
                <span className="inline-flex items-center text-xs font-medium text-white/90">
                  <MapPin className="mr-1 h-3 w-3" />
                  {location}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-morocco-sand transition-colors">
                {title}
              </h3>
              
              <p className="text-sm text-white/80 line-clamp-2">
                {description}
              </p>
              
              <div className="mt-4 h-0.5 w-12 bg-morocco-terracotta rounded opacity-70 transition-all duration-300 group-hover:w-20 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default DestinationCard;
