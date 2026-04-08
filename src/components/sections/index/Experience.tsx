import ExperienceCard from "@/components/ExperienceCard";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Experience() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section id='experience' className="max-w-4xl w-full flex flex-col mx-auto">
                <motion.h1
                    className="text-center font-bold text-5xl mt-16 -mb-2"
                    initial={{ transform: 'translateY(-30px)', opacity: 0 }}
                    whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
                    viewport={{ amount: 0.1, once: true }}
                >
                    Projets BTS SIO
                </motion.h1>
                <ul className={`flex flex-col pt-6 pb-1 gap-4 overflow-hidden`}>
                    <ExperienceCard
                        url="#"
                        title="E6 - Migration Active Directory"
                        fullDescription={[
                            "Migration de 150 postes de travail vers Windows Server 2022, incluant le refactoring des GPO (Group Policy Objects) et le durcissement securitaire de l'infrastructure.",
                            "Utilisation intensive de PowerShell pour automatiser les taches de migration et assurer la coherence des configurations sur l'ensemble du parc informatique.",
                            "Mise en place des bonnes pratiques de securite conformes aux recommandations ANSSI pour la gestion des comptes privilegies et des acces.",
                            "Documentation complete du processus de migration pour faciliter la maintenance future et le transfert de competences au sein de l'equipe."
                        ]}
                        cardImage="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"
                        cardDescription="Migration de 150 postes vers Windows Server 2022 avec refactoring des GPO et durcissement securitaire via PowerShell."
                        media={[]}
                        myRole="Administrateur Systemes"
                        timeline="Projet E6 - BTS SIO SISR"
                        delay={0.1}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="#"
                        title="E6 - Securite Reseau"
                        fullDescription={[
                            "Implementation de la segmentation VLAN pour isoler les differents services de l'entreprise et limiter la surface d'attaque potentielle.",
                            "Deploiement et configuration d'un pare-feu PfSense pour le filtrage du trafic inter-services avec des regles adaptees aux besoins metier.",
                            "Mise en place de la journalisation et du monitoring des flux reseau pour detecter les comportements anormaux.",
                            "Redaction de procedures de securite et sensibilisation des utilisateurs aux bonnes pratiques."
                        ]}
                        cardImage="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
                        cardDescription="Segmentation VLAN et deploiement PfSense pour le filtrage du trafic inter-services."
                        media={[]}
                        myRole="Administrateur Reseaux"
                        timeline="Projet E6 - BTS SIO SISR"
                        delay={0.2}
                        gradient="bg-gradient-to-br"
                    />
                    <ExperienceCard
                        url="https://glpi-project.org/"
                        title="E5 - Gestion des Tickets GLPI"
                        fullDescription={[
                            "Analyse statistique des incidents pour identifier les problemes recurrents et ameliorer la qualite de service.",
                            "Creation et maintenance d'une base de connaissances (FAQ) pour reduire le volume des tickets de niveau 1 et accelerer la resolution.",
                            "Mise en place d'indicateurs de performance (KPI) pour mesurer l'efficacite du support et identifier les axes d'amelioration.",
                            "Formation des utilisateurs a l'utilisation de GLPI pour optimiser la creation et le suivi des demandes."
                        ]}
                        cardImage="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
                        cardDescription="Analyse statistique des incidents et creation d'une base de connaissances FAQ pour reduire les tickets niveau 1."
                        media={[]}
                        myRole="Support IT"
                        timeline="Projet E5 - BTS SIO SISR"
                        delay={0.3}
                        gradient="bg-gradient-to-br"
                    />
                </ul>
            </section>
        </>
    );
}
