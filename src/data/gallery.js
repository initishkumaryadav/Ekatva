/**
 * Gallery Data – SMVDU Ekatva 2026
 * Real YouTube videos from SMVDU Katra, Jammu & Kashmir
 *
 * HOW TO ADD MEDIA DURING THE EVENT:
 * 1. Drop images into  public/gallery/  (e.g. public/gallery/day1-opening.jpg)
 * 2. Add an entry below with  src: "/gallery/day1-opening.jpg"
 * 3. For YouTube videos, just paste the video ID (the part after v=)
 */

export const GALLERY_DATA = {
  /* ─── Categories / Tabs ─── */
  categories: ['All', 'Ekatva Fest', 'Titiksha Fest', 'Cultural Nights', 'Dance & Music', 'Campus Life', 'Official'],

  /* ─── Images (placeholder Unsplash — replace with real event photos) ─── */
  images: [
    { id: 'img-1',  src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', caption: 'Ekatva 2025 — Grand Inauguration at Matrika Auditorium', category: 'Ekatva Fest',     featured: true },
    { id: 'img-2',  src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', caption: 'Vice Chancellor addressing the crowd',                    category: 'Ekatva Fest',     featured: false },
    { id: 'img-3',  src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', caption: 'Tech Workshop — Hands-on AI Session',                      category: 'Ekatva Fest',     featured: false },
    { id: 'img-4',  src: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80', caption: 'Classical Dance Performance at Cultural Evening',           category: 'Cultural Nights',  featured: false },
    { id: 'img-5',  src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', caption: 'Star Night / DJ Night — SMVDU Campus',                     category: 'Cultural Nights',  featured: true },
    { id: 'img-6',  src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', caption: 'Hackathon Teams in Action — CS Block',                     category: 'Ekatva Fest',     featured: true },
    { id: 'img-7',  src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', caption: 'Competitive Programming at SMVDU Labs',                    category: 'Ekatva Fest',     featured: false },
    { id: 'img-8',  src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80', caption: 'Robotics Competition at Sports Complex',                    category: 'Titiksha Fest',   featured: false },
    { id: 'img-9',  src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', caption: 'Student Projects Exhibition — SMVDU',                       category: 'Titiksha Fest',   featured: false },
    { id: 'img-10', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', caption: 'Gaming Tournament Finals',                                 category: 'Ekatva Fest',     featured: true },
    { id: 'img-11', src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', caption: 'Hackathon Final Demos at Matrika',                          category: 'Ekatva Fest',     featured: false },
    { id: 'img-12', src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80', caption: 'Prize Distribution Ceremony — SMVDU',                      category: 'Official',        featured: true },
    { id: 'img-13', src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80', caption: 'All Departments Together — Team SMVDU',                    category: 'Campus Life',     featured: true },
    { id: 'img-14', src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', caption: 'Panel Discussion — Future of Tech',                         category: 'Official',        featured: false },
    { id: 'img-15', src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', caption: 'Volunteers Setting Up Stage at SMVDU',                      category: 'Campus Life',     featured: false },
    { id: 'img-16', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', caption: 'BPA Organizing Committee Meeting',                         category: 'Campus Life',     featured: false },
  ],

  /* ─── YouTube Videos — Real SMVDU / Ekatva / Titiksha content ─── */
  videos: [
    // ── Ekatva Fest ──
    { id: 'vid-1',  youtubeId: 'tF811hWdPpY', title: 'EKATVA 2K25 — Annual Tech Fest Of SMVDU | Cultural Program',          category: 'Ekatva Fest',    featured: true },
    { id: 'vid-2',  youtubeId: 'i5X95IN5nsw', title: 'EKATVA (SMVDU Fest) Day 1 — Campus Life',                              category: 'Ekatva Fest',    featured: true },
    { id: 'vid-3',  youtubeId: '18pRNtv9XWk', title: 'EKATVA (SMVDU Fest) Day 3 — Highlights',                                category: 'Ekatva Fest',    featured: false },
    { id: 'vid-4',  youtubeId: 'vRYd0ka9qmY', title: "EKATVA'25 (SMVDU Fest) — Part 2",                                      category: 'Ekatva Fest',    featured: false },
    { id: 'vid-5',  youtubeId: '_6t4ye8fLLs', title: "Ekatva — SMVDU's Tech Fest | Sufi Night | Flash Mob | Literature",      category: 'Ekatva Fest',    featured: true },
    { id: 'vid-6',  youtubeId: 'MR1UdxJBzDY', title: 'SMVDU || Ekatva University Fest — Full Coverage',                       category: 'Ekatva Fest',    featured: false },
    { id: 'vid-7',  youtubeId: '89O47ymaDj4', title: 'Vlog — Ekatva Fest at SMVDU | Inter University Fest',                   category: 'Ekatva Fest',    featured: false },
    { id: 'vid-8',  youtubeId: 'mG5L8j0ZEv0', title: 'Honourable Vice Chancellor Invitation to Ekatva',                       category: 'Official',       featured: false },

    // ── Dance & Music Performances ──
    { id: 'vid-9',  youtubeId: 'fD7pKJ98M14', title: 'SMVDU Fest — Performance at Matrika Auditorium (640K+ views)',          category: 'Dance & Music',  featured: true },
    { id: 'vid-10', youtubeId: 'T5l7KESEAGc', title: "SMVDU Fest'23 — Bhangra Performance",                                  category: 'Dance & Music',  featured: false },
    { id: 'vid-11', youtubeId: 'qB81EmhKU1I', title: 'SMVDU Katra — Dance Performance 2025',                                  category: 'Dance & Music',  featured: true },
    { id: 'vid-12', youtubeId: 'm7bY93Q0lP0', title: 'Dance Performance by Students at SMVDU, Katra',                          category: 'Dance & Music',  featured: false },
    { id: 'vid-13', youtubeId: 'tiR0QROQEzk', title: 'Cultural Fest at SMVDU — Full Performance',                              category: 'Dance & Music',  featured: false },
    { id: 'vid-14', youtubeId: 'MMFTQeT4CGA', title: 'Dance Performance at SMVDU Katra — Youth Festival 2023',                category: 'Dance & Music',  featured: false },
    { id: 'vid-15', youtubeId: 'rTTfpHPzSAs', title: 'SMVDU Flashmob — Uniting Energy, Dance & Vibrance!',                    category: 'Dance & Music',  featured: true },
    { id: 'vid-16', youtubeId: 'Sw3mxQFadTc', title: 'Dogri Folk Song — Cultural Evening at SMVDU',                            category: 'Dance & Music',  featured: false },

    // ── Titiksha Fest ──
    { id: 'vid-17', youtubeId: 'lN_09G_xLyM', title: 'Glimpses of Titiksha Fest 2023 at SMVDU',                                category: 'Titiksha Fest',  featured: true },
    { id: 'vid-18', youtubeId: 'ha-VsWxDlYI', title: 'Glimpses after Titiksha DJ Night — SMVDU Katra',                         category: 'Titiksha Fest',  featured: false },
    { id: 'vid-19', youtubeId: 'z6oCL2QHLx0', title: 'Titiksha Cultural Evening — Musical Night at SMVDU',                     category: 'Titiksha Fest',  featured: true },
    { id: 'vid-20', youtubeId: 'nRFxAy3Fa3Y', title: 'Titiksha Tech Fest 2023 — Bhangra at SMVDU',                             category: 'Titiksha Fest',  featured: false },
    { id: 'vid-21', youtubeId: 'zvzFgFlUSQE', title: 'SMVDU Fest — Titiksha Fest Part 01 2K23',                                 category: 'Titiksha Fest',  featured: false },
    { id: 'vid-22', youtubeId: 'Y3hjobhlGk4', title: 'Titiksha Tech Fest SMVDU — Dance Performance',                           category: 'Titiksha Fest',  featured: false },
    { id: 'vid-23', youtubeId: 'ozb92DtZOKw', title: 'Titiksha Annual Technical Festival 2K20 — SMVDU',                        category: 'Titiksha Fest',  featured: false },
    { id: 'vid-24', youtubeId: '32ScSkphYhA', title: 'Bhangra Dance in Titiksha Annual Fest 2K20 — SMVDU',                     category: 'Titiksha Fest',  featured: false },
    { id: 'vid-25', youtubeId: 'GC24avsdNSM', title: 'DJ Night — SMVDU Fest Day 02 2K23',                                      category: 'Cultural Nights', featured: true },

    // ── Cultural Nights ──
    { id: 'vid-26', youtubeId: '7VOkCysf1qg', title: "SMVDU's Dance Fest 2023 — Crowd Goes Wild!",                            category: 'Cultural Nights', featured: false },
    { id: 'vid-27', youtubeId: 'sdAu91xKC0w', title: 'Cultural & Ethnic Performance — 20th Foundation Day of SMVDU',           category: 'Cultural Nights', featured: false },

    // ── Official / Campus Life ──
    { id: 'vid-28', youtubeId: 'lrQkNlvMWVo', title: '8th Convocation — Shri Mata Vaishno Devi University',                   category: 'Official',       featured: true },
    { id: 'vid-29', youtubeId: 'aZmBfSE-sUQ', title: '75th Republic Day Celebrated at SMVDU',                                  category: 'Official',       featured: false },
    { id: 'vid-30', youtubeId: 'jimQhOdHyJw', title: 'SMVDU Organises One Day Youth Festival',                                 category: 'Campus Life',    featured: false },
    { id: 'vid-31', youtubeId: 'E1OsabXbVgc', title: 'SMVDU Kavi Sammelan and Hindi Pakhwada',                                 category: 'Campus Life',    featured: false },
    { id: 'vid-32', youtubeId: 'FhINB1ylqvk', title: 'Heritage Walk — Shri Mata Vaishno Devi University',                      category: 'Campus Life',    featured: false },
  ],
};
