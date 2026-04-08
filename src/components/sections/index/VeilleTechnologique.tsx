import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import type { Article } from "../../../../typings/article";

export default function VeilleTechnologique({ articles = [] }: { articles?: Article[] }) {
  return (
    <>
      <section id='veille' className="max-w-4xl w-full flex flex-col mx-auto">
        <motion.h1
          className="text-center font-bold text-5xl mt-16"
          initial={{ transform: 'translateY(-30px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.39, 0.21, 0.12, 0.96], }}
          viewport={{ amount: 0.1, once: true }}
        >
          Veille Technologique
        </motion.h1>

        <motion.div
          className="mt-8 bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-md rounded-lg border border-accent p-8"
          initial={{ transform: 'translateY(-30px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.39, 0.21, 0.12, 0.96], }}
          viewport={{ amount: 0.1, once: true }}
        >
          <p className="text-gray-300 leading-relaxed mb-5">
            Ma veille porte principalement sur le <span className="text-white font-medium">RAG (Retrieval-Augmented Generation)</span>,
            une approche qui consiste à connecter un modèle de langage à une base de connaissances externe.
            Concrètement, au lieu de se fier uniquement à ce qu&apos;il a appris lors de son entraînement,
            le modèle va d&apos;abord chercher des informations pertinentes dans des documents ou une base de données,
            puis s&apos;en sert pour formuler une réponse plus précise et à jour.
          </p>
          <p className="text-gray-300 leading-relaxed mb-5">
            Du côté des outils, plusieurs solutions se distinguent : <span className="text-white font-medium">LangChain</span> pour
            orchestrer les différentes étapes du pipeline, <span className="text-white font-medium">ChromaDB</span> ou <span className="text-white font-medium">Pinecone</span> pour
            stocker les données sous forme vectorielle, et <span className="text-white font-medium">Ollama</span> pour faire tourner
            des modèles en local sans dépendre du cloud. Ces briques s&apos;assemblent pour former des systèmes
            capables de répondre à des questions sur des données internes et privées.
          </p>
          <p className="text-gray-300 leading-relaxed">
            En entreprise, ça ouvre des possibilités concrètes : un assistant capable de répondre sur la
            documentation technique interne, un chatbot de support qui s&apos;appuie sur les vraies procédures
            de la boîte, ou encore un outil d&apos;aide à la décision alimenté par des données propriétaires.
            Ce qui m&apos;intéresse particulièrement, c&apos;est la combinaison entre performance et confidentialité
            que permet l&apos;hébergement local de ces modèles.
          </p>
        </motion.div>

        {/* Section Articles */}
        <motion.div
          className="mt-16"
          initial={{ transform: 'translateY(-30px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.39, 0.21, 0.12, 0.96], }}
          viewport={{ amount: 0.1, once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Articles de Veille Hebdomadaire
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Nouveaux articles générés automatiquement chaque lundi à 9h sur les dernières actualités des serveurs RAG et IA
          </p>

          <div className="space-y-6">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))
            ) : (
              <div className="text-center text-gray-400 py-12">
                Aucun article disponible pour le moment. Le premier article sera publié lundi prochain.
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}
