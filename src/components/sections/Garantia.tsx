'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const garantias = [
  {
    icono: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titulo: '30 días de garantía',
    descripcion:
      'Si algo falla por un error de nuestro desarrollo en los 30 días siguientes al lanzamiento, lo corregimos sin coste y sin excusas.',
  },
  {
    icono: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titulo: 'Precio cerrado garantizado',
    descripcion:
      'El presupuesto que firmamos es el que pagas. Si tardamos más de lo acordado por causas nuestras, el precio no sube. Sin letra pequeña.',
  },
  {
    icono: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    titulo: 'Revisiones incluidas',
    descripcion:
      'Durante el proceso incluimos rondas de revisión en diseño y desarrollo. Tu aprobación avanza cada fase: nunca trabajamos en el vacío.',
  },
  {
    icono: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    titulo: 'Código 100% tuyo',
    descripcion:
      'Al entregar el proyecto, todo el código fuente, la base de datos y el acceso a servidores son tuyos. Sin cláusulas de dependencia con nosotros.',
  },
];

export function Garantia() {
  return (
    <section className="py-24 md:py-32 bg-background" aria-labelledby="garantia-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-primary">SIN RIESGOS</span>
            <h2 id="garantia-heading" className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Inviertes con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                total seguridad
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sabemos que contratar desarrollo web es una inversión importante, especialmente para una PYME o autónomo. Por eso eliminamos el riesgo desde el primer día.
            </p>
            <p className="text-muted-foreground mb-8">
              Presupuesto cerrado, garantías por escrito y código que es tuyo desde el primer momento. Así de simple.
            </p>
            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Solicitar presupuesto sin compromiso
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Cards de garantías */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {garantias.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-primary mb-3">{item.icono}</div>
                <h3 className="font-semibold mb-2">{item.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
