'use client';

import { motion } from 'framer-motion';
import type { Proyecto, Testimonio } from '@/types/content';

interface PortfolioProps {
  proyectos?: Proyecto[];
  testimonios?: Testimonio[];
}

export function Portfolio({ proyectos = [], testimonios = [] }: PortfolioProps) {
  const projects = proyectos.length > 0 ? proyectos : [
    { titulo: 'Tienda Online', categoria: 'E-commerce', descripcion: 'Tienda de productos artesanales con inventario y pasarela de pagos.', imagen: '🛍️' },
    { titulo: 'Dashboard SaaS', categoria: 'WebApp', descripcion: 'Panel de gestión para autónomos con estadísticas y reportes.', imagen: '📊' },
    { titulo: 'Landing Medical', categoria: 'Web', descripcion: 'Página web para clínica dental con reservas online.', imagen: '🏥' },
    { titulo: 'App Restaurant', categoria: 'WebApp', descripcion: 'Sistema de pedidos online para restaurante.', imagen: '🍽️' },
  ];

  const testimonials = testimonios.length > 0 ? testimonios : [
    { nombre: 'María García', empresa: 'Artesanaly', mensaje: 'Tenía una idea clara y ellos la convirtieron en realidad. El proceso fue súper claro y el resultado mejor de lo que esperaba.', rating: 5 },
    { nombre: 'Carlos López', empresa: 'Clínica Dental Madrid', mensaje: 'Nos montaron una web profesional en 3 semanas. Los pacientes reservan online y todo funciona solo.', rating: 5 },
    { nombre: 'Ana Martínez', empresa: 'Bar Central', mensaje: 'El nuevo sistema de pedidos fue un éxito. Ahora todo funciona solo y mis empleados pueden pedir desde casa.', rating: 5 },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary">PORTFOLIO</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Proyectos recientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Algunos de los proyectos que hemos construido para nuestros clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-card border border-border flex flex-col"
            >
              <div className="aspect-video flex items-center justify-center bg-muted/50 overflow-hidden">
                {project.imagen?.startsWith('http') ? (
                  <img src={project.imagen} alt={project.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <span className="text-4xl opacity-40">{project.imagen || '🖼️'}</span>
                )}
              </div>
              <div className="p-5 flex flex-col gap-1">
                {project.categoria && <span className="text-xs font-mono text-primary">{project.categoria}</span>}
                <h3 className="font-semibold">{project.titulo}</h3>
                {project.descripcion && <p className="text-sm text-muted-foreground line-clamp-2">{project.descripcion}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold">Lo que dicen nuestros clientes</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {testimonial.mensaje && <p className="text-muted-foreground mb-4">&ldquo;{testimonial.mensaje}&rdquo;</p>}
              <div className="flex items-center gap-3">
                {testimonial.avatar?.startsWith('http') ? (
                  <img src={testimonial.avatar} alt={testimonial.nombre} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">{testimonial.nombre.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <div className="font-semibold">{testimonial.nombre}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.empresa}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
