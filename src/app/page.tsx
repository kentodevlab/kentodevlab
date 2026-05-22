import { getHero, getEstadisticas, getServicios, getProyectos, getTestimonios, getRedesSociales } from '@/lib/content';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Servicios } from '@/components/sections/Servicios';
import { Portfolio } from '@/components/sections/Portfolio';
import { Contacto } from '@/components/sections/Contacto';
import { Footer } from '@/components/sections/Footer';
import { CookieBanner } from '@/components/sections/CookieBanner';

export default async function Home() {
  const [hero, estadisticas, servicios, proyectos, testimonios, redes] = await Promise.all([
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
        <Hero hero={hero} estadisticas={estadisticas} />
        <Servicios servicios={servicios} />
        <Portfolio proyectos={proyectos} testimonios={testimonios} />
        <Contacto />
      </main>
      <Footer redes={redes} />
      <CookieBanner />
    </>
  );
}