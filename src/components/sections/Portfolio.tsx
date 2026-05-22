'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Proyecto, Testimonio } from '@/types/content';

interface PortfolioProps {
  proyectos?: Proyecto[];
  testimonios?: Testimonio[];
}

export function Portfolio({ proyectos = [], testimonios = [] }: PortfolioProps) {
  const projects = proyectos.length > 0 ? proyectos : [
    {
      titulo: 'Artesanaly — Tienda Online',
      categoria: 'E-commerce',
      descripcion: 'Tienda de productos artesanales. Pasarela de pago, gestión de stock y pedidos. Resultado: el 60% de ventas pasó a ser online en el primer trimestre.',
      imagen: '🛍️',
    },
    {
      titulo: 'GestiónPro — Dashboard SaaS',
      categoria: 'WebApp',
      descripcion: 'Panel de gestión para autónomos con facturación, clientes y estadísticas. Lanzado en 6 semanas. 300+ usuarios activos en el primer mes.',
      imagen: '📊',
    },
    {
      titulo: 'Clínica Dental Madrid',
      categoria: 'Web + Reservas',
      descripcion: 'Web corporativa con reserva de citas online. Redujo llamadas de teléfono para reservas en un 70% y llenó la agenda de nuevos pacientes.',
      imagen: '🏥',
    },
    {
      titulo: 'Bar Central — Pedidos Online',
      categoria: 'WebApp',
      descripcion: 'Sistema de pedidos para restaurante. Eliminó errores en comandas, redujo tiempos de espera y aumentó el ticket medio un 18%.',
      imagen: '🍽️',
    },
  ];

  const testimonials = testimonios.length > 0 ? testimonios : [
    {
      nombre: 'María García',
      empresa: 'Artesanaly',
      mensaje: 'Tenía miedo de tirar el dinero como me pasó con otro desarrollador. Con Kento fue todo lo contrario: precio cerrado desde el principio, entregaron en el plazo y ahora el 60% de mis ventas son online.',
      rating: 5,
    },
    {
      nombre: 'Carlos López',
      empresa: 'Clínica Dental Madrid',
      mensaje: 'En 3 semanas teníamos la web con reservas online funcionando. Las llamadas para citas bajaron un 70% y conseguimos 40 pacientes nuevos el primer mes. La inversión se recuperó en 6 semanas.',
      rating: 5,
    },
    {
      nombre: 'Ana Martínez',
      empresa: 'Bar Central',
      mensaje: 'Siempre dije que los sistemas digitales no eran para un bar. Me equivocaba. Los pedidos online eliminaron los errores en comandas y subimos el ticket medio. Ahora no me imagino sin él.',
      rating: 5,
    },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-muted/30" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary">PORTFOLIO</span>
          <h2 id="portfolio-heading" className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Proyectos que generan resultados
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No mostramos webs bonitas. Mostramos negocios que crecieron.
          </p>
        </motion.div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-card border border-border flex flex-col hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Imagen o emoji del proyecto */}
              <div className="aspect-video flex items-center justify-center bg-muted/50 overflow-hidden relative">
                {project.imagen?.startsWith('http') ? (
                  <Image
                    src={project.imagen}
                    alt={`Captura del proyecto ${project.titulo}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <span
                    className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-300"
                    role="img"
                    aria-label={project.titulo}
                  >
                    {project.imagen || '🖼️'}
                  </span>
                )}
              </div>

              {/* Info del proyecto */}
              <div className="p-5 flex flex-col gap-1.5 flex-1">
                {project.categoria && (
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    {project.categoria}
                  </span>
                )}
                <h3 className="font-semibold text-base">{project.titulo}</h3>
                {project.descripcion && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-0.5">
                    {project.descripcion}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Testimonios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Lo que dicen nuestros clientes
          </h3>
          <p className="text-muted-foreground">
            Sin guiones. Sus palabras, sus números.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border flex flex-col"
            >
              {/* Estrellas */}
              <div className="flex gap-1 mb-4" aria-label={`Valoración: ${testimonial.rating ?? 5} de 5 estrellas`}>
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Cita */}
              {testimonial.mensaje && (
                <blockquote className="text-muted-foreground mb-4 flex-1 leading-relaxed">
                  &ldquo;{testimonial.mensaje}&rdquo;
                </blockquote>
              )}

              {/* Autor */}
              <figcaption className="flex items-center gap-3">
                {testimonial.avatar?.startsWith('http') ? (
                  <Image
                    src={testimonial.avatar}
                    alt={`Foto de ${testimonial.nombre}`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.nombre.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-sm">{testimonial.nombre}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.empresa}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* CTA después de los testimonios */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            ¿Quieres resultados así para tu negocio?
          </p>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Cuéntanos tu proyecto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
