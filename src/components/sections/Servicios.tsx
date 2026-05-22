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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Servicios({ servicios = [] }: ServiciosProps) {
  const services = servicios.length > 0 ? servicios : [
    {
      titulo: 'Web Corporativa',
      descripcion: 'Tu escaparate online 24/7. Convierte visitas en llamadas, visitas a tu tienda y formularios de contacto — aunque estés durmiendo.',
      icono: '🌐',
      caracteristicas: [
        'Diseño único, no plantillas genéricas',
        'Posicionamiento en Google (SEO técnico)',
        'Actualiza el contenido tú mismo, sin ayuda',
      ],
      col_span: 'md:col-span-2',
      desde: 'Desde 1.500€',
    },
    {
      titulo: 'Tienda Online',
      descripcion: 'Vende mientras duermes. Crea tu catálogo, cobra con tarjeta o PayPal y gestiona pedidos desde el móvil.',
      icono: '🛒',
      caracteristicas: [
        'Cobra con Stripe o PayPal desde el día 1',
        'Stock, pedidos y facturas en un solo lugar',
        'Diseñada para comprar desde el móvil',
      ],
      col_span: 'md:col-span-1',
      desde: 'Desde 3.500€',
    },
    {
      titulo: 'SaaS & Aplicaciones',
      descripcion: 'Tu negocio tiene procesos únicos. Construimos la herramienta exacta que necesitas: sin pagar por funciones que no usas.',
      icono: '⚡',
      caracteristicas: [
        'Acceso por usuarios y roles a medida',
        'Panel de administración desde el móvil',
        'Integración con tus sistemas actuales',
      ],
      col_span: 'md:col-span-1',
      desde: 'Desde 8.000€',
    },
    {
      titulo: 'Mantenimiento & Soporte',
      descripcion: 'Tu web siempre funcionando. Nosotros nos encargamos de servidores, actualizaciones y seguridad. Tú, de tu negocio.',
      icono: '🔧',
      caracteristicas: [
        'Actualizaciones de seguridad automáticas',
        'Copias de seguridad diarias',
        'Soporte prioritario con respuesta en 4h',
      ],
      col_span: 'md:col-span-2',
      desde: 'Desde 99€/mes',
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
            ¿Qué necesitas?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Somos especialistas en autónomos, comercios y PYMEs. Sin presupuestos de enterprise,
            sin tecnicismos. Solo resultados.
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
                {/* Icono + precio orientativo */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl" role="img" aria-label={service.titulo}>
                    {service.icono}
                  </span>
                  {service.desde && (
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {service.desde}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{service.titulo}</h3>
                <p className="text-muted-foreground mb-4 flex-1">{service.descripcion}</p>

                {/* Features orientadas a beneficios */}
                <ul className="space-y-2 mb-6" aria-label={`Qué incluye ${service.titulo}`}>
                  {(service.caracteristicas || []).map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg
                        className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
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
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  aria-label={`Pedir presupuesto para ${service.titulo}`}
                >
                  Pedir presupuesto gratis
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
