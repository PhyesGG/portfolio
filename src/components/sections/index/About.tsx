import AboutCard from "@/components/AboutCard";
import type { Presence, Tech } from "../../../../typings";
import { motion } from "framer-motion";
import PresenceCard from "@/components/PresenceCard";
import { useEffect, useState } from "react";

export default function About() {
  let systemsTech: Tech[] = [
    { title: "Windows Server", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" />, link: "https://www.microsoft.com/windows-server" },
    { title: "Active Directory", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" />, link: "https://docs.microsoft.com/active-directory" },
    { title: "Linux Debian", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg" />, link: "https://www.debian.org/" },
    { title: "Ubuntu", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" />, link: "https://ubuntu.com/" },
    { title: "PowerShell", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg" />, link: "https://docs.microsoft.com/powershell" },
    { title: "Bash", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" />, link: "https://www.gnu.org/software/bash/" },
  ]

  let networkTech: Tech[] = [
    { title: "PfSense", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" />, link: "https://www.pfsense.org/" },
    { title: "VLAN", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg" />, link: "https://en.wikipedia.org/wiki/VLAN" },
    { title: "TCP/IP", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" />, link: "https://en.wikipedia.org/wiki/Internet_protocol_suite" },
    { title: "GLPI", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" />, link: "https://glpi-project.org/" },
  ]

  let otherTech: Tech[] = [
    { title: "HTML", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />, link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { title: "CSS", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />, link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { title: "Git", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />, link: "https://git-scm.com/" },
    { title: "VS Code", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />, link: "https://code.visualstudio.com/" },
    { title: "Ollama", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />, link: "https://ollama.ai/" },
    { title: "Docker", icon: <img alt="" draggable={false} className="h-6" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />, link: "https://www.docker.com/" },
  ]

  const [presence, setPresence] = useState<Presence | null>(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <section id='about' className="max-w-4xl w-full flex flex-col mx-auto">
        <motion.h1
          className="text-center font-bold text-5xl mt-16"
          initial={{ transform: 'translateY(-30px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
          viewport={{ amount: 0.1, once: true }}
        >
          A propos
        </motion.h1>
        <ul className="grid grid-cols-2 gap-4 mt-4">
          <AboutCard
            title="Presentation"
            description="Etudiant en BTS SIO option SISR en alternance, je combine rigueur academique et exigences operationnelles en entreprise. Je gere des projets complexes allant de la securite des systemes a l'optimisation des reseaux. Passionne par l'infrastructure IT et les nouvelles technologies, notamment l'IA generative en entreprise."
            direction="top"
            span={2}
            delay={0.1}
            gradient="bg-gradient-to-tl"
          />
          <AboutCard
            title="Systemes"
            description="Administration de systemes Windows Server et Linux. Migration Active Directory, gestion des GPO et durcissement securitaire avec PowerShell."
            tech={systemsTech}
            direction="left"
            span={1}
            delay={0.15}
            gradient="bg-gradient-to-br"
          />
          <AboutCard
            title="Reseaux"
            description="Configuration et securisation des infrastructures reseau. Segmentation VLAN, deploiement de pare-feu PfSense et filtrage du trafic inter-services."
            tech={networkTech}
            direction="right"
            span={1}
            delay={0.2}
            gradient="bg-gradient-to-bl"
          />
          <AboutCard
            title="Autres Competences"
            description="Developpement web, gestion de parc informatique, support utilisateur et veille technologique sur l'IA et la cybersecurite."
            tech={otherTech}
            direction="bottom"
            span={presence && presence.activities.length > 0 ? 1 : 2}
            delay={0.1}
            gradient="bg-gradient-to-tr"
          />
          {presence && presence.activities.length > 0 &&
            <PresenceCard
              presence={presence}
              date={date}
              direction="bottom"
              span={1}
              delay={0.1}
              gradient="bg-gradient-to-tl"
            />
          }
        </ul>
      </section>
    </>
  );
}
