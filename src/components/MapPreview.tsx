
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
      { x: canvas.width * 0.2, y: canvas.height * 0.3 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5 },
      { x: canvas.width * 0.8, y: canvas.height * 0.7 },
    ];
    
    pins.forEach(pin => {
      // Pin circle
      ctx.beginPath();
      ctx.arc(pin.x, pin.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#E67E22';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      
      // Pin shadow
      ctx.beginPath();
      ctx.arc(pin.x, pin.y + 15, 3, 0, Math.PI, true);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fill();
    });
    
    mapContainer.appendChild(canvas);
    
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
      className="relative rounded-2xl overflow-hidden shadow-xl"
    >
      <div ref={mapRef} className="aspect-[16/9] w-full bg-morocco-sand">
        {/* Map will be rendered here */}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg max-w-md">
          <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Explore destinations, find attractions, and plan your journey with our interactive map
          </p>
          <button className="bg-morocco-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-morocco-teal/90 transition-colors">
            Open Full Map
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MapPreview;
