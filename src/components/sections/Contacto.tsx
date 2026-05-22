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
    errorMap: () => ({ message: 'Selecciona un servicio' }),
  }),
  budget: z.enum(['<1000', '1000-3000', '3000-5000', '5000-10000', '>10000'], {
    errorMap: () => ({ message: 'Selecciona un presupuesto' }),
  }),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const MESSAGE_MAX = 1000;

const serviceOptions = [
  { value: 'web', label: 'Desarrollo Web' },
  { value: 'saas', label: 'SaaS / WebApp' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'other', label: 'Otro' },
];

const budgetOptions = [
  { value: '<1000', label: 'Menos de 1.000€' },
  { value: '1000-3000', label: '1.000€ - 3.000€' },
  { value: '3000-5000', label: '3.000€ - 5.000€' },
  { value: '5000-10000', label: '5.000€ - 10.000€' },
  { value: '>10000', label: 'Más de 10.000€' },
];

/** Clases base reutilizables para los campos del formulario */
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
      service: undefined,
      budget: undefined,
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

      if (!res.ok) {
        throw new Error('Error al enviar');
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        'No hemos podido enviar tu mensaje. Comprueba tu conexión o escríbenos directamente a hola@kentodevlab.com'
      );
    }
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-primary">CONTACTO</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              ¿Hablamos de tu proyecto?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cuéntanos qué necesitas y te enviaremos una propuesta sin compromiso.
              Respondemos en menos de 24 horas.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-5.99-4h9.98l-3 6H6.01l-3-6h5.98zM5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Ubicación</div>
                  <div className="font-medium">Madrid, España</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Horario</div>
                  <div className="font-medium">Lun – Vie: 9:00 – 19:00</div>
                </div>
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
                /* Estado de éxito */
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
                  <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground mb-6">
                    Gracias por contactar con nosotros. Te responderemos en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                /* Formulario */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 rounded-2xl bg-card border border-border space-y-6"
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

                  {/* Teléfono + Empresa (opcionales) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                        Teléfono
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
                        Empresa
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
                      Servicio <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-service"
                      {...register('service')}
                      className={errors.service ? fieldErrorClass : fieldClass}
                      aria-required="true"
                      aria-describedby={errors.service ? 'contact-service-error' : undefined}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecciona un servicio…
                      </option>
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
                      Presupuesto <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-budget"
                      {...register('budget')}
                      className={errors.budget ? fieldErrorClass : fieldClass}
                      aria-required="true"
                      aria-describedby={errors.budget ? 'contact-budget-error' : undefined}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecciona un rango…
                      </option>
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

                  {/* Mensaje con contador de caracteres */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="contact-message" className="block text-sm font-medium">
                        Mensaje <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <span
                        className={`text-xs tabular-nums ${
                          messageValue.length > MESSAGE_MAX * 0.9
                            ? 'text-red-500'
                            : 'text-muted-foreground'
                        }`}
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
                      placeholder="Cuéntanos sobre tu proyecto…"
                      aria-required="true"
                      aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" role="alert" className="text-sm text-red-500 mt-1">
                        {errors.message.message}
                      </p>
                    ) : (
                      <p id="contact-message-hint" className="text-xs text-muted-foreground mt-1">
                        Mínimo 10 caracteres
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

                  {/* Botón de envío con spinner */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando…
                      </>
                    ) : (
                      'Enviar mensaje'
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al enviar este formulario, aceptas nuestra{' '}
                    <Link
                      href="/privacidad"
                      className="underline hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      política de privacidad
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
