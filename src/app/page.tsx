import {
  getHero,
  getEstadisticas,
  getServicios,
  getProyectos,
  getTestimonios,
  getRedesSociales,
} from '@/lib/content';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Servicios } from '@/components/sections/Servicios';
import { SobreNos } from '@/components/sections/SobreNos';
import { Proceso } from '@/components/sections/Proceso';
import { Precios } from '@/components/sections/Precios';
import { Portfolio } from '@/components/sections/Portfolio';
import { Garantia } from '@/components/sections/Garantia';
import { FAQ } from '@/components/sections/FAQ';
import { Contacto } from '@/components/sections/Contacto';
import { Footer } from '@/components/sections/Footer';
import { CookieBanner } from '@/components/sections/CookieBanner';

export default async function Home() {
  const [hero, estadisticas, servicios, proyectos, testimonios, redes] =
    await Promise.all([
      getHero().catch(() => null),
      getEstadisticas().catch(() => []),
      getServicios().catch(() => []),
      getProyectos().catch(() => []),
      getTestimonios().catch(() => []),
      getRedesSociales().catch(() => []),
    ]);

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero — propuesta de valor + CTAs */}
        <Hero hero={hero} estadisticas={estadisticas} />

        {/* 2. Servicios — qué hacemos y para quién */}
        <Servicios servicios={servicios} />

        {/* 3. Sobre nosotros — quiénes somos y diferenciación */}
        <SobreNos />

        {/* 4. Proceso — cómo trabajamos paso a paso */}
        <Proceso />

        {/* 5. Precios — rangos orientativos con precio cerrado */}
        <Precios />

        {/* 6. Portfolio — proyectos con resultados + testimonios */}
        <Portfolio proyectos={proyectos} testimonios={testimonios} />

        {/* 7. Garantía — reversión de riesgo */}
        <Garantia />

        {/* 8. FAQ — responder objeciones y mejorar SEO */}
        <FAQ />

        {/* 9. Contacto — formulario + canales alternativos */}
        <Contacto />
      </main>
      <Footer redes={redes} />
      <CookieBanner />
    </>
  );
}
