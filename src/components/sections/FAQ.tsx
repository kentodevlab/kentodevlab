'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    pregunta: '¿Cuánto cuesta una página web?',
    respuesta:
      'Depende del proyecto. Una landing page o web corporativa parte desde 1.500€. Una tienda online completa desde 3.500€. Un SaaS o WebApp personalizada desde 8.000€. Siempre te enviamos un presupuesto cerrado antes de empezar: sin sorpresas ni costes ocultos.',
  },
  {
    pregunta: '¿Cuánto tiempo tarda en estar lista?',
    respuesta:
      'Una web corporativa o landing page: 2–3 semanas. Una tienda online: 3–5 semanas. Un SaaS o WebApp: 6–12 semanas según complejidad. En todos los casos te damos una fecha de entrega en el presupuesto y la cumplimos. Si tardamos más por causas nuestras, el coste no aumenta.',
  },
  {
    pregunta: '¿El precio puede cambiar durante el proyecto?',
    respuesta:
      'No. Trabajamos con presupuesto cerrado. Lo que firmamos es lo que pagas. Si durante el proyecto quieres añadir funcionalidades nuevas (fuera del alcance inicial), te presupuestamos el extra y decides si seguir adelante. Nada cambia sin tu aprobación.',
  },
  {
    pregunta: '¿Qué pasa si hay errores después del lanzamiento?',
    respuesta:
      'Todos nuestros proyectos incluyen 30 días de garantía post-lanzamiento sin coste. Si algo falla por un problema de nuestro desarrollo lo corregimos de inmediato. Además ofrecemos planes de mantenimiento mensual para quien quiera soporte continuo.',
  },
  {
    pregunta: '¿Podré gestionar el contenido yo mismo?',
    respuesta:
      'Sí. Implementamos paneles de administración sencillos para que puedas editar textos, imágenes, productos o entradas sin tocar código. También te formamos: al entregar el proyecto te hacemos una sesión de onboarding y te dejamos guías en vídeo.',
  },
  {
    pregunta: '¿Incluís hosting, dominio y SSL?',
    respuesta:
      'El dominio lo gestionas tú (te indicamos dónde comprarlo). El hosting y certificado SSL los configuramos nosotros durante el lanzamiento. Si contratas mantenimiento mensual, el hosting está incluido en el precio. Si no, te dejamos todo preparado para que lo gestiones en tu cuenta.',
  },
  {
    pregunta: '¿Trabajáis con clientes fuera de Madrid?',
    respuesta:
      'Sí. Tenemos clientes en toda España. Todas las reuniones se pueden hacer por videollamada. La reunión inicial de descubrimiento la hacemos presencial en Madrid si estás cerca, o en remoto si no.',
  },
  {
    pregunta: '¿Qué tecnologías utilizáis?',
    respuesta:
      'Next.js, React y TypeScript para el frontend. Node.js, PostgreSQL y Supabase para el backend. Stripe para pagos. Vercel para despliegue con 99,9% de uptime. Tecnologías modernas, estables y con comunidad amplia: tu web no depende de herramientas que desaparecen.',
  },
  {
    pregunta: '¿Ofrecéis SEO?',
    respuesta:
      'Sí, en todas las webs aplicamos SEO técnico de base: estructura semántica correcta, velocidad de carga optimizada, etiquetas meta, sitemap, schema.org y Core Web Vitals en verde. Para posicionamiento de contenido (SEO editorial) podemos orientarte o conectarte con especialistas.',
  },
  {
    pregunta: '¿En qué os diferenciáis de un freelancer o de una agencia grande?',
    respuesta:
      'De un freelancer: tenemos equipo (diseño + desarrollo + QA), procesos definidos y garantía. Si alguien cae enfermo, tu proyecto no se para. De una agencia grande: no eres "cliente pequeño" con nosotros. Cada proyecto lo llevamos de forma personalizada, con acceso directo a quien lo construye, sin intermediarios.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Schema JSON-LD para SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.respuesta,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-background" aria-labelledby="faq-heading">
      {/* Schema markup para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary">FAQ</span>
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Todo lo que necesitas saber antes de empezar. Si tienes alguna duda más,{' '}
            <a
              href="#contacto"
              className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              escríbenos
            </a>
            .
          </p>
        </motion.div>

        <dl className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <dt>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left font-medium hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span>{faq.pregunta}</span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 text-primary"
                    aria-hidden="true"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.span>
                </button>
              </dt>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.dd
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </motion.dd>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
