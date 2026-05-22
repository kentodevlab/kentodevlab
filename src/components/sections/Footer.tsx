'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { RedSocial } from '@/types/content';
import { useTheme } from '@/hooks/useTheme';

interface FooterProps {
  redes?: RedSocial[];
}

const footerLinks = {
  servicios: [
    { href: '#servicios', label: 'Web Corporativa' },
    { href: '#servicios', label: 'Tienda Online' },
    { href: '#servicios', label: 'SaaS & WebApps' },
    { href: '#servicios', label: 'Mantenimiento' },
  ],
  empresa: [
    { href: '#sobre-nosotros', label: 'Sobre nosotros' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#precios', label: 'Precios' },
    { href: '#faq', label: 'Preguntas frecuentes' },
    { href: '#contacto', label: 'Contacto' },
  ],
  legal: [
    { href: '/privacidad', label: 'Política de Privacidad' },
    { href: '/cookies', label: 'Política de Cookies' },
    { href: '/aviso-legal', label: 'Aviso Legal' },
  ],
};

export function Footer({ redes = [] }: FooterProps) {
  const { theme } = useTheme();

  const redesPredeterminadas = [
    { nombre: 'LinkedIn', icono: 'in', url: 'https://linkedin.com/company/kentodevlab' },
    { nombre: 'Instagram', icono: '📷', url: 'https://instagram.com/kentodevlab' },
    { nombre: 'Twitter / X', icono: '𝕏', url: 'https://twitter.com/kentodevlab' },
  ];

  const redesAMostrar = redes.length > 0 ? redes : redesPredeterminadas;

  return (
    <footer className="py-16 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Columna: marca + descripción + redes */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-fit"
            >
              <Image
                src={theme === 'light' ? '/logo-light.png' : '/logo-dark.png'}
                alt="Kento DevLab — inicio"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-2 max-w-xs">
              Desarrollo web para PYMEs, comercios y autónomos en Madrid. Precio cerrado, garantía incluida.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              <a
                href="mailto:hola@kentodevlab.com"
                className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                hola@kentodevlab.com
              </a>
            </p>

            <div className="flex gap-3" aria-label="Nuestras redes sociales">
              {redesAMostrar.map((red) => (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`${red.nombre} (abre en nueva pestaña)`}
                >
                  {red.icono?.startsWith('http') ? (
                    <Image src={red.icono} alt="" width={20} height={20} className="object-contain" />
                  ) : (
                    <span className="text-sm font-bold" aria-hidden="true">{red.icono}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Columna: Servicios */}
          <nav aria-label="Servicios">
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna: Empresa */}
          <nav aria-label="Empresa">
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna: Legal */}
          <nav aria-label="Legal">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kento DevLab · Desarrollo web en Madrid
          </p>
          <p className="text-sm text-muted-foreground">
            Hecho con ☕ en Madrid, España 🇪🇸
          </p>
        </div>
      </div>
    </footer>
  );
}
