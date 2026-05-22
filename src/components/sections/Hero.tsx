'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { HeroContent, Estadistica } from '@/types/content';

interface HeroProps {
  hero?: HeroContent | null;
  estadisticas?: Estadistica[];
}

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function Hero({ hero, estadisticas = [] }: HeroProps) {
  const titulo = hero?.titulo || 'Transformamos tu negocio digital';
  const subtitulo = hero?.subtitulo || 'Madrid, España';
  const descripcion =
    hero?.descripcion ||
    'Construimos páginas web, SaaS, WebApps y E-commerce que generan resultados. Diseños modernos, escalables y optimizados para convertir visitantes en clientes.';
  const imagenUrl = hero?.imagen;

  const words = titulo.split(' ');
  const mainText = words.slice(0, -1).join(' ');
  const highlightedWord = words[words.length - 1];

  const stats = estadisticas.length > 0 ? estadisticas : [
    { valor: '50+', etiqueta: 'Proyectos entregados' },
    { valor: '98%', etiqueta: 'Clientes satisfechos' },
    { valor: '24h', etiqueta: 'Tiempo de respuesta' },
    { valor: '100%', etiqueta: 'Proyectos escalables' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      aria-label="Sección principal"
    >
      {/* Imagen de fondo optimizada con next/image */}
      {imagenUrl && imagenUrl.startsWith('http') && (
        <Image
          src={imagenUrl}
          alt=""
          fill
          className="object-cover opacity-15"
          priority
          aria-hidden="true"
        />
      )}

      {/* Gradientes decorativos */}
      {!imagenUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" aria-hidden="true" />
      )}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"
        aria-hidden="true"
      />

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center"
      >
        {/* Pill de localización */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted text-sm text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            {subtitulo}
          </span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          {mainText}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {highlightedWord}
          </span>
        </motion.h1>

        {/* Descripción */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {descripcion}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Iniciar Proyecto
          </Link>
          <Link
            href="#servicios"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl border border-border hover:bg-muted hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Ver Servicios
          </Link>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          aria-label="Estadísticas de la empresa"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1" aria-label={stat.valor}>
                {stat.valor}
              </div>
              <div className="text-sm text-muted-foreground">{stat.etiqueta}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link
          href="#servicios"
          className="p-2 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
          aria-label="Ir a la sección de servicios"
        >
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
