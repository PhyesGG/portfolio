import Navbar from "@/components/Navbar";
import HeroOutremer from "@/components/HeroOutremer";
import Footer from "@/components/sections/index/Footer";
import ProjectTile from "@/components/ProjectTile";

const PUBLIC_PROJECTS = [
  {
    title: "AGC-BOT",
    description: "Bot Discord d'alertes en direct sur les mises en ligne Twitch.",
    tags: ["Python", "Discord.py", "API"],
    url: "https://github.com/PhyesGG/AGC-BOT",
  },
  {
    title: "LKL-BOT",
    description: "Bot Discord de gestion de tickets de support.",
    tags: ["Python", "Discord.py"],
    url: "https://github.com/PhyesGG/LKL-BOT",
  },
  {
    title: "BeatsClash",
    description: "Battles musicales entre amis — qui a vraiment le meilleur goût ?",
    tags: ["TypeScript"],
    url: "https://github.com/PhyesGG/BeatsClash",
  },
  {
    title: "NixConfig",
    description: "Configuration déclarative de mes machines personnelles.",
    tags: ["Nix"],
    url: "https://github.com/PhyesGG/NixConfig",
  },
  {
    title: "page-change-monitor",
    description: "Surveille une page web et notifie au moindre changement détecté.",
    tags: ["Python"],
    url: "https://github.com/PhyesGG/page-change-monitor",
  },
  {
    title: "discord-rss-notifier",
    description: "Poste les nouveaux items d'un flux RSS dans un salon Discord, sans doublons.",
    tags: ["Python"],
    url: "https://github.com/PhyesGG/discord-rss-notifier",
  },
  {
    title: "books-scraper-demo",
    description: "Scraper respectueux des serveurs (rate-limit), export CSV.",
    tags: ["Python", "Scraping"],
    url: "https://github.com/PhyesGG/books-scraper-demo",
  },
];

// Deployes en production mais non publics (auto-heberges / usage interne) —
// decrits avec mes propres mots, tires de mon profil freelance.
const PROD_PROJECTS = [
  {
    title: "RFT Discord Bot",
    description:
      "Bot Discord prive de veille multi-sources, notifications enrichies traduites en francais.",
    detail: [
      "Bot Discord RFT (prive) : un bot Discord de surveillance et de suivi multi-sources, concu pour centraliser automatiquement des informations esport, juridiques et financieres.",
      "Detecte les nouveaux elements toutes les 30 minutes et envoie des notifications Discord enrichies, traduites et resumees en francais via un LLM heberge en local.",
      "Des compteurs de caracteres permettent de verifier qu'un texte respecte une longueur minimale requise.",
    ],
    tags: ["Python", "Discord.py", "LLM local"],
    logo: "https://rft.gg/images/default-og.png",
  },
  {
    title: "Discord — veille automatisee",
    description:
      "Bot de suivi d'actualites surveillant 20 sources en continu, y compris des sites rendus en JavaScript via Playwright.",
    tags: ["Python", "Playwright", "Self-hosted"],
  },
  {
    title: "Discord — moderation",
    description:
      "Bot de moderation avec actions automatisees, tourne en production 24/7 sur mon serveur Linux personnel.",
    tags: ["Python", "Discord.py"],
  },
  {
    title: "Assistant documentaire IA",
    description:
      "Outil de requete sur documents internes par IA generative, heberge en local, deploye pour l'equipe informatique de mon universite.",
    tags: ["Python", "RAG", "Ollama"],
  },
];

export default function Projets() {
  return (
    <>
      <Navbar />
      <HeroOutremer
        scene="projets"
        title="Projets"
        subtitle="Dépôts publics & systèmes en production"
      />
      <main className="relative min-h-screen overflow-x-hidden px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <section className="mt-12">
            <h2 className="font-display text-2xl uppercase">Dépôts publics</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PUBLIC_PROJECTS.map((p, i) => (
                <ProjectTile key={p.title} {...p} delay={i * 0.05} />
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-display text-2xl uppercase">
              En production — auto-hébergés
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-mut">
              Ces systèmes tournent 24/7 sur mon serveur Linux personnel ou en
              usage interne ; pas de dépôt public, donc pas de lien — mais ils
              sont bien vivants.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROD_PROJECTS.map((p, i) => (
                <ProjectTile key={p.title} {...p} delay={i * 0.05} />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
