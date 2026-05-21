import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  description: "Agencia de desarrollo web en Madrid. Creamos páginas web, SaaS, WebApps y E-commerce para PYMES y autónomos.",
  url: "https://kento-devlab.com",
  logo: "https://kento-devlab.com/logo-light-hor.png",
  image: "https://kento-devlab.com/logo-light-hor.png",
  telephone: "+34",
  email: "hola@kento-devlab.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressRegion: "Madrid",
    addressCountry: "ES",
  },
  areaServed: {
    "@type": "State",
    name: "Comunidad de Madrid",
  },
  serviceType: ["Desarrollo Web", "SaaS", "E-commerce", "Mantenimiento Web"],
  priceRange: "€€",
};

export const metadata: Metadata = {
  title: {
    default: 'Kento DevLab | Desarrollo Web Madrid',
    template: '%s | Kento DevLab',
  },
  description: 'Agencia de desarrollo web en Madrid. Creamos páginas web, SaaS, WebApps y E-commerce para PYMES y autónomos. Diseño moderno y escalable.',
  keywords: ['desarrollo web', 'SaaS', 'E-commerce', 'Madrid', 'agencia digital', 'PYMES', 'autónomos', 'web development', 'tienda online'],
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
    title: 'Kento DevLab | Desarrollo Web Madrid',
    description: 'Agencia de desarrollo web en Madrid. Creamos páginas web, SaaS, WebApps y E-commerce para PYMES y autónomos.',
    url: 'https://kento-devlab.com',
    siteName: 'Kento DevLab',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kento DevLab | Desarrollo Web Madrid',
    description: 'Agencia de desarrollo web en Madrid. Creamos páginas web, SaaS, WebApps y E-commerce.',
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
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
