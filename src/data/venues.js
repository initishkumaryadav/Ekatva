// ============================================================================
// EKATVA — Campus Venues Configuration
// ============================================================================
//
// HOW TO UPDATE FOR 2026:
// 1. Edit VENUE_LOCATIONS below to add/remove/rename campus venues
//    - Each venue needs: id, name, shortName, x & y (% position on map), color
// 2. Edit EVENT_VENUE_MAP below to assign events to venues
//    - Key = event id (from events.js departmentEvents)
//    - Value = venue id (from VENUE_LOCATIONS)
// 3. Any event NOT in EVENT_VENUE_MAP will default to "campus-wide"
//
// The CampusMap component reads this file and auto-generates all markers,
// event lists, and registration links. No other file changes needed.
// ============================================================================

/**
 * Campus venue locations (percentage-based positions on the stylized map).
 * x = horizontal %, y = vertical % (0,0 = top-left).
 */
export const VENUE_LOCATIONS = [
  {
    id: 'main-auditorium',
    name: 'Main Auditorium',
    shortName: 'Auditorium',
    description: 'Central auditorium for ceremonies, pitches & presentations',
    x: 35,
    y: 22,
    lat: 32.94195,
    lng: 74.95330,
    color: '#00F0FF',   // cyan
  },
  {
    id: 'cse-block',
    name: 'School of Computer Science',
    shortName: 'CS Block',
    description: 'Labs, hackathon venue & coding competitions',
    x: 55,
    y: 38,
    lat: 32.94135,
    lng: 74.95420,
    color: '#3B82F6',   // blue
  },
  {
    id: 'ee-block',
    name: 'School of Electrical Engineering',
    shortName: 'EE Block',
    description: 'Electrical labs, circuit challenges & breadboard battles',
    x: 68,
    y: 25,
    lat: 32.94165,
    lng: 74.95490,
    color: '#FACC15',   // yellow
  },
  {
    id: 'ece-block',
    name: 'School of Electronics & Communication',
    shortName: 'ECE Block',
    description: 'Robotics arena, PCB design & hardware hackathons',
    x: 78,
    y: 42,
    lat: 32.94110,
    lng: 74.95540,
    color: '#A855F7',   // purple
  },
  {
    id: 'me-block',
    name: 'School of Mechanical Engineering',
    shortName: 'ME Block',
    description: 'Tesla showcase, robomania & mechanical workshops',
    x: 82,
    y: 60,
    lat: 32.94080,
    lng: 74.95580,
    color: '#EF4444',   // red
  },
  {
    id: 'ce-block',
    name: 'School of Civil Engineering',
    shortName: 'CE Block',
    description: 'Bridge building, pavement design & construction labs',
    x: 25,
    y: 55,
    lat: 32.94060,
    lng: 74.95280,
    color: '#F97316',   // orange
  },
  {
    id: 'bt-block',
    name: 'School of Biotechnology',
    shortName: 'BT Block',
    description: 'Bio labs, DNA extraction & microscopy events',
    x: 15,
    y: 35,
    lat: 32.94150,
    lng: 74.95210,
    color: '#22C55E',   // green
  },
  {
    id: 'seminar-hall',
    name: 'Seminar Hall Complex',
    shortName: 'Seminar Hall',
    description: 'Workshops, quizzes, panel discussions & poster sessions',
    x: 45,
    y: 55,
    lat: 32.94050,
    lng: 74.95370,
    color: '#06B6D4',   // cyan-dark
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex',
    shortName: 'Sports Complex',
    description: 'RC races, gaming arena & indoor sport events',
    x: 60,
    y: 72,
    lat: 32.93980,
    lng: 74.95450,
    color: '#10B981',   // emerald
  },
  {
    id: 'open-air-theatre',
    name: 'Open Air Theatre (OAT)',
    shortName: 'OAT',
    description: 'Star night, cultural performances & ramp walk',
    x: 38,
    y: 78,
    lat: 32.93960,
    lng: 74.95310,
    color: '#EC4899',   // pink
  },
  {
    id: 'open-ground',
    name: 'Open Ground / Trikuta Hills',
    shortName: 'Open Ground',
    description: 'Scavenger hunts, outdoor challenges & drone racing',
    x: 18,
    y: 72,
    lat: 32.93990,
    lng: 74.95180,
    color: '#14B8A6',   // teal
  },
  {
    id: 'arch-studio',
    name: 'Architecture Studio',
    shortName: 'Arch Studio',
    description: 'Pottery, sculpture, sketching & canvas painting',
    x: 48,
    y: 15,
    lat: 32.94220,
    lng: 74.95380,
    color: '#F472B6',   // pink-light
  },
  {
    id: 'mgmt-block',
    name: 'School of Business',
    shortName: 'SoB Block',
    description: 'Marketing, branding, pitches & business challenges',
    x: 28,
    y: 40,
    lat: 32.94130,
    lng: 74.95260,
    color: '#2DD4BF',   // teal-light
  },
];

/**
 * Maps each event ID → venue ID.
 *
 * TO UPDATE: Just change the venue ID for any event, or add new event IDs
 * when you add events to events.js for 2026.
 */
