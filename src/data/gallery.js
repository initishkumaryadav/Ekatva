/**
 * Gallery Data – SMVDU Ekatva 2026
 * Real YouTube videos from SMVDU Katra, Jammu & Kashmir
 *
 * HOW TO ADD MEDIA DURING THE EVENT:
 * 1. Drop images into  public/gallery/  (e.g. public/gallery/day1-opening.jpg)
 * 2. Add an entry below in the images array with  src: "/gallery/day1-opening.jpg"
 * 3. For YouTube videos, just paste the video ID (the part after v=)
 */

export const GALLERY_DATA = {
  /* ─── Categories / Tabs ─── */
  categories: ['All', 'Ekatva Fest', 'Titiksha Fest', 'Cultural Nights', 'Dance & Music', 'Campus Life', 'Official'],

  /* ─── Images — Add real event photos here during the fest ─── */
  images: [
    // Example: { id: 'img-1', src: '/gallery/day1-opening.jpg', caption: 'Ekatva 2026 — Opening Ceremony', category: 'Ekatva Fest', featured: true },
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
