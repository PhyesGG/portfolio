import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <motion.header
                className="flex justify-center items-center w-full fixed px-4 top-0 z-50 pt-4"
                initial={{ transform: 'translateY(-30px)', opacity: 0 }}
                animate={{ transform: 'translateY(0px)', opacity: 100 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96] }}
            >
                <nav style={{ boxShadow: '0 0 30px 2.5px #0a0a0a' }} className="flex h-14 max-w-[52rem] w-screen bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-md rounded-lg border-1 border-accent px-3 sm:px-4">
                    <div className="flex flex-row items-center justify-between md:justify-center w-full">

                        {/* ---- Desktop : les 5 liens en ligne (md et plus) ---- */}
                        <div className="hidden md:flex flex-row gap-1 lg:gap-2 items-center">

                            <Link
                                href="/"
                                className="p-2 duration-300 text-base lg:text-lg font-medium hover:bg-secondary rounded-md whitespace-nowrap"
                            >
                                Accueil
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                                    className="p-2 duration-300 text-base lg:text-lg font-medium hover:bg-secondary rounded-md flex items-center gap-1 whitespace-nowrap"
                                >
                                    Épreuve
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ boxShadow: '0 0 20px 2px #0a0a0a' }}
                                            className="absolute top-full mt-2 left-0 min-w-[200px] bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-md rounded-lg border border-accent overflow-hidden"
                                        >
                                            <Link
                                                href="/epreuve?tab=e5"
                                                className="block px-4 py-3 text-base font-medium hover:bg-secondary duration-200 border-b border-accent/30"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                E5 — Situation d&apos;entreprise
                                            </Link>
                                            <Link
                                                href="/epreuve?tab=e6"
                                                className="block px-4 py-3 text-base font-medium hover:bg-secondary duration-200"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                E6 — Mise en pratique
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                href="/veille"
                                className="p-2 duration-300 text-base lg:text-lg font-medium hover:bg-secondary rounded-md whitespace-nowrap"
                            >
                                Veille Technologique
                            </Link>

                            <Link
                                href="/projets"
                                className="p-2 duration-300 text-base lg:text-lg font-medium hover:bg-secondary rounded-md whitespace-nowrap"
                            >
                                Projets
                            </Link>

                            <Link
                                href="/certifications"
                                className="p-2 duration-300 text-base lg:text-lg font-medium hover:bg-secondary rounded-md whitespace-nowrap"
                            >
                                Certifications
                            </Link>

                        </div>

                        {/* ---- Mobile : label + bouton hamburger (en dessous de md) ---- */}
                        <span className="md:hidden pl-1 font-display text-sm uppercase tracking-wide">
                            Menu
                        </span>
                        <button
                            onClick={() => setMobileOpen((p) => !p)}
                            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-expanded={mobileOpen}
                            className="md:hidden p-2 duration-300 hover:bg-secondary rounded-md"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* ---- Panneau mobile : les 5 liens empiles (en dessous de md) ---- */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                        style={{ boxShadow: '0 0 30px 2.5px #0a0a0a' }}
                        className="md:hidden fixed left-4 right-4 top-[4.75rem] z-50 flex flex-col overflow-hidden rounded-lg border-1 border-accent bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-md"
                    >
                        <Link href="/" className="px-4 py-3 text-base font-medium hover:bg-secondary duration-200 border-b border-accent/30" onClick={() => setMobileOpen(false)}>
                            Accueil
                        </Link>
                        <Link href="/epreuve?tab=e5" className="px-4 py-3 text-base font-medium hover:bg-secondary duration-200 border-b border-accent/30" onClick={() => setMobileOpen(false)}>
                            Épreuve — E5
                        </Link>
                        <Link href="/epreuve?tab=e6" className="px-4 py-3 text-base font-medium hover:bg-secondary duration-200 border-b border-accent/30" onClick={() => setMobileOpen(false)}>
                            Épreuve — E6
                        </Link>
                        <Link href="/veille" className="px-4 py-3 text-base font-medium hover:bg-secondary duration-200 border-b border-accent/30" onClick={() => setMobileOpen(false)}>
                            Veille Technologique
                        </Link>
                        <Link href="/projets" className="px-4 py-3 text-base font-medium hover:bg-secondary duration-200 border-b border-accent/30" onClick={() => setMobileOpen(false)}>
                            Projets
                        </Link>
                        <Link href="/certifications" className="px-4 py-3 text-base font-medium hover:bg-secondary duration-200" onClick={() => setMobileOpen(false)}>
                            Certifications
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
