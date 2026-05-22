'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Introduce un email válido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.enum(['web', 'saas', 'ecommerce', 'maintenance', 'other'], {
    error: 'Selecciona un servicio',
  }),
  budget: z.enum(['<1000', '1000-3000', '3000-5000', '5000-10000', '>10000'], {
    error: 'Selecciona un presupuesto',
  }),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const MESSAGE_MAX = 1000;

const serviceOptions = [
  { value: 'web', label: 'Web corporativa o landing page' },
  { value: 'ecommerce', label: 'Tienda online (E-commerce)' },
  { value: 'saas', label: 'SaaS / WebApp a medida' },
  { value: 'maintenance', label: 'Mantenimiento de web existente' },
  { value: 'other', label: 'Otro / No estoy seguro' },
];

const budgetOptions = [
  { value: '<1000', label: 'Menos de 1.000€' },
  { value: '1000-3000', label: '1.000€ – 3.000€' },
  { value: '3000-5000', label: '3.000€ – 5.000€' },
  { value: '5000-10000', label: '5.000€ – 10.000€' },
  { value: '>10000', label: 'Más de 10.000€' },
];

const fieldClass =
  'w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors';
const fieldErrorClass =
  'w-full px-4 py-3 rounded-xl bg-muted border border-red-500 focus:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 transition-colors';

export function Contacto() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'web' as const,
      budget: '<1000' as const,
      message: '',
    },
  });

  const messageValue = watch('message') ?? '';

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error al enviar');
      setIsSubmitted(true);
    } catch {
      setSubmitError(
        'No hemos podido enviar tu mensaje. Escríbenos directamente a hola@kentodevlab.com o por WhatsApp.'
      );
    }
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Columna de información */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-primary">CONTACTO</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              Hablemos de tu proyecto
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Cuéntanos qué necesitas y te enviamos un presupuesto cerrado sin compromiso.
            </p>
            <p className="text-muted-foreground mb-8">
              Respondemos en menos de 24h en días laborables. Para urgencias, escríbenos por WhatsApp.
            </p>

            {/* Canales de contacto */}
            <div className="space-y-4 mb-8">
              {/* WhatsApp */}
              <a
                href="https://wa.me/34600000000?text=Hola,%20me%20gustaría%20hablar%20sobre%20un%20proyecto%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 hover:border-green-500/60 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Contactar por WhatsApp (abre en nueva pestaña)"
              >
                <div className="w-11 h-11 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">WhatsApp</div>
                  <div className="font-medium text-green-600 dark:text-green-400">Respuesta inmediata</div>
                </div>
                <svg className="w-4 h-4 text-muted-foreground ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a
                    href="mailto:hola@kentodevlab.com"
                    className="font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    hola@kentodevlab.com
                  </a>
                </div>
              </div>

              {/* Ubicación */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Ubicación</div>
                  <div className="font-medium">Madrid, España · También en remoto</div>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Horario</div>
                  <div className="font-medium">Lun – Vie: 9:00 – 19:00</div>
                </div>
              </div>
            </div>

            {/* Garantía de respuesta */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Sin compromiso.</strong> Recibimos tu consulta, la analizamos y te enviamos una propuesta personalizada. No hay ventas agresivas ni llamadas no solicitadas.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-8 rounded-2xl bg-card border border-border text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">¡Mensaje recibido!</h3>
                  <p className="text-muted-foreground mb-6">
                    Te responderemos en menos de 24h con una propuesta personalizada.
                    Si tienes urgencia, escríbenos por WhatsApp.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 rounded-2xl bg-card border border-border space-y-5"
                  noValidate
                  aria-label="Formulario de contacto"
                >
                  {/* Nombre + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                        Nombre <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        {...register('name')}
                        className={errors.name ? fieldErrorClass : fieldClass}
                        placeholder="Tu nombre"
                        autoComplete="name"
                        aria-required="true"
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="contact-name-error" role="alert" className="text-sm text-red-500 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        {...register('email')}
                        type="email"
                        className={errors.email ? fieldErrorClass : fieldClass}
                        placeholder="tu@email.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className="text-sm text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Teléfono + Empresa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                        Teléfono <span className="text-xs text-muted-foreground font-normal">(opcional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        {...register('phone')}
                        type="tel"
                        className={fieldClass}
                        placeholder="+34 600 000 000"
                        autoComplete="tel"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-medium mb-2">
                        Empresa <span className="text-xs text-muted-foreground font-normal">(opcional)</span>
                      </label>
                      <input
                        id="contact-company"
                        {...register('company')}
                        className={fieldClass}
                        placeholder="Nombre de tu empresa"
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  {/* Servicio */}
                  <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium mb-2">
                      ¿Qué necesitas? <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-service"
                      {...register('service')}
                      className={errors.service ? fieldErrorClass : fieldClass}
                      aria-required="true"
                      aria-describedby={errors.service ? 'contact-service-error' : undefined}
                    >
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="contact-service-error" role="alert" className="text-sm text-red-500 mt-1">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  {/* Presupuesto */}
                  <div>
                    <label htmlFor="contact-budget" className="block text-sm font-medium mb-2">
                      Presupuesto aproximado <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-budget"
                      {...register('budget')}
                      className={errors.budget ? fieldErrorClass : fieldClass}
                      aria-required="true"
                      aria-describedby={errors.budget ? 'contact-budget-error' : undefined}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p id="contact-budget-error" role="alert" className="text-sm text-red-500 mt-1">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>

                  {/* Mensaje con contador */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="contact-message" className="block text-sm font-medium">
                        Cuéntanos tu proyecto <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <span
                        className={`text-xs tabular-nums ${messageValue.length > MESSAGE_MAX * 0.9 ? 'text-red-500' : 'text-muted-foreground'}`}
                        aria-live="polite"
                        aria-label={`${messageValue.length} de ${MESSAGE_MAX} caracteres`}
                      >
                        {messageValue.length}/{MESSAGE_MAX}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      {...register('message')}
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      className={errors.message ? fieldErrorClass : `${fieldClass} resize-none`}
                      placeholder="¿Qué tienes ahora? ¿Qué quieres conseguir? ¿Tienes algún referente en mente? Cuanto más nos cuentes, mejor podremos ayudarte."
                      aria-required="true"
                      aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" role="alert" className="text-sm text-red-500 mt-1">
                        {errors.message.message}
                      </p>
                    ) : (
                      <p id="contact-message-hint" className="text-xs text-muted-foreground mt-1">
                        Mínimo 10 caracteres. No hay respuestas incorrectas.
                      </p>
                    )}
                  </div>

                  {/* Error de envío */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        role="alert"
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-500"
                      >
                        {submitError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando…
                      </>
                    ) : (
                      'Pedir presupuesto gratis'
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Sin compromiso · Sin spam · Respondemos en &lt;24h ·{' '}
                    <Link
                      href="/privacidad"
                      className="underline hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      Política de privacidad
                    </Link>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
