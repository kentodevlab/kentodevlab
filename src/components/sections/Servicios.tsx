'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Servicio } from '@/types/content';

interface ServiciosProps {
  servicios?: Servicio[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Servicios({ servicios = [] }: ServiciosProps) {
  const services = servicios.length > 0 ? servicios : [
    {
      titulo: 'Desarrollo Web',
      descripcion: 'Páginas web institucionales, landing pages y sitios corporativos diseñados para convertir.',
      icono: '🌐',
      caracteristicas: ['Diseño responsive', 'SEO optimizado', 'CMS fácil de usar'],
      col_span: 'md:col-span-2',
    },
    {
      titulo: 'SaaS & WebApps',
      descripcion: 'Aplicaciones web personalizadas con autenticación, dashboards y funcionalidades avanzadas.',
      icono: '⚡',
      caracteristicas: ['Auth robusta', 'Dashboard admin', 'APIs REST/GraphQL'],
      col_span: 'md:col-span-1',
    },
    {
      titulo: 'E-commerce',
      descripcion: 'Tiendas online con pasarela de pagos, inventario y gestión de pedidos integrada.',
      icono: '🛒',
      caracteristicas: ['Stripe / PayPal', 'Inventario', 'Reportes'],
      col_span: 'md:col-span-1',
    },
    {
      titulo: 'Mantenimiento',
      descripcion: 'Soporte continuo, actualizaciones de seguridad y mejoras mensuales.',
      icono: '🔧',
      caracteristicas: ['Actualizaciones', 'Seguridad 24/7', 'Soporte prioritario'],
      col_span: 'md:col-span-2',
    },
  ];

  return (
    <section id="servicios" className="py-24 md:py-32 bg-background" aria-labelledby="servicios-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary">SERVICIOS</span>
          <h2 id="servicios-heading" className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            ¿Qué podemos hacer por ti?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Ofrecemos soluciones digitales completas para tu negocio.
            Desde una página corporativa hasta aplicaciones complejas.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${service.col_span} group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col`}
            >
              {/* Gradiente decorativo en hover */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                aria-hidden="true"
              />
              <div className="relative flex flex-col flex-1">
                <span className="text-4xl mb-4 block" role="img" aria-label={service.titulo}>
                  {service.icono}
                </span>
                <h3 className="text-xl font-bold mb-2">{service.titulo}</h3>
                <p className="text-muted-foreground mb-4 flex-1">{service.descripcion}</p>
                <ul className="space-y-2 mb-6" aria-label={`Características de ${service.titulo}`}>
                  {(service.caracteristicas || []).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg
                        className="w-4 h-4 text-primary flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm group-hover:translate-x-0.5"
                  aria-label={`Solicitar presupuesto para ${service.titulo}`}
                >
                  Solicitar presupuesto
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
