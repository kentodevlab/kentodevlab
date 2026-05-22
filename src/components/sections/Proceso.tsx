'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Reunión de descubrimiento',
    description:
      'Presencial en Madrid o por videollamada. Escuchamos tu negocio, tus objetivos y tu público. Sin formularios estándar — queremos entender tu caso concreto.',
    duration: '1–2 días',
    detalle: 'Gratuita y sin compromiso',
  },
  {
    number: '02',
    title: 'Propuesta y precio cerrado',
    description:
      'Te enviamos una propuesta detallada: qué incluye, qué no incluye, fecha de entrega y precio final. Sin letra pequeña, sin "ya veremos". Decides con toda la información.',
    duration: '2–3 días',
    detalle: 'Precio fijo garantizado',
  },
  {
    number: '03',
    title: 'Desarrollo con actualizaciones',
    description:
      'Trabajamos en sprints. Cada semana recibes una actualización del estado y acceso a un entorno de preview para revisar el progreso. Nada sorprende al final.',
    duration: '2–10 semanas',
    detalle: 'Actualizaciones semanales',
  },
  {
    number: '04',
    title: 'Lanzamiento y onboarding',
    description:
      'Publicamos el proyecto, configuramos analytics y te enseñamos a gestionar el contenido. Incluye 30 días de garantía: si algo falla por nuestra parte, lo corregimos gratis.',
    duration: '1 día',
    detalle: '30 días de garantía incluidos',
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="py-24 md:py-32 bg-background" aria-labelledby="proceso-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary">PROCESO</span>
          <h2 id="proceso-heading" className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Cómo trabajamos juntos
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Proceso claro de principio a fin. Sabes exactamente qué pasa, cuándo y cuánto cuesta — antes de firmar nada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Línea conectora entre pasos (solo desktop) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border group-hover:bg-primary/50 transition-colors"
                  aria-hidden="true"
                />
              )}

              <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                {/* Número + duración */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl font-bold text-muted/30 group-hover:text-primary/30 transition-colors" aria-hidden="true">
                    {step.number}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded-full bg-muted">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 mb-4">{step.description}</p>

                {/* Detalle de garantía o promesa por paso */}
                <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {step.detalle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
