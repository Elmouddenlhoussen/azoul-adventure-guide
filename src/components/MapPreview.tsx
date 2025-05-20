
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack/vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Set default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

// Define Moroccan destinations for the map
const destinations = [
  { id: "marrakech", name: "Marrakech", location: [31.6295, -7.9811], description: "Known as the Red City" },
  { id: "fes", name: "Fes", location: [34.0181, -5.0078], description: "Country's cultural capital" },
  { id: "sahara", name: "Sahara Desert", location: [31.1700, -4.0000], description: "Vast desert landscape" },
  { id: "chefchaouen", name: "Chefchaouen", location: [35.1688, -5.2636], description: "The blue pearl of Morocco" },
];

const MapPreview = () => {
  const mapRef = useRef<HTMLDivElement>(null);

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
        <MapContainer 
          center={[31.7917, -7.0926]} // Center of Morocco
          zoom={5} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {destinations.map((destination) => (
            <Marker 
              key={destination.id}
              position={[destination.location[0], destination.location[1]]}
              eventHandlers={{
                click: () => {
                  window.location.href = `/destination/${destination.id}`;
                },
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">{destination.name}</h3>
                  <p className="text-sm">{destination.description}</p>
                  <Link 
                    to={`/destination/${destination.id}`}
                    className="text-morocco-teal hover:underline text-xs inline-block mt-1"
                  >
                    Explore
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
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
