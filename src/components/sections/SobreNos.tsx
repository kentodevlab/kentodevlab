'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const values = [
  {
    titulo: 'Precio cerrado, sin sorpresas',
    descripcion: 'El presupuesto que firmamos es el que pagas. Punto. Si tardamos más por causas nuestras, el precio no sube.',
    icono: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    titulo: 'Construido para crecer',
    descripcion: 'Lo que entregamos funciona hoy y escala mañana. No te venderemos una web que habrá que tirar en 2 años.',
    icono: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    titulo: 'Hablas con quien lo construye',
    descripcion: 'Sin intermediarios, sin cuentas de proyecto que trasladan mensajes. Acceso directo al equipo técnico.',
    icono: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export function SobreNos() {
  return (
    <section id="sobre-nosotros" className="py-24 md:py-32 bg-muted/30" aria-labelledby="sobre-nosotros-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Columna de texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-primary">SOBRE NOSOTROS</span>
            <h2 id="sobre-nosotros-heading" className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Desarrolladores que{' '}
              <span className="text-primary">hablamos tu idioma</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              En Kento DevLab somos desarrolladores y diseñadores especializados en PYMEs, comercios y autónomos de Madrid. Sabemos que no tienes presupuesto ilimitado ni tiempo para tecnicismos.
            </p>
            <p className="text-muted-foreground mb-8">
              Nos enfocamos en proyectos donde una web o aplicación bien hecha cambia realmente la marcha del negocio — no en contratos de enterprise donde somos un proveedor más.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="text-primary flex-shrink-0 mt-0.5">{value.icono}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{value.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{value.descripcion}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Cuéntanos tu proyecto
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Columna de estadísticas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-3xl opacity-20" aria-hidden="true" />
            <div className="relative p-8 rounded-2xl bg-card border border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-5 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Proyectos entregados</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Precio cerrado siempre</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-1">24h</div>
                  <div className="text-sm text-muted-foreground">Respuesta garantizada</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-1">30d</div>
                  <div className="text-sm text-muted-foreground">Garantía post-lanzamiento</div>
                </div>
              </div>

              {/* Diferenciadores clave */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Por qué elegirnos
                </h3>
                {[
                  'No somos un freelancer que puede desaparecer',
                  'Equipo propio: diseño + desarrollo + QA',
                  'Especialistas en PYMEs, no en enterprise',
                  'Tu código siempre es tuyo, sin ataduras',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
