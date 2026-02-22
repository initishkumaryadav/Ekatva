// ============================================================================
// EKATVA — Clubs Data
// ============================================================================
//
// HOW TO UPDATE:
// 1. Add/edit clubs in the arrays below
// 2. Update image URLs, descriptions, and social links as needed
// 3. The ClubsPage component auto-renders from this data
// ============================================================================

export const CLUBS_DATA = {
  categories: [
    { id: 'all', label: 'All Clubs' },
    { id: 'professional', label: 'Professional Activities' },
    { id: 'cultural', label: 'Cultural Activities' },
  ],

  clubs: [
    // ── Board of Professional Activities ────────────────────────────────
    {
      id: 'null-cybersecurity',
      name: 'Null : The Cybersecurity Club',
      tagline: 'Secure the Future, Defend with Code.',
      description: 'SMVDU\'s premier cybersecurity club focused on ethical hacking, CTF competitions, network security, and digital forensics. Building the next generation of cyber defenders.',
      category: 'professional',
      image: 'https://ekatva-fest.smvdu.ac.in/images/null.jpeg',
      color: '#00F0FF',
      links: {
        instagram: 'https://www.instagram.com/null_smvdu/',
        linkedin: 'https://www.linkedin.com/company/null-the-cybersecurity-club-smvdu/',
      },
    },
    {
      id: 'code-club',
      name: 'Code Club',
      tagline: 'Embrace the Challenge. Embrace the Code.',
      description: 'A community of passionate coders at SMVDU who organize coding contests, workshops, and hackathons. Fostering competitive programming culture and software development skills.',
      category: 'professional',
      image: 'https://smvdu.ac.in/wp-content/uploads/2023/10/code_club.jpg',
      color: '#3B82F6',
      links: {
        instagram: 'https://www.instagram.com/codeclubsmvdu/',
        linkedin: 'https://www.linkedin.com/company/code-club-smvdu/',
      },
    },
    {
      id: 'dev-growth',
      name: 'Dev Growth Club',
      tagline: 'Learn. Grow. Build the Future.',
      description: 'Focused on full-stack development, open-source contributions, and real-world project building. Helping students grow as developers through mentorship and hands-on workshops.',
      category: 'professional',
      image: 'https://ekatva-fest.smvdu.ac.in/images/dev-growth.png',
      color: '#10B981',
      links: {
        instagram: 'https://www.instagram.com/devgrowthclub/',
        linkedin: 'https://www.linkedin.com/company/dev-growth-club-smvdu/',
      },
    },
    {
      id: 'ai-club',
      name: 'AI Club',
      tagline: 'Think AI, Build Future, Stay Ahead.',
      description: 'SMVDU\'s Artificial Intelligence and Machine Learning club. Exploring deep learning, computer vision, NLP, and responsible AI through projects, research, and competitions.',
      category: 'professional',
      image: 'https://smvdu.ac.in/wp-content/uploads/2024/09/471e7f0a-6916-11ef-bf25-0242ac110002-1.jpeg',
      color: '#A855F7',
      links: {
        instagram: 'https://www.instagram.com/aiclub.smvdu/',
        linkedin: 'https://www.linkedin.com/company/ai-club-smvdu/',
      },
    },
    {
      id: 'aet-club',
      name: 'AET Club',
      tagline: 'Automating Today and the Future.',
      description: 'Automation & Emerging Technologies Club — exploring IoT, robotics, embedded systems, and cutting-edge automation technologies shaping the future of engineering.',
      category: 'professional',
      image: 'https://smvdu.ac.in/wp-content/uploads/2023/10/AET-CLUB-Poster-1-1.jpg',
      color: '#F97316',
      links: {
        instagram: 'https://www.instagram.com/aetclub_smvdu/',
        linkedin: 'https://www.linkedin.com/company/aet-club-smvdu/',
      },
    },
    {
      id: 'tarang',
      name: 'Tarang',
      tagline: 'Spark Ideas, Power Innovation, Explore Electronics.',
      description: 'The electronics innovation club of SMVDU. Organizing circuit design workshops, hardware hackathons, and fostering embedded systems and signal processing skills.',
      category: 'professional',
      image: 'https://smvdu.ac.in/wp-content/uploads/2024/09/TARANG-1.png',
      color: '#FACC15',
      links: {
        instagram: 'https://www.instagram.com/tarang_smvdu/',
        linkedin: 'https://www.linkedin.com/company/tarang-smvdu/',
      },
    },
    {
      id: 'sae-club',
      name: 'SAE Club',
      tagline: 'Drive Innovation, Fuel Passion, Rev Up Your Engineering!',
      description: 'Society of Automotive Engineers collegiate chapter at SMVDU. Building race cars, participating in SAE Baja and Supra events, and advancing automotive engineering.',
      category: 'professional',
      image: 'https://smvdu.ac.in/wp-content/uploads/2024/08/coverpage-1.png',
      color: '#EF4444',
      links: {
        instagram: 'https://www.instagram.com/saesmvdu/',
        linkedin: 'https://www.linkedin.com/company/sae-smvdu/',
      },
    },
    {
      id: 'young-economist',
      name: 'Young Economist Club',
      tagline: 'Artha Vidya Samaj: Connecting Ideas Creating Impact!',
      description: 'A platform for budding economists to discuss policies, market trends, and economic theories. Organizing debates, paper presentations, and interactive economics sessions.',
      category: 'professional',
      image: 'https://ekatva-fest.smvdu.ac.in/images/yec.png',
      color: '#14B8A6',
      links: {
        instagram: 'https://www.instagram.com/yec_smvdu/',
        linkedin: 'https://www.linkedin.com/company/young-economist-club-smvdu/',
      },
    },

    // ── Board of Cultural Activities ────────────────────────────────────
    {
      id: 'shabdarth',
      name: 'ShabdARTh',
      tagline: 'Where Shabd meets ART.',
      description: 'SMVDU\'s literary and art club blending words with visual expression. Organizing poetry slams, open mics, creative writing workshops, and literary fests.',
      category: 'cultural',
      image: 'https://ekatva-fest.smvdu.ac.in/images/shabdARTh.jpeg',
      color: '#EC4899',
      links: {
        instagram: 'https://www.instagram.com/shabdarth_smvdu/',
      },
    },
    {
      id: 'prishtbhoomi',
      name: 'Prishtbhoomi',
      tagline: 'Where Every Story Finds Its Stage.',
      description: 'The dramatics and theatre club of SMVDU. Producing plays, street theatre, nukkad natak, and dramatic performances that captivate and inspire.',
      category: 'cultural',
      image: 'https://ekatva-fest.smvdu.ac.in/images/prishtbhoomi.png',
      color: '#F43F5E',
      links: {
        instagram: 'https://www.instagram.com/prishtbhoomi_smvdu/',
      },
    },
    {
      id: 'atelier',
      name: 'Atelier Multimedia Club',
      tagline: 'Explore the Art of Multimedia.',
      description: 'A creative hub for photography, videography, graphic design, and multimedia content creation. Capturing SMVDU\'s moments and telling stories through visual media.',
      category: 'cultural',
      image: 'https://smvdu.ac.in/wp-content/uploads/2023/10/Atelier-New-Banner-1-1.png',
      color: '#8B5CF6',
      links: {
        instagram: 'https://www.instagram.com/atelier_smvdu/',
      },
    },
    {
      id: 'aalap',
      name: 'Aalap',
      tagline: 'Find Harmony Through Music.',
      description: 'SMVDU\'s official music club celebrating melodies, rhythms, and harmonies. From classical to contemporary, jam sessions to concerts — where music lovers unite.',
      category: 'cultural',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPVdrTkpfsRut57K3YDNbbNd3lcH64cz5zBA&s',
      color: '#06B6D4',
      links: {
        instagram: 'https://www.instagram.com/aalap_smvdu/',
      },
    },
    {
      id: 'fight-knight',
      name: 'Fight Knight',
      tagline: 'Martial Arts Club.',
      description: 'SMVDU\'s martial arts and self-defense club. Training in various disciplines, promoting fitness, discipline, and the warrior spirit among students.',
      category: 'cultural',
      image: 'https://ekatva-fest.smvdu.ac.in/images/fight-knight.png',
      color: '#DC2626',
      links: {
        instagram: 'https://www.instagram.com/fightknight_smvdu/',
      },
    },
    {
      id: 'zenith',
      name: 'Zenith',
      tagline: 'Move. Groove. Express. Dance with Passion.',
      description: 'The official dance club of SMVDU — from classical to hip-hop, contemporary to folk. Performing at fests, competing nationally, and spreading joy through movement.',
      category: 'cultural',
      image: 'https://smvdu.ac.in/wp-content/uploads/2023/11/aPicsart_23-10-12_23-48-58-524-1.jpg',
      color: '#D946EF',
      links: {
        instagram: 'https://www.instagram.com/zenith_smvdu/',
      },
    },
    {
      id: 'vyom',
      name: 'VYOM Astronomy Club',
      tagline: 'Explore the Stars, Discover the Universe.',
      description: 'Stargazing events, telescope sessions, astrophotography, and space science workshops. SMVDU\'s window to the cosmos and the mysteries of the universe.',
      category: 'cultural',
      image: 'https://smvdu.ac.in/wp-content/uploads/2024/06/Presents-1-1.png',
      color: '#6366F1',
      links: {
        instagram: 'https://www.instagram.com/vyom_smvdu/',
      },
    },
    {
      id: 'yuva-tourism',
      name: 'Yuva Tourism',
      tagline: 'Travel. Explore. Discover.',
      description: 'Promoting tourism and travel culture among students. Organizing treks, heritage walks, cultural tours, and adventure activities around the beautiful Trikuta Hills.',
      category: 'cultural',
      image: 'https://ekatva-fest.smvdu.ac.in/images/yuva-tourism.png',
      color: '#22D3EE',
      links: {
        instagram: 'https://www.instagram.com/yuvatourism_smvdu/',
      },
    },
    {
      id: 'aayojan',
      name: 'Aayojan',
      tagline: 'Where Ideas Meet Execution.',
      description: 'The event management club of SMVDU. Planning, organizing, and executing campus events with precision. The backbone behind every successful fest and celebration.',
      category: 'cultural',
      image: 'https://ekatva-fest.smvdu.ac.in/images/aayojan.png',
      color: '#F59E0B',
      links: {
        instagram: 'https://www.instagram.com/aayojan_smvdu/',
      },
    },
  ],
};
