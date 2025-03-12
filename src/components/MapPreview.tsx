
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MapPreview = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // This would be replaced with actual map integration in a production environment
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Simulate map loading with a placeholder
    const mapContainer = mapRef.current;
    
    // Create a canvas for the placeholder map
    const canvas = document.createElement('canvas');
    canvas.width = mapContainer.clientWidth;
    canvas.height = mapContainer.clientHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw a simple gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#E9DAC1');
    gradient.addColorStop(1, '#C0846B');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw some random "map-like" elements
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    // Draw wavy lines representing terrain
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * canvas.height);
      
      for (let x = 0; x < canvas.width; x += 20) {
        const y = Math.sin(x * 0.01 + i) * 20 + (canvas.height / 2) + (i * 20);
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    }
    
    // Add some "pins" or markers
    const pins = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, name: "Marrakech", href: "/destination/marrakech" },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, name: "Fes", href: "/destination/fes" },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, name: "Sahara Desert", href: "/destination/sahara" },
      { x: canvas.width * 0.3, y: canvas.height * 0.6, name: "Chefchaouen", href: "/destination/chefchaouen" },
    ];
    
    pins.forEach((pin, index) => {
      // Pin circle
      ctx.beginPath();
      ctx.arc(pin.x, pin.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#E67E22';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      
      // Pin shadow
      ctx.beginPath();
      ctx.arc(pin.x, pin.y + 15, 5, 0, Math.PI, true);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fill();
      
      // Pin label
      ctx.font = '14px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pin.name, pin.x, pin.y + 30);
    });
    
    mapContainer.appendChild(canvas);
    
    // Add click event for interactive pins (simplified example)
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if any pin was clicked
      pins.forEach(pin => {
        const distance = Math.sqrt(Math.pow(x - pin.x, 2) + Math.pow(y - pin.y, 2));
        if (distance < 15) {
          console.log(`Clicked on ${pin.name}`);
          // Navigate to the destination page
          window.location.href = pin.href;
        }
      });
    });
    
    return () => {
      if (mapContainer.contains(canvas)) {
        mapContainer.removeChild(canvas);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative rounded-2xl overflow-hidden shadow-xl group"
      whileHover={{ scale: 1.01, boxShadow: "0 15px 30px -15px rgba(0,0,0,0.3)" }}
    >
      <div ref={mapRef} className="aspect-[16/9] w-full bg-morocco-sand">
        {/* Map will be rendered here */}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.div
          initial={{ y: 10, opacity: 0.8 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg max-w-md"
        >
          <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Explore destinations, find attractions, and plan your journey with our interactive map
          </p>
          <Link to="/feature/map">
            <motion.button
              className="bg-morocco-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-morocco-teal/90 transition-colors inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Full Map
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MapPreview;
