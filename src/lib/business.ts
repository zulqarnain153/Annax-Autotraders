// ─────────────────────────────────────────────────────────────────────────
// ANNAX AUTO TRADERS — CENTRAL BUSINESS CONFIG
// Every client-specific detail lives here. Update this file only when
// the business's real details change — never hardcode them in components.
// ─────────────────────────────────────────────────────────────────────────

export const business = {
  name: "Annax Auto Traders",
  legalName: "Annax Auto Traders Ltd",
  tagline: "Driven By Trust",
  shortDescription:
    "A boutique used car dealership in Staines-upon-Thames, hand-picking quality vehicles and backing every sale with honest advice.",

  founded: 2016,

  contact: {
    phone: "+44 1784 000 000",
    phoneDisplay: "01784 000 000",
    whatsapp: "441784000000",
    email: "info@annaxautotraders.co.uk",
    salesEmail: "sales@annaxautotraders.co.uk",
  },

  address: {
    line1: "12 Kingston Road",
    line2: "Staines-upon-Thames",
    city: "Staines-upon-Thames",
    county: "Surrey",
    postcode: "TW18 4LH",
    country: "United Kingdom",
    full: "12 Kingston Road, Staines-upon-Thames, Surrey, TW18 4LH",
    lat: 51.4335,
    lng: -0.5136,
  },

  hours: [
    { day: "Monday", open: "09:00", close: "18:00" },
    { day: "Tuesday", open: "09:00", close: "18:00" },
    { day: "Wednesday", open: "09:00", close: "18:00" },
    { day: "Thursday", open: "09:00", close: "18:00" },
    { day: "Friday", open: "09:00", close: "18:00" },
    { day: "Saturday", open: "09:00", close: "17:00" },
    { day: "Sunday", open: "10:00", close: "16:00" },
  ],

  social: {
    instagram: "https://instagram.com/annaxautotraders",
    facebook: "https://facebook.com/annaxautotraders",
    tiktok: "https://tiktok.com/@annaxautotraders",
    youtube: "https://youtube.com/@annaxautotraders",
    linkedin: "https://linkedin.com/company/annaxautotraders",
  },

  currency: "GBP",
  currencySymbol: "£",
  locale: "en-GB",

  finance: {
    apr: 9.9,
    minDeposit: 0,
    minTermMonths: 12,
    maxTermMonths: 60,
    lender: "a panel of FCA-regulated lenders",
    disclaimer:
      "Finance figures are illustrative and subject to status, credit checks, and lender approval. Annax Auto Traders Ltd is a credit broker, not a lender.",
  },

  stats: [
    { label: "Cars Sold", value: 1400, suffix: "+" },
    { label: "Years Trading", value: 9, suffix: "" },
    { label: "Google Rating", value: 4.9, suffix: "/5" },
    { label: "Happy Customers", value: 1200, suffix: "+" },
  ],

  reviewsSummary: {
    average: 4.9,
    count: 312,
    source: "Google Reviews",
  },

  formSubmitEndpoint: "https://api.web3forms.com/submit",
  // Reads from NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY if set (see .env.example).
  // Falls back to a placeholder — replace before deployment either way.
  web3formsAccessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "YOUR_WEB3FORMS_ACCESS_KEY",

  seo: {
    defaultTitle: "Annax Auto Traders | Premium Used Cars in Staines-upon-Thames",
    titleTemplate: "%s | Annax Auto Traders",
    defaultDescription:
      "Hand-picked used cars in Staines-upon-Thames. Annax Auto Traders offers premium quality vehicles, flexible finance, part exchange, and honest advice — no pressure, ever.",
    siteUrl: "https://www.annaxautotraders.co.uk",
    ogImage: "/og-image.jpg",
  },
} as const;

export type BusinessConfig = typeof business;
