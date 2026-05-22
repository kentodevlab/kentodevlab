'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const planes = [
  {
    nombre: 'Web Corporativa',
    desde: '1.500€',
    descripcion: 'Para autónomos y pequeñas empresas que necesitan presencia digital profesional que transmita confianza y genere contactos.',
    incluye: [
      'Diseño personalizado (no plantillas)',
      'Hasta 6 páginas o secciones',
      'Formulario de contacto',
      'SEO técnico de base',
      'Adaptación a móvil y tablet',
      'Velocidad optimizada (Core Web Vitals)',
      '30 días de garantía post-lanzamiento',
      'Sesión de formación incluida',
    ],
    plazo: '2–3 semanas',
    destacado: false,
    cta: 'Solicitar presupuesto',
  },
  {
    nombre: 'Tienda Online',
    desde: '3.500€',
    descripcion: 'Para comercios y PYMES que quieren vender online con una tienda profesional, segura y fácil de gestionar.',
    incluye: [
      'Todo lo de Web Corporativa',
      'Catálogo de productos ilimitado',
      'Pasarela de pago (Stripe / PayPal)',
      'Gestión de pedidos e inventario',
      'Panel de administración intuitivo',
      'Recuperación de carrito abandonado',
      'Integración con facturación',
      'Soporte prioritario 3 meses',
    ],
    plazo: '3–5 semanas',
    destacado: true,
    cta: 'Solicitar presupuesto',
  },
  {
    nombre: 'SaaS / WebApp',
    desde: '8.000€',
    descripcion: 'Para proyectos con lógica de negocio compleja: autenticación, roles de usuario, dashboards, APIs e integraciones.',
    incluye: [
      'Todo lo de Tienda Online',
      'Autenticación y gestión de usuarios',
      'Dashboard y panel de administración',
      'APIs REST o GraphQL',
      'Base de datos escalable',
      'Arquitectura preparada para crecer',
      'Tests automatizados',
      'Soporte prioritario 6 meses',
    ],
    plazo: '6–12 semanas',
    destacado: false,
    cta: 'Hablemos de tu proyecto',
  },
];

export function Precios() {
  return (
    <section id="precios" className="py-24 md:py-32 bg-muted/30" aria-labelledby="precios-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-sm font-mono text-primary">PRECIOS</span>
          <h2 id="precios-heading" className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Inversión clara desde el primer día
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Presupuesto cerrado antes de empezar. Sin sorpresas, sin costes ocultos.
            Estos son los rangos orientativos — tu presupuesto exacto depende del alcance.
          </p>
        </motion.div>

        {/* Aviso de precio cerrado */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-12"
        >
          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Todos los proyectos incluyen 30 días de garantía post-lanzamiento
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {planes.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.destacado
                  ? 'bg-card border-primary shadow-xl shadow-primary/10 scale-[1.02]'
                  : 'bg-card border-border'
              }`}
            >
              {plan.destacado && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                  <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.nombre}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-sm text-muted-foreground">Desde</span>
                  <span className="text-4xl font-bold text-primary">{plan.desde}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.descripcion}</p>
              </div>

              {/* Plazo */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Entrega en <strong className="text-foreground">{plan.plazo}</strong>
              </div>

              {/* Lista de lo incluido */}
              <ul className="space-y-2.5 mb-8 flex-1" aria-label={`Qué incluye ${plan.nombre}`}>
                {plan.incluye.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="#contacto"
                className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-medium text-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  plan.destacado
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted border border-border hover:border-primary hover:bg-muted/80'
                }`}
                aria-label={`${plan.cta} para ${plan.nombre}`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Nota de personalización */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          ¿Tu proyecto no encaja exactamente en ningún plan?{' '}
          <Link
            href="#contacto"
            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Cuéntanos qué necesitas
          </Link>{' '}
          y te hacemos un presupuesto a medida.
        </motion.p>
      </div>
    </section>
  );
}
