export interface Treatment {
  id: string
  name: string
  subtitle: string
  category: 'relaxation' | 'pain-relief' | 'holistic' | 'thermal'
  priceINR: number
  durations: number[]
  description: string
  benefits: string[]
  bestFor: string[]
  contraindications: string[]
  processSteps: { title: string; duration: string; detail: string }[]
  expectedOutcome: string
  faqs: { q: string; a: string }[]
  bgGradient: string
  accentColor: string
}

export const TREATMENTS_DATA: Treatment[] = [
  {
    id: 'swedish',
    name: 'Swedish Massage (Serenity Ritual)',
    subtitle: 'Classic Gentle Full-Body Relaxation',
    category: 'relaxation',
    priceINR: 3499,
    durations: [60, 90, 120],
    description:
      'A classic European therapeutic ritual employing long, gliding effleurage strokes, gentle kneading, and circular friction. Perfect for first-time visitors seeking complete mental and physical unwinding.',
    benefits: [
      'Boosts lymphatic circulation & oxygen delivery',
      'Lowers salivary cortisol stress hormone by up to 34%',
      'Improves joint flexibility and muscular elasticity',
      'Induces natural serotonin and endorphin release',
    ],
    bestFor: ['First-time spa visitors', 'Office professionals with chronic fatigue', 'Light relaxation seekers'],
    contraindications: ['Recent unhealed fractures', 'Severe varicose veins', 'Acute fever or skin infection'],
    processSteps: [
      { title: 'Aroma Inhalation & Foot Bath', duration: '10 mins', detail: 'Warm eucalyptus organic foot soak while breathing pure lavender steam.' },
      { title: 'Full Body Effleurage', duration: '40 mins', detail: 'Long rhythmic palm strokes with warm organic cold-pressed sesame oil.' },
      { title: 'Gentle Scalp & Facial Meridian Release', duration: '10 mins', detail: 'Pressure point facial alignment for total cranial relaxation.' },
    ],
    expectedOutcome: 'Immediate reduction in anxiety, lightened muscular tension, and deep sleep readiness.',
    faqs: [
      { q: 'Is this massage painful?', a: 'Not at all. Swedish massage utilizes light to medium pressure tailored completely to your comfort level.' },
      { q: 'What should I wear during the session?', a: 'We provide single-use sanitized disposable undergarments. Complete privacy is guaranteed at all times.' },
    ],
    bgGradient: 'from-[#FAF4E6] to-[#F5F0EB]',
    accentColor: '#5A7365',
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue Therapy (Deep Recovery)',
    subtitle: 'Targeted Sub-Fascial Tension Release',
    category: 'pain-relief',
    priceINR: 4299,
    durations: [60, 90, 120],
    description:
      'Reaches deep muscle layers and connective fascia to break down stubborn chronic knots, adhesions, and long-standing postural tightness. Performed by certified senior physiotherapeutic therapists.',
    benefits: [
      'Disintegrates deep muscle knots and fibrous adhesions',
      'Relieves lower back stiffness and sciatica tension',
      'Accelerates athletic recovery and lactic acid clearance',
      'Restores natural spinal alignment and posture',
    ],
    bestFor: ['Athletes & fitness enthusiasts', 'Chronic back/neck stiffness sufferers', 'Deep pressure lovers'],
    contraindications: ['Osteoporosis', 'Blood thinning medication', 'Recent major surgeries within 6 weeks'],
    processSteps: [
      { title: 'Thermal Herbal Compress Warm-up', duration: '15 mins', detail: 'Hot herbal pouches applied to soften dense muscle fascia.' },
      { title: 'Targeted Deep Elbow & Thumb Friction', duration: '50 mins', detail: 'Focused intense pressure on trigger points along the back and shoulders.' },
      { title: 'Passive Myofascial Stretching', duration: '25 mins', detail: 'Assisted spinal and hamstring lengthening to prevent rebound tightness.' },
    ],
    expectedOutcome: 'Significant release of deep postural tightness, increased range of motion, and long-term pain relief.',
    faqs: [
      { q: 'Will I feel sore the next day?', a: 'Mild tender soreness for 24 hours is normal as deep lactic acid releases. Hydrating thoroughly expedites recovery.' },
    ],
    bgGradient: 'from-[#F4F7F5] to-[#E4ECE7]',
    accentColor: '#3A4A40',
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy Ritual (Eucalyptus Bliss)',
    subtitle: 'Olfactory Sensory & Lymphatic Reset',
    category: 'holistic',
    priceINR: 3999,
    durations: [60, 90],
    description:
      'Combines custom-blended 100% pure steam-distilled essential oils (Eucalyptus, Wild Lavender, Frankincense) with soothing lymphatic drainage techniques to harmonize mind, mood, and immune resilience.',
    benefits: [
      'Clears respiratory sinuses and lung passages',
      'Deeply nourishes dry skin with cold-pressed botanical carrier oils',
      'Regulates autonomic nervous system and insomnia',
      'Promotes emotional grounding and sensory serenity',
    ],
    bestFor: ['High-stress executives', 'Insomnia & anxiety sufferers', 'Sensory wellbeing seekers'],
    contraindications: ['First trimester pregnancy', 'Severe asthma / active fragrance allergies'],
    processSteps: [
      { title: 'Essential Oil Custom Blending', duration: '10 mins', detail: 'Select your personal oil scent profile based on your current emotional state.' },
      { title: 'Lymphatic Drainage Massage', duration: '60 mins', detail: 'Rhythmic featherlight strokes directing toxins towards lymph nodes.' },
      { title: 'Thermal Steam Inhalation', duration: '20 mins', detail: 'Warm botanical mist diffusion over face and chest.' },
    ],
    expectedOutcome: 'Profound emotional tranquility, silky hydrated skin, and unblocked nasal pathways.',
    faqs: [
      { q: 'Can I shower immediately after?', a: 'We recommend leaving the therapeutic oils on your skin for at least 4 hours for maximum absorption.' },
    ],
    bgGradient: 'from-[#FAF8F5] to-[#EDE6DD]',
    accentColor: '#C5A059',
  },
  {
    id: 'reflexology',
    name: 'Reflexology (Sole & Spirit Harmony)',
    subtitle: 'Ancient Pressure Meridian Stimulation',
    category: 'holistic',
    priceINR: 2999,
    durations: [60, 90],
    description:
      'Applies systematic pressure to specific reflex zones on the feet and hands corresponding to internal organs and bodily energy meridians. Restores visceral equilibrium from base to crown.',
    benefits: [
      'Alleviates plantar fasciitis and leg heaviness',
      'Stimulates organ digestive detoxification',
      'Reduces frequency of chronic migraine headaches',
      'Promotes deep grounding and electrical energy balance',
    ],
    bestFor: ['Senior citizens', 'People standing long hours', 'Frequent travelers & flyer fatigue'],
    contraindications: ['Active foot ulcers or fungal infections', 'Deep vein thrombosis (DVT)'],
    processSteps: [
      { title: 'Warm Himalayan Salt Foot Soak', duration: '15 mins', detail: 'Purifying mineral bath with organic rose petals.' },
      { title: 'Foot Meridian Reflexology', duration: '40 mins', detail: 'Targeted wooden tool and thumb stimulation across 64 foot zones.' },
      { title: 'Hand & Scalp Meridian Alignment', duration: '20 mins', detail: 'Gentle energy meridian work along wrists and temples.' },
    ],
    expectedOutcome: 'Lightness in legs, balanced digestion, and overall visceral vitality.',
    faqs: [
      { q: 'Do I need to undress for reflexology?', a: 'No, reflexology requires removing only shoes and socks. Loose comfortable attire is recommended.' },
    ],
    bgGradient: 'from-[#FDFBF7] to-[#F6F1EA]',
    accentColor: '#7A9484',
  },
  {
    id: 'hot-stone',
    name: 'Hot Stone Therapy (Thermal Balance)',
    subtitle: 'Volcanic Basalt Heat & Energy Healing',
    category: 'thermal',
    priceINR: 4799,
    durations: [90, 120],
    description:
      'Smooth, polished volcanic basalt stones are heated to a precise 54°C and placed along key spinal chakra centers. The radiant heat penetrates 4cm into muscle layers without requiring painful force.',
    benefits: [
      'Melts rigid muscle stiffness effortlessly via thermal conduction',
      'Dramatically enhances arterial blood flow and cell oxygenation',
      'Soothes chronic arthritis and rheumatic discomfort',
      'Delivers an unparalleled cocoon-like luxury sensation',
    ],
    bestFor: ['Cold climate stiffness', 'Rheumatic stiffness', 'Ultimate luxury pampering lovers'],
    contraindications: ['High blood pressure (uncontrolled)', 'Diabetes neuropathy', 'Heat sensitivity'],
    processSteps: [
      { title: 'Chakra Stone Placement', duration: '15 mins', detail: 'Warmed stones positioned along spine, palms, and toes.' },
      { title: 'Hot Stone Thermal Gliding', duration: '60 mins', detail: 'Therapist glides smooth warm stones over body with sweet almond oil.' },
      { title: 'Cool Marble Contrast Therapy', duration: '15 mins', detail: 'Optional cool marble stone touch to seal pores and invigorate skin.' },
    ],
    expectedOutcome: 'Complete physical melt, elevated core body warmth, and deep meditative state.',
    faqs: [
      { q: 'Are the stones dangerously hot?', a: 'No. Stones are maintained in controlled warmers at 54°C, safe and deeply soothing for skin.' },
    ],
    bgGradient: 'from-[#FAF4E6] to-[#EDE6DD]',
    accentColor: '#D4AF37',
  },
]

