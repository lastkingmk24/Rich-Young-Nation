import type { Product, Collection, Review } from '@/types';
import hoodieNation from '@/assets/p-hoodie-nation.jpg';
import hoodieBone from '@/assets/p-hoodie-bone.jpg';
import hoodieAcid from '@/assets/p-hoodie-acid.jpg';
import jeanBaggy from '@/assets/p-jean-baggy.jpg';
import jeanBlack from '@/assets/p-jean-black.jpg';
import teeArch from '@/assets/p-tee-arch.jpg';
import teeBone from '@/assets/p-tee-bone.jpg';
import overshirt from '@/assets/p-overshirt.jpg';
import cargo from '@/assets/p-cargo.jpg';
import sweatBlack from '@/assets/p-sweatpant-black.jpg';
import sweatBone from '@/assets/p-sweatpant-bone.jpg';
import dHoodieFabric from '@/assets/d-hoodie-fabric.jpg';
import dHoodieBone from '@/assets/d-hoodie-bone.jpg';
import dJeanDetail from '@/assets/d-jean-detail.jpg';
import dTeePrint from '@/assets/d-tee-print.jpg';
import dCargoDetail from '@/assets/d-cargo-detail.jpg';
import dOvershirtDetail from '@/assets/d-overshirt-detail.jpg';
import edConcrete from '@/assets/ed-concrete.jpg';

