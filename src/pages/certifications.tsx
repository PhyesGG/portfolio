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
        <div className="mx-auto max-w-4xl">
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            <CertificationCard
              title="Introduction aux réseaux"
              issuer="Cisco Networking Academy (NetAcad)"
              note="Fondamentaux des réseaux : modèles OSI/TCP-IP, adressage IP, équipements et protocoles de base."
              badge="/trame/badge_cisco_netacad_real.png"
            />
            <CertificationCard
              title="Google AI Essentials"
              issuer="Google (Coursera)"
              note="Compréhension des principes fondamentaux de l'IA, rédaction de prompts efficaces et usage responsable des outils d'IA générative en contexte professionnel."
              badge="/trame/badge_google_ai_essentials.png"
              delay={0.05}
            />
            <CertificationCard
              title="Claude Certified Architect"
              issuer="Anthropic"
              note="Conception et développement d'applications de production avec Claude — Claude Code, Agent SDK, API et intégrations MCP."
              badge="/trame/badge_claude_certified_architect.png"
              delay={0.1}
            />
            <CertificationCard
              title="GitHub Foundations"
              issuer="GitHub"
              note="Bases de Git et GitHub : dépôts, commits, branches, collaboration, gestion de projet et sécurité de base."
              badge="/trame/badge_github_foundations.png"
              delay={0.15}
            />
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