export interface Therapist {
  id: string
  name: string
  title: string
  experienceYears: number
  specialties: string[]
  quote: string
  featuredRitual: string
  bio: string
  certifications: string[]
  clientRating: number
  reviewsCount: number
  reviewQuote: string
  clientName: string
  avatarBg: string
  availableToday: boolean
}

export const THERAPISTS_DATA: Therapist[] = [
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    title: 'Master Swedish & Aromatherapy Specialist',
    experienceYears: 10,
    specialties: ['Swedish Massage', 'Aromatherapy', 'Pregnancy & Gentle Touch'],
    quote: 'Healing Through Gentle Touch',
    featuredRitual: 'Serenity Swedish Ritual',
    bio: 'Certified internationally in London and Bali, Sarah blends rhythmic Western effleurage with traditional Ayurvedic aromatic steam inhalation to reset overstimulated nervous systems.',
    certifications: [
      'CIDESCO International Spa Diploma',
      'Advanced Organic Aromatherapy Practitioner',
      'Prenatal & Gentle Touch Certified Specialist',
    ],
    clientRating: 4.95,
    reviewsCount: 218,
    reviewQuote: 'Sarah has an intuitive touch that instantly melted away my 3-month burnout. Truly magical session!',
    clientName: 'Ananya Sharma (Director of Product)',
    avatarBg: 'from-[#5A7365] to-[#3E5246]',
    availableToday: true,
  },
  {
    id: 'david',
    name: 'David Vance',
    title: 'Senior Musculoskeletal & Deep Tissue Lead',
    experienceYears: 8,
    specialties: ['Deep Tissue Therapy', 'Sports Rehabilitation', 'Myofascial Trigger Pointing'],
    quote: 'Strength Restored',
    featuredRitual: 'Deep Recovery Therapy',
    bio: 'Former sports physiotherapist with 8+ years treating professional athletes and corporate leaders suffering from severe posture alignment issues and lumbar pain.',
    certifications: [
      'Bachelor of Physiotherapy (BPT)',
      'Certified Myofascial Release Therapist',
      'Spinal Alignment & Trigger Point Specialist',
    ],
    clientRating: 4.92,
    reviewsCount: 184,
    reviewQuote: 'David freed up a shoulder knot I had for 2 years in just one 90-minute Deep Tissue session.',
    clientName: 'Rohan Mehta (Founder & CEO)',
    avatarBg: 'from-[#111614] to-[#1A211E]',
    availableToday: true,
  },
  {
    id: 'helen',
    name: 'Helen Lin',
    title: 'Thermal & Reflexology Master Practitioner',
    experienceYears: 12,
    specialties: ['Hot Stone Therapy', 'Foot Reflexology Meridian Work', 'Chakra Balancing'],
    quote: 'Balance Begins Within',
    featuredRitual: 'Thermal Harmony Session',
    bio: 'Trained in Eastern foot reflexology in Kyoto and volcanic basalt heat therapy in Hawaii, Helen brings 12+ years of holistic energy meridian mastery.',
    certifications: [
      'Kyoto School of Traditional Reflexology Master',
      'Volcanic Basalt Thermal Master Certification',
      'Reiki Energy Healing Level III',
    ],
    clientRating: 4.98,
    reviewsCount: 310,
    reviewQuote: 'The hot stone ritual with Helen was out of this world. I felt like I floated out of the sanctuary.',
    clientName: 'Priya Nambiar (Senior Advocate)',
    avatarBg: 'from-[#C5A059] to-[#9A7A3B]',
    availableToday: true,
  },
]