export const EVENT_VENUE_MAP = {
  // ── Computer Science & Engineering ──────────────────────────────────
  'cse-webquest':       'cse-block',
  'cse-ctf':            'cse-block',
  'cse-codeforge':      'cse-block',
  'cse-innochallenge':  'seminar-hall',
  'cse-algostrike':     'cse-block',
  'cse-reelsreality':   'seminar-hall',
  'cse-fff':            'cse-block',
  'cse-aimageddon':     'cse-block',

  // ── Biotechnology ───────────────────────────────────────────────────
  'bt-genehunt':        'bt-block',
  'bt-biolens':         'bt-block',
  'bt-streakmasters':   'bt-block',
  'bt-biocanvas':       'bt-block',

  // ── Architecture ────────────────────────────────────────────────────
  'arch-claypottery':      'arch-studio',
  'arch-digitalsculpture': 'arch-studio',
  'arch-photography':      'open-ground',
  'arch-sketchingpencil':  'arch-studio',
  'arch-sketchingpen':     'arch-studio',
  'arch-popsculpture':     'arch-studio',
  'arch-rampwalk':         'open-air-theatre',
  'arch-canvaspainting':   'arch-studio',

  // ── Civil Engineering ───────────────────────────────────────────────
  'ce-pavement':        'ce-block',
  'ce-quiz':            'seminar-hall',
  'ce-raazkitalash':    'open-ground',
  'ce-bridge':          'ce-block',
  'ce-3switches':       'ce-block',
  'ce-slumptest':       'ce-block',

  // ── Electrical Engineering ──────────────────────────────────────────
  'ee-electrobuzz':     'ee-block',
  'ee-circuitrix':      'ee-block',
  'ee-rccar':           'sports-complex',
  'ee-voltvortex':      'ee-block',
  'ee-faultyanalyzer':  'ee-block',
  'ee-breadboard':      'ee-block',
  'ee-electrocode':     'ee-block',
  'ee-scavengerhunt':   'open-ground',

  // ── Electronics & Communication Engineering ─────────────────────────
  'ece-monstermash':    'ece-block',
  'ece-robuscooter':    'sports-complex',
  'ece-rowboatics':     'open-ground',
  'ece-circuithunt':    'ece-block',
  'ece-pcb':            'ece-block',
  'ece-hackathon':      'ece-block',

  // ── Management ──────────────────────────────────────────────────────
  'mgmt-adselfie':      'mgmt-block',
  'mgmt-karyaneeti':    'open-air-theatre',
  'mgmt-anubhav':       'seminar-hall',
  'mgmt-ruralcarte':    'mgmt-block',
  'mgmt-appchallenge':  'mgmt-block',
  'mgmt-admad':         'mgmt-block',
  'mgmt-brandrace':     'mgmt-block',
  'mgmt-iexpo':         'main-auditorium',
  'mgmt-saakshar':      'seminar-hall',

  // ── Mechanical Engineering ──────────────────────────────────────────
  'me-tesla':           'me-block',
  'me-batteryback':     'me-block',
  'me-builtfromscrap':  'me-block',
  'me-battlebots':      'sports-complex',
  'me-mechanicaljoints':'me-block',

  // ── Mathematics ─────────────────────────────────────────────────────
  'math-codesprint':     'cse-block',
  'math-colorsofcalc':   'open-air-theatre',
  'math-pitchperfect':   'seminar-hall',
  'math-wastenot':       'open-ground',
  'math-gaminggauntlet': 'sports-complex',

  // ── Economics ───────────────────────────────────────────────────────
  'econ-policyreview':   'seminar-hall',
  'econ-sharkpitch':     'main-auditorium',
  'econ-financing':      'seminar-hall',
  'econ-mindsmarket':    'seminar-hall',

  // ── Physics ─────────────────────────────────────────────────────────
  'phy-anveshanam':      'seminar-hall',
  'phy-vigyandrishyam':  'seminar-hall',
};

/**
 * Helper: Given departmentEvents from EVENTS_DATA, returns an array of
 * venue objects each containing their assigned events (with dept info).
 *
 * Usage in component:
 *   import { buildVenueEventMap } from '../data/venues';
 *   import { EVENTS_DATA } from '../data/events';
 *   const venueData = buildVenueEventMap(EVENTS_DATA.departmentEvents);
 */
export function buildVenueEventMap(departmentEvents) {
  // Flatten all events with department info
  const allEvents = [];
  departmentEvents.forEach(dept => {
    dept.events.forEach(ev => {
      allEvents.push({
        ...ev,
        department: dept.department,
        shortName: dept.shortName,
        gradient: dept.gradient,
        iconColor: dept.iconColor,
      });
    });
  });

  // Group events by venue
  const venueMap = {};
  VENUE_LOCATIONS.forEach(v => {
    venueMap[v.id] = { ...v, events: [] };
  });

  allEvents.forEach(ev => {
    const venueId = EVENT_VENUE_MAP[ev.id] || 'seminar-hall'; // default fallback
    if (venueMap[venueId]) {
      venueMap[venueId].events.push(ev);
    }
  });

  // Return only venues that have at least one event
  return Object.values(venueMap).filter(v => v.events.length > 0);
}
