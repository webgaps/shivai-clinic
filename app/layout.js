import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Shivai Multispecialty Clinic | Hadapsar, Pune",
  description:
    "Shivai Multispecialty Clinic in Gadital, Hadapsar — experienced doctors across General Medicine, Paediatrics, Gynaecology, Orthopaedics, ENT, Cardiology, Pathology, and Sonography. Morning and evening OPD. Call +91 75593 23601.",
  keywords: [
    "multispecialty clinic Hadapsar",
    "doctor Gadital Hadapsar",
    "Shivai clinic Pune",
    "pathology lab Hadapsar",
    "sonography Hadapsar",
    "paediatrics Hadapsar",
    "general medicine Hadapsar",
    "gynaecology clinic Pune",
    "orthopaedic doctor Hadapsar",
    "ECG clinic Hadapsar",
    "clinic near me Hadapsar",
  ],
  openGraph: {
    title: "Shivai Multispecialty Clinic | Gadital, Hadapsar",
    description:
      "Complete family healthcare in Hadapsar — specialists in General Medicine, Paediatrics, Gynaecology, Orthopaedics, ENT, Pathology, and Sonography. 5.0 star rated. Call +91 75593 23601.",
    type: "website",
    locale: "en_IN",
    siteName: "Shivai Multispecialty Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivai Multispecialty Clinic | Hadapsar, Pune",
    description:
      "Trusted multispecialty clinic in Gadital, Hadapsar. Morning and evening OPD. On-site pathology and sonography. 5.0 rated on Google.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
};

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Shivai Multispecialty Clinic",
  description:
    "Multispecialty clinic in Hadapsar offering General Medicine, Paediatrics, Gynaecology, Orthopaedics, ENT, Cardiology, Pathology, and Sonography services.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Vaishali Heights, Opp. Janseva Bank, Gadital",
    addressLocality: "Hadapsar",
    addressRegion: "Maharashtra",
    postalCode: "411028",
    addressCountry: "IN",
  },
  telephone: "+91-75593-23601",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.5017,
    longitude: 73.936,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "128",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "17:00",
      closes: "21:00",
    },
  ],
  medicalSpecialty: [
    "General Medicine",
    "Paediatrics",
    "Gynaecology",
    "Orthopaedics",
    "Otolaryngology",
    "Cardiology",
    "Pathology",
    "Radiology",
  ],
  currenciesAccepted: "INR",
  priceRange: "₹₹",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Hadapsar, Pune" />
        <meta name="geo.position" content="18.5017;73.9360" />
        <meta name="ICBM" content="18.5017, 73.9360" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}