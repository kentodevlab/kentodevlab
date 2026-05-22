import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackToTop } from "@/components/BackToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kento DevLab",
  description: "Agencia de desarrollo web en Madrid especializada en PYMEs, comercios y autónomos. Webs desde 1.500€, tiendas online desde 3.500€. Precio cerrado garantizado.",
  url: "https://kento-devlab.com",
  logo: "https://kento-devlab.com/logo-light-hor.png",
  image: "https://kento-devlab.com/logo-light-hor.png",
  telephone: "+34600000000",
  email: "hola@kentodevlab.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressRegion: "Madrid",
    addressCountry: "ES",
  },
  areaServed: [
    { "@type": "State", name: "Comunidad de Madrid" },
    { "@type": "Country", name: "España" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de desarrollo web",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Web Corporativa" },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "1500", priceCurrency: "EUR" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Tienda Online (E-commerce)" },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "3500", priceCurrency: "EUR" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "SaaS / WebApp a medida" },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "8000", priceCurrency: "EUR" },
      },
    ],
  },
  serviceType: ["Desarrollo Web", "Tienda Online", "SaaS", "WebApp", "Mantenimiento Web"],
  priceRange: "€€",
};

export const metadata: Metadata = {
  title: {
    default: 'Kento DevLab | Desarrollo Web para PYMEs en Madrid',
    template: '%s | Kento DevLab',
  },
  description: 'Agencia de desarrollo web en Madrid para PYMEs y autónomos. Webs desde 1.500€ · Tiendas online desde 3.500€ · Precio cerrado garantizado · 30 días de garantía · Respuesta en 24h.',
  keywords: [
    'desarrollo web madrid',
    'diseño web pymes madrid',
    'tienda online madrid',
    'desarrollo web autonomos',
    'agencia web madrid pequeñas empresas',
    'SaaS desarrollo madrid',
    'ecommerce madrid',
    'mantenimiento web madrid',
    'presupuesto web madrid',
    'web corporativa madrid',
  ],
  authors: [{ name: 'Kento DevLab' }],
  creator: 'Kento DevLab',
  publisher: 'Kento DevLab',
  metadataBase: new URL('https://kento-devlab.com'),
  alternates: {
    canonical: 'https://kento-devlab.com',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Kento DevLab | Desarrollo Web para PYMEs en Madrid',
    description: 'Webs desde 1.500€ · Tiendas online desde 3.500€ · Precio cerrado · 30 días de garantía. Especialistas en PYMEs y autónomos en Madrid.',
    url: 'https://kento-devlab.com',
    siteName: 'Kento DevLab',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kento DevLab | Desarrollo Web para PYMEs en Madrid',
    description: 'Webs desde 1.500€ · Tiendas online desde 3.500€ · Precio cerrado garantizado · Respuesta en 24h.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <meta name="google-site-verification" content="CmM96X7k1QlZq3cQ6D-zsMS4MdAcqUZI_-lZPqlCTt8" />
      <meta name="msvalidate.01" content="06960FFF9BAA139E1942BDF0A32D1236" />
      <body className={`${inter.variable} ${jetbrains.variable} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
        {/* Enlace de salto para teclado y lectores de pantalla */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
