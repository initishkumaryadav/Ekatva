import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, X, ExternalLink, ChevronRight, Building2, Users,
  Navigation, LocateFixed, Route,
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { EVENTS_DATA } from '../data/events';
import { buildVenueEventMap } from '../data/venues';

/* --- SMVDU Campus center --- */
const CAMPUS_CENTER = [32.9415, 74.9540];
const CAMPUS_ZOOM = 17;

/* --- Custom colored marker icon --- */
function createVenueIcon(color, isActive) {
  const size = isActive ? 32 : 24;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="white" stroke="${color}" stroke-width="1.5"/></svg>`;
  return L.divIcon({
    html: svg,
    className: 'custom-venue-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

/* --- Routing control component --- */
function RoutingControl({ from, to, map, color }) {
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    // Safely remove existing route control
    if (routingRef.current) {
      try {
        routingRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingRef.current);
      } catch (e) { /* already removed */ }
      routingRef.current = null;
    }

    let cancelled = false;

    const control = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [
          { color: color || '#3B82F6', weight: 5, opacity: 0.8 },
          { color: 'white', weight: 8, opacity: 0.3 },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      },
      createMarker: () => null,
      show: false,
      collapsible: true,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'foot',
      }),
    });

    // Only add to map if not already cancelled (avoids race with cleanup)
    if (!cancelled) {
      control.addTo(map);
      // Hide the routing instructions panel
      const container = control.getContainer();
      if (container) container.style.display = 'none';
      routingRef.current = control;
    }

    return () => {
      cancelled = true;
      if (routingRef.current) {
        try {
          routingRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingRef.current);
        } catch (e) { /* map may already be torn down */ }
        routingRef.current = null;
      }
    };
  }, [map, from, to, color]);

  return null;
}

/* --- Fly to venue --- */
function FlyToVenue({ venue }) {
  const map = useMap();
  useEffect(() => {
    if (venue?.lat && venue?.lng) {
      map.flyTo([venue.lat, venue.lng], 18, { duration: 0.8 });
    }
  }, [venue, map]);
  return null;
}

export default function CampusMap() {
  const [activeVenue, setActiveVenue] = useState(null);
  const [expandedDept, setExpandedDept] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [locating, setLocating] = useState(false);

  const venueData = useMemo(
    () => buildVenueEventMap(EVENTS_DATA.departmentEvents),
    []
  );

  const groupedEvents = useMemo(() => {
    if (!activeVenue) return [];
    const groups = {};
    activeVenue.events.forEach(ev => {
      if (!groups[ev.shortName]) {
        groups[ev.shortName] = {
          department: ev.department,
          shortName: ev.shortName,
          iconColor: ev.iconColor,
          events: [],
        };
      }
      groups[ev.shortName].events.push(ev);
    });
    return Object.values(groups);
  }, [activeVenue]);

  // Get user location
  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);
        setLocating(false);
        if (mapInstance) {
          mapInstance.flyTo(loc, 16, { duration: 1 });
        }
      },
      () => {
        setLocating(false);
        // Fallback: use campus gate as starting point
        setUserLocation([32.9385, 74.9520]);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [mapInstance]);

  // Show route to active venue
  const handleShowRoute = useCallback(() => {
    if (!activeVenue) return;
    if (!userLocation) {
      // Get location first, then show route
      if (!navigator.geolocation) {
        setUserLocation([32.9385, 74.9520]);
        setShowRoute(true);
        return;
      }
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
          setLocating(false);
          setShowRoute(true);
        },
        () => {
          setUserLocation([32.9385, 74.9520]);
          setLocating(false);
          setShowRoute(true);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setShowRoute(true);
    }
  }, [activeVenue, userLocation]);

  // Clear route when venue changes
  useEffect(() => {
    setShowRoute(false);
    setRouteInfo(null);
  }, [activeVenue]);

  return (
    <section id="campus" className="relative py-16 sm:py-20 md:py-32 overflow-hidden" data-testid="campus-section">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-3 sm:mb-4">
            Venue Map
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider text-white">
            Campus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Venues
            </span>
          </h2>
          <p className="font-body text-sm sm:text-base text-white/40 mt-3 sm:mt-4 max-w-xl">
            SMVDU Campus, Katra, J&K — Tap a venue to see events & get walking directions on the map.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* MAP PANEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg"
            style={{ height: '520px' }}
            data-testid="campus-map-container"
          >
            {/* Map controls overlay */}
            <div className="absolute top-3 right-3 z-[500] flex flex-col gap-2">
              <button
                onClick={handleLocateMe}
                disabled={locating}
                className="w-9 h-9 rounded-lg bg-white/90 hover:bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all"
                title="Locate me"
              >
                <LocateFixed size={16} className={`text-gray-700 ${locating ? 'animate-pulse' : ''}`} />
              </button>
              <button
                onClick={() => mapInstance?.setView(CAMPUS_CENTER, CAMPUS_ZOOM)}
                className="w-9 h-9 rounded-lg bg-white/90 hover:bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all"
                title="Reset view"
              >
                <MapPin size={16} className="text-gray-700" />
              </button>
            </div>

            {/* Route info badge */}
            {showRoute && activeVenue && (
              <div className="absolute top-3 left-3 z-[500] px-3 py-2 rounded-lg bg-white/95 shadow-md border border-gray-200 flex items-center gap-2">
                <Route size={14} className="text-blue-600" />
                <span className="font-mono text-[11px] text-gray-700">
                  Walking to <strong>{activeVenue.shortName}</strong>
                </span>
                <button
                  onClick={() => { setShowRoute(false); }}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <MapContainer
              center={CAMPUS_CENTER}
              zoom={CAMPUS_ZOOM}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              attributionControl={false}
              whenReady={(e) => setMapInstance(e.target)}
            >
              {/* Light satellite hybrid tiles */}
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Esri"
              />
              {/* Road/label overlay on satellite */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
                attribution="CARTO"
              />

              {/* Venue markers */}
              {venueData.map((venue) => {
                const isActive = activeVenue?.id === venue.id;
                return (
                  <Marker
                    key={venue.id}
                    position={[venue.lat, venue.lng]}
                    icon={createVenueIcon(venue.color, isActive)}
                    eventHandlers={{
                      click: () => {
                        setActiveVenue(isActive ? null : venue);
                        setExpandedDept(null);
                      },
                    }}
                  >
                    <Popup className="venue-popup" closeButton={false} autoPan={false}>
                      <div className="text-center px-1 py-0.5">
                        <strong className="text-sm block" style={{ color: venue.color }}>{venue.shortName}</strong>
                        <span className="text-xs text-gray-500">{venue.events.length} event{venue.events.length !== 1 ? 's' : ''}</span>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

              {/* User location marker */}
              {userLocation && (
                <CircleMarker
                  center={userLocation}
                  radius={8}
                  pathOptions={{
                    color: '#3B82F6',
                    fillColor: '#3B82F6',
                    fillOpacity: 0.9,
                    weight: 3,
                    opacity: 1,
                  }}
                >
                  <Popup>
                    <span className="text-xs font-semibold">Your Location</span>
                  </Popup>
                </CircleMarker>
              )}

              {/* Fly to active venue */}
              {activeVenue && <FlyToVenue venue={activeVenue} />}

              {/* In-map routing */}
              {showRoute && userLocation && activeVenue && (
                <RoutingControl
                  from={userLocation}
                  to={[activeVenue.lat, activeVenue.lng]}
                  map={mapInstance}
                  color={activeVenue.color}
                />
              )}
            </MapContainer>

            {/* Mobile venue quick info */}
            <AnimatePresence>
              {activeVenue && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-2 left-2 right-2 z-[500] p-3 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 lg:hidden"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: activeVenue.color }} />
                      <div className="min-w-0">
                        <h4 className="font-heading text-xs text-gray-900 tracking-wide truncate">{activeVenue.name}</h4>
                        <p className="font-mono text-[9px] text-gray-500">{activeVenue.events.length} events</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleShowRoute(); }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-mono font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <Navigation size={10} /> Directions
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setActiveVenue(null); setShowRoute(false); }} className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* SIDEBAR */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeVenue ? (
                <motion.div
                  key={activeVenue.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
                >
                  {/* Venue header */}
                  <div className="p-4 sm:p-5 border-b border-white/[0.06]" style={{ borderBottomColor: `${activeVenue.color}20` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeVenue.color }} />
                          <h3 className="font-heading text-sm sm:text-base text-white tracking-wide">
                            {activeVenue.name}
                          </h3>
                        </div>
                        <p className="font-body text-[11px] sm:text-xs text-white/40">{activeVenue.description}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <Users size={11} className="text-white/30" />
                          <span className="font-mono text-[10px] text-white/30">
                            {activeVenue.events.length} event{activeVenue.events.length !== 1 ? 's' : ''} scheduled
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => { setActiveVenue(null); setShowRoute(false); }}
                        className="text-white/30 hover:text-white/60 shrink-0 mt-0.5"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Directions button - shows route ON the map */}
                    <button
                      onClick={handleShowRoute}
                      disabled={locating}
                      className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-mono tracking-wide transition-all duration-200 border ${
                        showRoute
                          ? 'bg-white/[0.08] border-white/[0.15] text-white/90'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:border-white/[0.15] text-white/60 hover:text-white/90'
                      }`}
                    >
                      <Navigation size={12} style={{ color: activeVenue.color }} className={locating ? 'animate-spin' : ''} />
                      {locating ? 'Locating...' : showRoute ? 'Route shown on map' : 'Show Directions'}
                      <Route size={10} className="text-white/30" />
                    </button>
                  </div>

                  {/* Events grouped by department */}
                  <div className="max-h-[340px] overflow-y-auto custom-scrollbar">
                    {groupedEvents.map(group => (
                      <div key={group.shortName} className="border-b border-white/[0.04] last:border-0">
                        <button
                          onClick={() => setExpandedDept(expandedDept === group.shortName ? null : group.shortName)}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`font-mono text-[10px] font-bold ${group.iconColor}`}>
                              {group.shortName}
                            </span>
                            <span className="font-body text-[11px] text-white/50 truncate">
                              {group.department}
                            </span>
                            <span className="font-mono text-[9px] text-white/20 shrink-0">
                              ({group.events.length})
                            </span>
                          </div>
                          <ChevronRight
                            size={12}
                            className={`text-white/20 transition-transform duration-200 shrink-0 ${
                              expandedDept === group.shortName ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedDept === group.shortName && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3 space-y-1.5">
                                {group.events.map(ev => (
                                  <div
                                    key={ev.id}
                                    className="group/ev flex items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                                  >
                                    <div className="min-w-0">
                                      <p className="font-body text-[11px] sm:text-xs text-white/70 truncate">
                                        {ev.name}
                                      </p>
                                      <p className="font-mono text-[9px] text-white/25 truncate mt-0.5">
                                        {ev.tagline}
                                      </p>
                                    </div>
                                    {ev.registerUrl && (
                                      <a
                                        href={ev.registerUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-mono transition-all"
                                        style={{
                                          backgroundColor: `${activeVenue.color}15`,
                                          color: `${activeVenue.color}CC`,
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Register
                                        <ExternalLink size={8} />
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[280px]"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-4">
                    <MapPin size={20} className="text-cyan-400/50" />
                  </div>
                  <h4 className="font-heading text-sm text-white/60 tracking-wide mb-2">Select a Venue</h4>
                  <p className="font-body text-xs text-white/30 max-w-[200px]">
                    Tap a marker on the map to view events & get walking directions
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-[240px]">
                    <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2 text-center">
                      <p className="font-heading text-lg text-cyan-400">{venueData.length}</p>
                      <p className="font-mono text-[9px] text-white/30 mt-0.5">VENUES</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2 text-center">
                      <p className="font-heading text-lg text-purple-400">
                        {venueData.reduce((sum, v) => sum + v.events.length, 0)}
                      </p>
                      <p className="font-mono text-[9px] text-white/30 mt-0.5">EVENTS</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .custom-venue-marker {
          background: none !important;
          border: none !important;
        }
        .venue-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          padding: 2px;
        }
        .venue-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-routing-container {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
