import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <motion.header
                className="flex justify-center items-center w-full fixed px-4 top-0 z-50 pt-4"
                initial={{ transform: 'translateY(-30px)', opacity: 0 }}
                animate={{ transform: 'translateY(0px)', opacity: 100 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96] }}
            >
                <nav style={{ boxShadow: '0 0 30px 2.5px #0a0a0a' }} className="flex h-14 max-w-[46rem] w-screen bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-md rounded-lg border-1 border-accent px-4">
                    <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex flex-row gap-2 items-center">

                            {/* Accueil */}
                            <Link
                                href="/"
                                className="p-2 duration-300 text-lg font-medium hover:bg-secondary rounded-md"
                            >
                                Accueil
                            </Link>

                            {/* Épreuve avec menu déroulant */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                    onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                                    className="p-2 duration-300 text-lg font-medium hover:bg-secondary rounded-md flex items-center gap-1"
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

                            {/* Veille Technologique */}
                            <Link
                                href="/veille"
                                className="p-2 duration-300 text-lg font-medium hover:bg-secondary rounded-md"
                            >
                                Veille Technologique
                            </Link>

                        </div>
                    </div>
                </nav>
            </motion.header>
        </>
    );
}
