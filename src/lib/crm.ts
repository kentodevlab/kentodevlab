import type { HeroContent, Servicio, Proyecto, Testimonio } from '@/types/content';

type I18nField = { es?: string; en?: string } | string | null | undefined;

function t(field: I18nField, locale: string): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return (locale === 'en' ? field.en : field.es) ?? field.es ?? field.en ?? '';
}

interface CRMHero {
  id: string;
  title: I18nField;
  subtitle: I18nField;
  cta_label: I18nField;
  cta_url: string | null;
  bg_media_url: string | null;
  position: number;
}
interface CRMService {
  id: string; icon: string | null; title: I18nField; description: I18nField;
  price: string | null; slug: string; position: number;
}
interface CRMPortfolio {
  id: string; title: I18nField; client_name: string | null; description: I18nField;
  cover_url: string | null; tags: string[] | null; external_url: string | null;
  slug: string; position: number;
}
interface CRMTestimonial {
  id: string; author_name: string; author_role: I18nField;
  author_avatar_url: string | null; quote: I18nField; rating: number | null;
}
export interface CRMSnapshot {
  locale: string; header: Record<string, unknown>; footer: Record<string, unknown>;
  seo: Record<string, unknown>; theme: Record<string, unknown>;
  hero: CRMHero[]; services: CRMService[]; portfolio: CRMPortfolio[];
  testimonials: CRMTestimonial[]; faq: unknown[]; team: unknown[];
}

export async function fetchSnapshot(locale = 'es'): Promise<CRMSnapshot> {
  const base = (process.env.CRM_API_BASE_URL ?? 'https://crm.kentodevlab.com').replace(/\/$/, '');
  const res = await fetch(`${base}/api/public/landing/snapshot?locale=${locale}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`CRM snapshot failed: ${res.status}`);
  return res.json();
}

export function mapHero(heroes: CRMHero[], locale: string): HeroContent | null {
  const h = heroes[0];
  if (!h) return null;
  return { id: h.id, titulo: t(h.title, locale), subtitulo: t(h.subtitle, locale),
    descripcion: t(h.subtitle, locale), imagen: h.bg_media_url ?? undefined };
}
export function mapServicios(services: CRMService[], locale: string): Servicio[] {
  return services.map(s => ({ id: s.id, titulo: t(s.title, locale),
    descripcion: t(s.description, locale), icono: s.icon ?? '',
    caracteristicas: [], col_span: '1', orden: s.position, activo: true }));
}
export function mapProyectos(portfolio: CRMPortfolio[], locale: string): Proyecto[] {
  return portfolio.map(p => ({ id: p.id, titulo: t(p.title, locale),
    categoria: p.tags?.[0] ?? '', descripcion: t(p.description, locale),
    imagen: p.cover_url ?? '', orden: p.position, activo: true }));
}
export function mapTestimonios(testimonials: CRMTestimonial[], locale: string): Testimonio[] {
  return testimonials.map(item => ({ id: item.id, nombre: item.author_name,
    empresa: t(item.author_role, locale), mensaje: t(item.quote, locale),
    rating: item.rating ?? 5, avatar: item.author_avatar_url ?? undefined }));
}
