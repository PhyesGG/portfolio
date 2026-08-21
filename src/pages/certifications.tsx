import Navbar from "@/components/Navbar";
import HeroOutremer from "@/components/HeroOutremer";
import Footer from "@/components/sections/index/Footer";
import CertificationCard from "@/components/CertificationCard";

export default function Certifications() {
  return (
    <>
      <Navbar />
      <HeroOutremer
        scene="lampadaire"
        title="Certifications"
      />
      <main className="relative min-h-screen overflow-x-hidden px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <ul className="mt-12 flex flex-col gap-4">
            <CertificationCard
              title="Introduction aux réseaux"
              issuer="Cisco Networking Academy (NetAcad)"
              note="Fondamentaux des réseaux : modèles OSI/TCP-IP, adressage IP, équipements et protocoles de base."
              badge="/trame/badge_cisco_netacad_real.png"
            />
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
