'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type CookieCategory = {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
};

const defaultCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necesarias',
    description: 'Cookies técnicas necesarias para el funcionamiento del sitio. No requieren consentimiento.',
    required: true,
    enabled: true,
  },
  {
    id: 'analytics',
    name: 'Analíticas',
    description: 'Cookies que nos permiten analizar el uso de nuestro sitio web para mejorar la experiencia.',
    required: false,
    enabled: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Cookies utilizadas para mostrar publicidad relevante según tus intereses.',
    required: false,
    enabled: false,
  },
];

interface CookieBannerProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export function CookieBanner({ onAccept, onReject }: CookieBannerProps) {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<CookieCategory[]>(defaultCategories);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (!savedConsent) {
      // Pequeño delay para no bloquear el LCP
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Focus trap: mantener el foco dentro del diálogo mientras está abierto
  useEffect(() => {
    if (!show) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Dar foco al primer elemento enfocable
    firstFocusableRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      const focusableSelectors =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusableElements = Array.from(
        dialog!.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter((el) => !el.hasAttribute('disabled'));

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show, showSettings]);

  function saveConsent(updated: CookieCategory[]) {
    localStorage.setItem('cookie_consent', JSON.stringify(updated));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
  }

  function handleAcceptAll() {
    const updated = categories.map((c) => ({ ...c, enabled: true }));
    saveConsent(updated);
    setShow(false);
    onAccept?.();
  }

  function handleRejectAll() {
    const updated = categories.map((c) => ({ ...c, enabled: c.required }));
    saveConsent(updated);
    setShow(false);
    onReject?.();
  }

  function handleSaveSettings() {
    saveConsent(categories);
    setShow(false);
    setShowSettings(false);
  }

  const toggleCategory = useCallback((id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-desc"
      >
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.25 }}
          className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-xl"
        >
          {!showSettings ? (
            /* Vista principal */
            <>
              <div className="mb-5">
                <h2 id="cookie-banner-title" className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span aria-hidden="true">🍪</span> Uso de Cookies
                </h2>
                <p id="cookie-banner-desc" className="text-muted-foreground text-sm mb-2">
                  Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.
                  Puedes aceptar todas las cookies, rechazarlas o configurar tus preferencias.
                </p>
                <Link
                  href="/cookies"
                  className="text-primary text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  Ver Política de Cookies
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  ref={firstFocusableRef}
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Aceptar todas
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border font-medium hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border font-medium hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Configurar
                </button>
              </div>
            </>
          ) : (
            /* Vista de configuración */
            <>
              <div className="mb-5">
                <button
                  ref={firstFocusableRef}
                  onClick={() => setShowSettings(false)}
                  className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver
                </button>
                <h2 id="cookie-banner-title" className="text-xl font-bold mb-1">
                  Configurar Cookies
                </h2>
                <p id="cookie-banner-desc" className="text-muted-foreground text-sm">
                  Selecciona qué cookies quieres aceptar. Las cookies necesarias siempre están activas.
                </p>
              </div>

              <div className="space-y-3 mb-5">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 rounded-xl border border-border bg-muted/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm flex items-center gap-2">
                          {category.name}
                          {category.required && (
                            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                              Requerida
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {category.description}
                        </p>
                      </div>

                      {category.required ? (
                        <span className="text-xs text-muted-foreground whitespace-nowrap pt-0.5" aria-label="Siempre activa">
                          Activa
                        </span>
                      ) : (
                        <button
                          role="switch"
                          aria-checked={category.enabled}
                          aria-label={`${category.enabled ? 'Desactivar' : 'Activar'} cookies ${category.name.toLowerCase()}`}
                          onClick={() => toggleCategory(category.id)}
                          className={`relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-shrink-0 ${
                            category.enabled ? 'bg-primary' : 'bg-muted border border-border'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              category.enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveSettings}
                className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Guardar preferencias
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
