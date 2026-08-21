import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroOutremer from "@/components/HeroOutremer";
import Footer from "@/components/sections/index/Footer";
import { GridPattern } from "@/components/GridPattern";

type Tab = "E5" | "E6";

export default function Epreuve() {
  const router = useRouter();
  const [selected, setSelected] = useState<Tab>("E5");

  useEffect(() => {
    if (router.query.tab === "e6") setSelected("E6");
    else if (router.query.tab === "e5") setSelected("E5");
  }, [router.query.tab]);

  return (
    <>
      <Navbar />
      <HeroOutremer scene="marcheurs" />
      <main className="relative min-h-screen overflow-x-hidden px-6">
        <GridPattern width={50} height={50} x={-1} y={-1} className="z-[-5]" />
        <section className="max-w-4xl w-full flex flex-col mx-auto pt-28">

          <motion.h1
            className="text-center font-bold text-5xl mt-8"
            initial={{ transform: "translateY(-30px)", opacity: 0 }}
            animate={{ transform: "translateY(0px)", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96] }}
          >
            Épreuve
          </motion.h1>

          <motion.p
            className="text-center text-mut mt-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Situations professionnelles BTS SIO SISR
          </motion.p>

          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setSelected("E5")}
              className={`px-4 py-2 rounded-lg border border-accent duration-200 ${
                selected === "E5" ? "bg-accent text-primary" : "bg-secondary hover:bg-accent/70"
              }`}
            >
              E5
            </button>
            <button
              onClick={() => setSelected("E6")}
              className={`px-4 py-2 rounded-lg border border-accent duration-200 ${
                selected === "E6" ? "bg-accent text-primary" : "bg-secondary hover:bg-accent/70"
              }`}
            >
              E6
            </button>
          </div>

          {/* Contenu E5 */}
          {selected === "E5" && (
            <motion.div
              key="e5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-center mb-2">E5 — Situation d&apos;entreprise</h2>
              <p className="text-mut text-center mb-6">
                Rapports de situations professionnelles en entreprise
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                <li>
                  <Link
                    href="/documents/Rapport_E5_Gestion_Autorisations_Reseau_clean.pdf"
                    target="_blank"
                    className="block rounded-lg border border-accent bg-secondary p-4 hover:bg-accent/20 duration-200"
                  >
                    <h3 className="font-semibold text-lg mb-1">Gestion des autorisations réseau</h3>
                    <p className="text-sm text-mut">Consulter le rapport PDF</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documents/Rapport_E5_NDI_clean.pdf"
                    target="_blank"
                    className="block rounded-lg border border-accent bg-secondary p-4 hover:bg-accent/20 duration-200"
                  >
                    <h3 className="font-semibold text-lg mb-1">NDI — Réseau d&apos;entreprise</h3>
                    <p className="text-sm text-mut">Consulter le rapport PDF</p>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}

          {/* Contenu E6 */}
          {selected === "E6" && (
            <motion.div
              key="e6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-center mb-2">E6 — Mise en pratique</h2>
              <p className="text-mut text-center mb-6">
                Mise en situation technique autour des infrastructures systèmes et réseaux
              </p>
              <ul className="grid sm:grid-cols-1 gap-4 mb-8 max-w-xl mx-auto">
                <li>
                  <Link
                    href="/documents/E6_pfSense_VLANs_Procedure_2.pdf"
                    target="_blank"
                    className="block rounded-lg border border-accent bg-secondary p-4 hover:bg-accent/20 duration-200"
                  >
                    <h3 className="font-semibold text-lg mb-1">Infrastructure pfSense avec VLANs et portail captif</h3>
                    <p className="text-sm text-mut">
                      Mise en place d&apos;une infrastructure réseau segmentée sous VMware Workstation :
                      configuration de pfSense, VLANs (Employés, Serveurs, Public), règles de firewall et portail captif.
                    </p>
                    <span className="inline-block mt-2 text-xs text-accent">Consulter le rapport PDF</span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}
