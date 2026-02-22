import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import { MapPin, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// SMVDU Campus coordinates (Katra, J&K)
const CAMPUS_CENTER = [32.9415, 74.9540];
const CAMPUS_ZOOM = 16;

const VENUES = [
  { name: "Main Auditorium", lat: 32.9420, lng: 74.9535, description: "Opening & Closing ceremonies, Hackathon presentations", color: '#00F0FF' },
  { name: "CS Block", lat: 32.9410, lng: 74.9550, description: "Hackathon labs, Code Sprint venue", color: '#BD00FF' },
  { name: "Sports Complex", lat: 32.9405, lng: 74.9560, description: "RoboWars arena, Indoor games", color: '#00FF94' },
  { name: "Exhibition Hall", lat: 32.9425, lng: 74.9525, description: "Tech Exhibition, Sponsor booths", color: '#FFB800' },
  { name: "Open Air Theatre", lat: 32.9415, lng: 74.9545, description: "Star Night, Cultural events", color: '#FF006E' },
  { name: "Seminar Hall", lat: 32.9430, lng: 74.9540, description: "Workshops, Panel discussions", color: '#00F0FF' },
  { name: "Gaming Arena", lat: 32.9412, lng: 74.9570, description: "Esports tournaments", color: '#BD00FF' },
  { name: "Open Ground", lat: 32.9400, lng: 74.9530, description: "Drone Racing track", color: '#00FF94' },
];

function PulseMarker({ venue, onClick, isActive }) {
  return (
    <CircleMarker
      center={[venue.lat, venue.lng]}
      radius={isActive ? 12 : 8}
      pathOptions={{
        color: venue.color,
        fillColor: venue.color,
        fillOpacity: isActive ? 0.4 : 0.2,
        weight: 2,
        opacity: isActive ? 0.9 : 0.5,
      }}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div className="font-body text-xs">
          <strong>{venue.name}</strong>
          <br />
          {venue.description}
        </div>
      </Popup>
    </CircleMarker>
  );
}

export default function LeafletMap() {
  const [activeVenue, setActiveVenue] = useState(null);

  return (
    <section id="campus" className="relative py-24 md:py-32 overflow-hidden" data-testid="campus-section">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-4">Venue</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">HUD</span>
          </h2>
          <p className="font-body text-base text-white/40 mt-4 max-w-xl">
            SMVDU Campus, Katra, Jammu & Kashmir. Interactive mini-map with live venue markers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          style={{ height: '450px' }}
          data-testid="campus-map-container"
        >
          {/* HUD overlay corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/20 z-[500] pointer-events-none rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/20 z-[500] pointer-events-none rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400/20 z-[500] pointer-events-none rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/20 z-[500] pointer-events-none rounded-br-2xl" />

          {/* Coordinates overlay */}
          <div className="absolute bottom-3 left-4 z-[500] font-mono text-[10px] text-cyan-400/40 pointer-events-none">
            32.94°N 74.95°E / SMVDU CAMPUS
          </div>

          <MapContainer
            center={CAMPUS_CENTER}
            zoom={CAMPUS_ZOOM}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; CARTO'
            />
            {VENUES.map((venue, i) => (
              <PulseMarker
                key={i}
                venue={venue}
                isActive={activeVenue?.name === venue.name}
                onClick={() => setActiveVenue(activeVenue?.name === venue.name ? null : venue)}
              />
            ))}
          </MapContainer>

          {/* Active venue tooltip */}
          <AnimatePresence>
            {activeVenue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-4 right-4 z-[500] w-64 p-4 rounded-xl backdrop-blur-2xl bg-black/80 border border-cyan-400/20"
                data-testid="campus-venue-tooltip"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeVenue.color }} />
                      <h4 className="font-heading text-sm text-white tracking-wide">{activeVenue.name}</h4>
                    </div>
                    <p className="font-body text-xs text-white/50 mt-1">{activeVenue.description}</p>
                  </div>
                  <button onClick={() => setActiveVenue(null)} className="text-white/30 hover:text-white/60"><X size={14} /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
