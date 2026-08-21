import { useInView } from 'react-intersection-observer';

import Navbar from "@/components/Navbar";
import HeroOutremer from "@/components/HeroOutremer";
import Hero from "@/components/sections/index/Hero";
import About from "@/components/sections/index/About";
import Footer from "@/components/sections/index/Footer";
import { GridPattern } from "@/components/GridPattern";

export default function Home() {

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <Navbar />
      <HeroOutremer scene="tours" />
      <main className="relative min-h-screen overflow-x-hidden px-6">
        <GridPattern
          width={50}
          height={50}
          x={-1}
          y={-1}
          className='z-[-5]'
        />
        <Hero inView={inView} descRef={ref} />
        <About />
        <Footer />
      </main>
    </>
  );
}