export const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formatPrice = (n: number) =>
  priceFormatter.format(n).replace(/\.00$/, '');

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: 'nation-hoodie',
    author: 'Maya R.',
    location: 'Brooklyn, NY',
    rating: 5,
    title: 'The heaviest hoodie I own, in the best way',
    body: 'I have washed this thing six times and it still holds its structure — no pilling, no shrinking, the cuffs are still tight. The 480gsm weight feels like actual armour. Sizing is properly oversized, I went true to size and it swallows me exactly how I wanted.',
    date: '2026-09-18',
    verified: true,
    size: 'M',
    fit: 'True to size',
    helpful: 84,
  },
  {
    id: 'r2',
    productId: 'nation-hoodie',
    author: 'Deniz K.',
    location: 'Berlin, DE',
    rating: 5,
    title: 'Better in person',
    body: 'The washed black is that perfect faded charcoal, not flat black. Ordered the matching sweatpants the day after it arrived. This is the one.',
    date: '2026-09-02',
    verified: true,
    size: 'L',
    fit: 'Slightly oversized',
    helpful: 41,
  },
  {
    id: 'r3',
    productId: 'nation-hoodie',
    author: 'Jordan T.',
    location: 'Toronto, CA',
    rating: 4,
    title: 'Great, but note the fit',
    body: 'Quality is genuinely luxury-tier. Only flagging that the body runs long — at 5\'7" the hem hits mid-thigh. Still keeping it, just be aware if you are petite.',
    date: '2026-08-14',
    verified: true,
    size: 'S',
    fit: 'Runs large',
    helpful: 19,
  },
  {
    id: 'r4',
    productId: 'cargo-baggy',
    author: 'Priya S.',
    location: 'London, UK',
    rating: 5,
    title: 'Finally cargos that drape',
    body: 'Most baggy cargos look like a parachute designed by someone who has never worn trousers. These have real drape because of the ripstop weight. The ankle cinch is adjustable enough to work with chunky sneakers.',
    date: '2026-10-01',
    verified: true,
    size: 'M',
    fit: 'True to size',
    helpful: 63,
  },
  {
    id: 'r5',
    productId: 'cargo-baggy',
    author: 'Andre M.',
    location: 'Atlanta, GA',
    rating: 5,
    title: 'Wear them 3x a week',
    body: 'Bought the charcoal and honestly they go with everything. Pockets are deep enough for a phone and a wallet without sagging.',
    date: '2026-09-11',
    verified: true,
    size: 'L',
    fit: 'True to size',
    helpful: 28,
  },
  {
    id: 'r6',
    productId: 'cargo-baggy',
    author: 'Sofia L.',
    location: 'Lisbon, PT',
    rating: 4,
    title: 'Love the fabric, sizing up was right',
    body: 'I am normally a small but sized up for extra drape and it was the correct call. The waistband is slightly stiff brand new so give it a wear.',
    date: '2026-07-29',
    verified: true,
    size: 'M',
    fit: 'Runs small',
    helpful: 12,
  },
  {
    id: 'r7',
    productId: 'arch-tee',
    author: 'Kai N.',
    location: 'Melbourne, AU',
    rating: 5,
    title: 'The boxy tee I keep reaching for',
    body: 'Collar sits perfectly, and the washed black is the exact shade it looks like online. Arch print is subtle — tonal and printed into the fabric rather than sitting on top like plastic.',
    date: '2026-09-24',
    verified: true,
    size: 'M',
    fit: 'True to size',
    helpful: 37,
  },
  {
    id: 'r8',
    productId: 'arch-tee',
    author: 'Lena F.',
    location: 'Amsterdam, NL',
    rating: 5,
    title: 'Bought two more',
    body: 'The weight of the cotton is so much better than a standard tee — feels substantial without being hot. Bought bone and black.',
    date: '2026-10-06',
    verified: true,
    size: 'S',
    fit: 'Slightly oversized',
    helpful: 22,
  },
  {
    id: 'r9',
    productId: 'ryder-overshirt',
    author: 'Theo B.',
    location: 'Copenhagen, DK',
    rating: 5,
    title: 'Best layer I have bought in years',
    body: 'Stone taupe with the bone tee underneath is the whole outfit. The canvas has softened up beautifully after a month and the patch pockets are actually functional.',
    date: '2026-08-30',
    verified: true,
    size: 'M',
    fit: 'True to size',
    helpful: 55,
  },
  {
    id: 'r10',
    productId: 'ryder-overshirt',
    author: 'Imani W.',
    location: 'Chicago, IL',
    rating: 4,
    title: 'Warm-weather perfect',
    body: 'Exactly the right mid-weight. Wore it all through shoulder season. One star off only because I wish the buttons were a touch darker.',
    date: '2026-09-19',
    verified: false,
    size: 'L',
    fit: 'True to size',
    helpful: 8,
  },
  {
    id: 'r11',
    productId: 'baggy-jean',
    author: 'Noor H.',
    location: 'Dubai, AE',
    rating: 5,
    title: 'The wide leg that actually looks expensive',
    body: 'Rigid, no stretch, and that is exactly why it hangs correctly. Note they are LONG — I am 5\'10" and wear them with the hem stacked on chunky trainers. Perfect.',
    date: '2026-09-05',
    verified: true,
    size: '28',
    fit: 'True to size',
    helpful: 71,
  },
  {
    id: 'r12',
    productId: 'baggy-jean',
    author: 'Sasha V.',
    location: 'Kyiv, UA',
    rating: 4,
    title: 'Great denim, long inseam',
    body: 'The wash is a beautiful light blue with no fake whiskering. Wanted to keep it but I am 5\'3" so I had to get them hemmed — worth the tailoring cost.',
    date: '2026-07-22',
    verified: true,
    size: '26',
    fit: 'Runs large',
    helpful: 33,
  },
  {
    id: 'r13',
    productId: 'baggy-jean',
    author: 'Owen C.',
    location: 'Portland, OR',
    rating: 5,
    title: 'Unreal fabric',
    body: '14oz rigid denim for this money is not normal. The hardware is solid brass, it does not feel like it will break. Third RYN piece in my wardrobe.',
    date: '2026-10-12',
    verified: true,
    size: '32',
    fit: 'True to size',
    helpful: 44,
  },
  {
    id: 'r14',
    productId: 'nation-sweatpant',
    author: 'Rania A.',
    location: 'Paris, FR',
    rating: 5,
    title: 'Loungewear that looks styled',
    body: 'Set with the Nation hoodie is the best travel outfit I own — looked put together for a 9 hour flight. The fabric does not bag at the knees.',
    date: '2026-09-27',
    verified: true,
    size: 'M',
    fit: 'True to size',
    helpful: 26,
  },
  {
    id: 'r15',
    productId: 'nation-sweatpant',
    author: 'Marcus J.',
    location: 'Houston, TX',
    rating: 5,
    title: 'Runs a little long but that is the point',
    body: 'Meant to stack on trainers. Waistband is thick and does not roll. 10/10.',
    date: '2026-08-08',
    verified: true,
    size: 'XL',
    fit: 'True to size',
    helpful: 15,
  },
  {
    id: 'r16',
    productId: 'arch-tee',
    author: 'Zoe P.',
    location: 'Seoul, KR',
    rating: 4,
    title: 'Lovely, sizing is generous',
    body: 'I went down a size after reading reviews and it fits exactly as the model shot. The bone colorway is more cream than white, which I like.',
    date: '2026-09-30',
    verified: true,
    size: 'XS',
    fit: 'Runs large',
    helpful: 18,
  },
  {
    id: 'r17',
    productId: 'ryder-overshirt',
    author: 'Callum D.',
    location: 'Glasgow, UK',
    rating: 5,
    title: 'Styling it year round',
    body: 'Works in summer as a light jacket, in winter layered under a puffer. Genuinely the most versatile thing in my rotation.',
    date: '2026-10-15',
    verified: true,
    size: 'M',
    fit: 'True to size',
    helpful: 31,
  },
  {
    id: 'r18',
    productId: 'nation-hoodie',
    author: 'Ayesha B.',
    location: 'Mumbai, IN',
    rating: 5,
    title: 'Worth the wait',
    body: 'Shipping to India took about a week and it was worth it. The hood is double-lined so it actually stands up instead of flopping. Details matter.',
    date: '2026-10-03',
    verified: true,
    size: 'M',
    fit: 'True to size',
    helpful: 52,
  },
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    id: 'nation-hoodie',
    slug: 'nation-hoodie',
    name: 'Nation Hoodie',
    subtitle: '480gsm heavyweight fleece',
    price: 148,
    compareAt: 186,
    currency: 'USD',
    category: 'Hoodies',
    collectionIds: ['new-drop', 'core-essentials'],
    colors: [
      { name: 'Washed Black', hex: '#1c1b1a', images: [hoodieNation, dHoodieFabric] },
      { name: 'Bone', hex: '#ded5c4', images: [hoodieBone, dHoodieBone] },
      { name: 'Acid', hex: '#b9e04a', images: [hoodieAcid] },
    ],
    sizes: [
      { label: 'XS', inStock: false },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
      { label: 'XXL', inStock: true },
    ],
    badge: 'Best seller',
    rating: 4.9,
    reviewCount: 214,
    description:
      'The hoodie that built RYN. A 480gsm brushed-back fleece cut with dropped shoulders, a double-lined hood and a boxy body that sits exactly where you want it. Garment-dyed and enzyme-washed for a lived-in handfeel that only gets better.',
    details: [
      '100% long-staple cotton loopback fleece, 480gsm',
      'Double-lined hood with flat woven drawcord',
      'Raglan sleeve with dropped shoulder seam',
      'Twin needle hems, ribbed cuffs and hem',
      'Garment-dyed and enzyme-washed in Portugal',
    ],
    shipping:
      'Free express shipping on orders over $150. Dispatched from our New York studio within 1 business day. 30-day returns, no questions asked.',
    fit: 'Oversized, boxy fit. Take your usual size for the intended silhouette, or size down for a regular fit.',
    modelNote: 'Model is 5\'11" / 180cm and wears a size M.',
    images: [hoodieNation, dHoodieFabric, hoodieBone, edConcrete],
    tags: ['heavyweight', 'unisex', 'fleece'],
    featured: true,
    isNew: false,
    stock: 42,
  },
  {
    id: 'baggy-jean',
    slug: 'baggy-jean',
    name: 'Atelier Baggy Jean',
    subtitle: '14oz rigid selvedge denim',
    price: 165,
    currency: 'USD',
    category: 'Denim',
    collectionIds: ['new-drop', 'everyday-uniform'],
    colors: [
      { name: 'Vintage Light', hex: '#9db4c8', images: [jeanBaggy, dJeanDetail] },
      { name: 'Washed Black', hex: '#2c2a28', images: [jeanBlack] },
    ],
    sizes: [
      { label: '26', inStock: true },
      { label: '28', inStock: true },
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: false },
      { label: '36', inStock: true },
    ],
    badge: 'New',
    rating: 4.8,
    reviewCount: 168,
    description:
      'A proper wide leg, cut from 14oz rigid denim that holds its shape all day. High rise, straight through the thigh, generous through the leg with a long stacked inseam. Built to break in, not break down.',
    details: [
      '14oz rigid cotton denim, no stretch',
      'High rise with a clean five-pocket construction',
      'Solid brass shank button and YKK zip fly',
      'Wide leg with a 32" inseam for an intentional stack',
      'Woven in Okayama, Japan · cut and sewn in LA',
    ],
    shipping:
      'Free express shipping on orders over $150. Ships in 1 business day. Free exchanges on denim sizing, always.',
    fit: 'Relaxed high rise, wide straight leg. If between sizes, size down — 14oz rigids relax half a size with wear.',
    modelNote: 'Model is 5\'9" / 175cm and wears a size 28.',
    images: [jeanBaggy, dJeanDetail, jeanBlack],
    tags: ['rigid denim', 'wide leg', 'selvedge'],
    featured: true,
    isNew: true,
    stock: 27,
  },
  {
    id: 'arch-tee',
    slug: 'arch-tee',
    name: 'Arch Boxy Tee',
    subtitle: '260gsm combed cotton',
    price: 58,
    currency: 'USD',
    category: 'T-Shirts',
    collectionIds: ['core-essentials', 'everyday-uniform'],
    colors: [
      { name: 'Washed Black', hex: '#232120', images: [teeArch, dTeePrint] },
      { name: 'Bone', hex: '#e2dacb', images: [teeBone] },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
      { label: 'XXL', inStock: false },
    ],
    rating: 4.9,
    reviewCount: 341,
    description:
      'The tee the rest of the collection is built around. Heavy 260gsm combed cotton, a boxy cropped body, a ribbed collar that refuses to warp, and a tonal arch printed into the fabric rather than sitting on top of it.',
    details: [
      '260gsm combed and ring-spun cotton jersey',
      'Boxy body with a slightly dropped shoulder',
      'Double-stitched ribbed neckline',
      'Tonal water-based arch print, no hand feel',
      'Pre-shrunk and garment-washed',
    ],
    shipping: 'Free express shipping on orders over $150. Ships in 1 business day. 30-day returns.',
    fit: 'Boxy and slightly cropped. Size down for a fitted look.',
    modelNote: 'Model is 5\'9" / 175cm and wears a size M.',
    images: [teeArch, dTeePrint, teeBone],
    tags: ['heavyweight cotton', 'unisex'],
    featured: true,
    isNew: false,
    stock: 88,
  },
  {
    id: 'ryder-overshirt',
    slug: 'ryder-overshirt',
    name: 'Ryder Overshirt',
    subtitle: 'Washed cotton canvas',
    price: 189,
    compareAt: 225,
    currency: 'USD',
    category: 'Outerwear',
    collectionIds: ['new-drop', 'everyday-uniform'],
    colors: [
      { name: 'Stone Taupe', hex: '#b3a290', images: [overshirt, dOvershirtDetail] },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
      { label: 'XXL', inStock: false },
    ],
    badge: 'Low stock',
    rating: 4.7,
    reviewCount: 96,
    description:
      'A chore jacket reworked as a year-round layer. Stone-washed cotton canvas with a boxy shoulder, two deep patch pockets and a corozo button placket. Soft enough to wear open over a tee, substantial enough to layer under a puffer.',
    details: [
      '11oz stone-washed cotton canvas',
      'Corozo nut buttons, tonal matte finish',
      'Two oversized chest patch pockets',
      'Boxy shoulder with a straight hem',
      'Garment-washed for a broken-in handfeel',
    ],
    shipping: 'Free express shipping on orders over $150. Ships in 1 business day. 30-day returns.',
    fit: 'Relaxed fit. Roomy enough to layer a hoodie underneath — take your usual size.',
    modelNote: 'Model is 6\'1" / 185cm and wears a size M.',
    images: [overshirt, dOvershirtDetail, edConcrete],
    tags: ['layer', 'canvas', 'unisex'],
    featured: true,
    isNew: true,
    stock: 8,
  },
  {
    id: 'cargo-baggy',
    slug: 'cargo-baggy',
    name: 'Drift Cargo Pant',
    subtitle: 'Ripstop parachute trouser',
    price: 138,
    currency: 'USD',
    category: 'Trousers',
    collectionIds: ['new-drop', 'everyday-uniform'],
    colors: [
      { name: 'Charcoal', hex: '#3a3a3c', images: [cargo, dCargoDetail] },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: false },
      { label: 'XL', inStock: true },
    ],
    badge: 'Trending',
    rating: 4.8,
    reviewCount: 127,
    description:
      'Parachute proportions without the costume energy. A lightweight cotton ripstop with a high elasticated waist, adjustable ankle cinch and utility pockets placed where your hands actually go.',
    details: [
      '100% cotton ripstop, 210gsm',
      'Elasticated waist with an internal drawcord',
      'Adjustable ankle cinch with matte cord locks',
      'Six pockets including two bellowed cargos',
      'Water-repellent finish, PFC-free',
    ],
    shipping: 'Free express shipping on orders over $150. Ships in 1 business day. 30-day returns.',
    fit: 'Relaxed with a tapered ankle cinch. True to size.',
    modelNote: 'Model is 5\'10" / 178cm and wears a size M.',
    images: [cargo, dCargoDetail],
    tags: ['cargo', 'parachute', 'unisex'],
    featured: true,
    isNew: true,
    stock: 19,
  },
  {
    id: 'nation-sweatpant',
    slug: 'nation-sweatpant',
    name: 'Nation Sweatpant',
    subtitle: '480gsm heavyweight fleece',
    price: 128,
    currency: 'USD',
    category: 'Trousers',
    collectionIds: ['core-essentials', 'everyday-uniform'],
    colors: [
      { name: 'Washed Black', hex: '#1c1b1a', images: [sweatBlack] },
      { name: 'Bone', hex: '#ded5c4', images: [sweatBone] },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    rating: 4.8,
    reviewCount: 156,
    description:
      'The other half of the set. Same 480gsm loopback fleece as the Nation Hoodie, cut with a straight wide leg and a thick, non-rolling waistband. An intentional stack on trainers, no bagging at the knee.',
    details: [
      '480gsm cotton loopback fleece',
      'Heavy rib waistband with flat drawcord',
      'Straight wide leg, 31" inseam',
      'Two side seam pockets, one back welt pocket',
      'Enzyme-washed in Portugal',
    ],
    shipping: 'Free express shipping on orders over $150. Ships in 1 business day. 30-day returns.',
    fit: 'Relaxed straight leg. True to size.',
    modelNote: 'Model is 5\'9" / 175cm and wears a size M.',
    images: [sweatBlack, sweatBone],
    tags: ['fleece', 'set', 'unisex'],
    featured: false,
    isNew: false,
    stock: 34,
  },
  {
    id: 'acid-hoodie',
    slug: 'acid-hoodie',
    name: 'Nation Hoodie — Acid',
    subtitle: 'Limited colorway · 100 units',
    price: 158,
    currency: 'USD',
    category: 'Hoodies',
    collectionIds: ['new-drop'],
    colors: [{ name: 'Acid Lime', hex: '#b9e04a', images: [hoodieAcid] }],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
    ],
    badge: 'Limited',
    rating: 5.0,
    reviewCount: 43,
    description:
      'The Nation Hoodie in Acid — an RYN-exclusive pigment dye that was a nightmare to get right. Only 100 pieces produced. Once it is gone, it is gone.',
    details: [
      '480gsm cotton loopback fleece, pigment dyed',
      'Double-lined hood with flat woven drawcord',
      'Numbered inside-label, 1 of 100',
      'Garment-dyed in Portugal',
    ],
    shipping: 'Limited release — ships within 2 business days. Final sale on numbered pieces.',
    fit: 'Oversized, boxy fit. Take your usual size.',
    modelNote: 'Model is 5\'11" / 180cm and wears a size M.',
    images: [hoodieAcid],
    tags: ['limited', 'hoodie', 'statement'],
    featured: true,
    isNew: true,
    stock: 4,
  },
  {
    id: 'bone-tee',
    slug: 'bone-tee',
    name: 'Arch Boxy Tee — Bone',
    subtitle: 'The neutral everyone asks about',
    price: 58,
    currency: 'USD',
    category: 'T-Shirts',
    collectionIds: ['core-essentials'],
    colors: [{ name: 'Bone', hex: '#e2dacb', images: [teeBone] }],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: false },
      { label: 'XL', inStock: true },
    ],
    rating: 4.9,
    reviewCount: 128,
    description:
      'The Arch tee in our bone colorway — a warm, undyed cream that reads richer than white and works with everything in the collection.',
    details: [
      '260gsm combed cotton jersey',
      'Undyed natural bone cotton, no optical whiteners',
      'Tonal water-based arch print',
      'Pre-shrunk and garment-washed',
    ],
    shipping: 'Free express shipping on orders over $150. Ships in 1 business day. 30-day returns.',
    fit: 'Boxy and slightly cropped. Size down for a fitted look.',
    modelNote: 'Model is 5\'9" / 175cm and wears a size M.',
    images: [teeBone],
    tags: ['neutral', 'cotton', 'unisex'],
    featured: false,
    isNew: false,
    stock: 61,
  },
];

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export const collections: Collection[] = [
  {
    id: 'new-drop',
    slug: 'new-drop',
    name: 'The New Drop',
    tagline: 'Volume 04 — Fall / Winter 26',
    description:
      'Eleven pieces designed in one sitting, in one palette. Heavyweight fleece, rigid denim and stone-washed canvas, cut oversized and built to be worn into the ground.',
    image: edConcrete,
    accent: '#dcd4c4',
  },
  {
    id: 'core-essentials',
    slug: 'core-essentials',
    name: 'Core Essentials',
    tagline: 'The permanent collection',
    description:
      'The pieces we restock forever. Perfect-weight tees, heavyweight fleece and the sweatpant that started it all — in a palette that never dates.',
    image: hoodieBone,
    accent: '#e9e3d7',
  },
  {
    id: 'everyday-uniform',
    slug: 'everyday-uniform',
    name: 'Everyday Uniform',
    tagline: 'Built for the 5-day week',
    description:
      'Cargos, overshirts and the baggy jean — the rotation that gets you out the door without thinking, and still looks composed at 6pm.',
    image: cargo,
    accent: '#cfc7ba',
  },
];

