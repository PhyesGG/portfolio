import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Projects() {
  //set to true by default for now because there aren't enough projects to warrant a show more button
  const [showAll, setShowAll] = useState(true);

  return (
    <>
      <section id='projects' className="max-w-4xl w-full flex flex-col mx-auto">
        <motion.h1
          className="text-center font-bold text-5xl mt-16 -mb-2"
          initial={{ transform: 'translateY(-30px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
          viewport={{ amount: 0.1, once: true }}
        >
          Veille Technologique
        </motion.h1>
        <ul className={`${showAll ? '' : 'max-h-[100rem]'} grid md:grid-cols-2 pt-6 pb-1 grid-cols-1 gap-4 overflow-hidden`}>
          {!showAll &&
            <div className="absolute flex justify-center bottom-[5rem] z-10 bg-gradient-to-t from-background pb-8 pt-32 max-w-4xl w-full">
              <Button label="Show More" onClick={() => setShowAll(true)} width="w-[10rem]" />
            </div>
          }
          <ProjectCard
            url="#"
            title="IA Generatives en Entreprise"
            fullDescription={[
              "Etude approfondie de l'integration et la securisation des IA generatives (LLM) dans le contexte professionnel.",
              "Focus sur l'infrastructure IA locale avec des outils comme Ollama et vLLM pour l'optimisation de l'inference.",
              "Analyse des vulnerabilites de securite specifiques aux LLM, notamment les attaques par injection de prompt.",
              "Suivi de l'evolution des modeles open-source et leur potentiel d'application en entreprise."
            ]}
            cardImage="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
            cardDescription="Integration et securisation des IA generatives (LLM) en entreprise : infrastructure locale, optimisation de l'inference et securite."
            media={[]}
            myRole="Veille Technologique"
            delay={0.1}
            gradient="bg-gradient-to-tl"
          />
          <ProjectCard
            url="#"
            title="Outils de Veille"
            fullDescription={[
              "Utilisation de Feedly pour l'agregation de flux RSS provenant de sources techniques specialisees.",
              "Configuration de Google Alerts pour le suivi de mots-cles strategiques lies a la cybersecurite et l'IA.",
              "Abonnement aux newsletters ANSSI et CERT-FR pour rester informe des alertes de securite.",
              "Citation cle : 'L'IA permet d'automatiser la detection d'intrusions mais sert aussi a generer des attaques par phishing plus sophistiquees.'"
            ]}
            cardImage="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
            cardDescription="Outils de veille : Feedly (RSS), Google Alerts, newsletters ANSSI/CERT-FR pour le suivi cybersecurite."
            media={[]}
            myRole="Veille Technologique"
            delay={0.2}
            gradient="bg-gradient-to-tl"
          />
        </ul>
      </section>
    </>
  );
}