/* ------------------------------------------------------------------ */
/* Lookbook / editorial                                                */
/* ------------------------------------------------------------------ */

export const lookbook = [
  {
    id: 'lb1',
    image: hoodieNation,
    title: 'Off-Duty',
    caption: 'Nation Hoodie in Washed Black · Nation Sweatpant',
    productSlug: 'nation-hoodie',
    span: 'tall' as const,
  },
  {
    id: 'lb2',
    image: jeanBaggy,
    title: 'The Wide Leg',
    caption: 'Atelier Baggy Jean in Vintage Light',
    productSlug: 'baggy-jean',
    span: 'short' as const,
  },
  {
    id: 'lb3',
    image: overshirt,
    title: 'Layering',
    caption: 'Ryder Overshirt in Stone Taupe',
    productSlug: 'ryder-overshirt',
    span: 'short' as const,
  },
  {
    id: 'lb4',
    image: cargo,
    title: 'Utility',
    caption: 'Drift Cargo Pant in Charcoal',
    productSlug: 'cargo-baggy',
    span: 'tall' as const,
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getReviewsForProduct = (productId: string) =>
  reviews.filter((r) => r.productId === productId);

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aShared = a.collectionIds.filter((c) =>
        product.collectionIds.includes(c),
      ).length;
      const bShared = b.collectionIds.filter((c) =>
        product.collectionIds.includes(c),
      ).length;
      return bShared - aShared || b.reviewCount - a.reviewCount;
    })
    .slice(0, limit);

export const allCategories = [
  'Hoodies',
  'T-Shirts',
  'Denim',
  'Trousers',
  'Outerwear',
] as const;

export const allColors = [
  { name: 'Washed Black', hex: '#1c1b1a' },
  { name: 'Bone', hex: '#ded5c4' },
  { name: 'Acid', hex: '#b9e04a' },
  { name: 'Vintage Light', hex: '#9db4c8' },
  { name: 'Stone Taupe', hex: '#b3a290' },
  { name: 'Charcoal', hex: '#3a3a3c' },
];

export const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const FREE_SHIPPING_THRESHOLD = 150;
