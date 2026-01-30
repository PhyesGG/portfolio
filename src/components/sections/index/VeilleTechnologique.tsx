import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import articlesData from "../../../../data/articles.json";
import type { Article } from "../../../../typings/article";

export default function VeilleTechnologique() {
  const articles: Article[] = articlesData.articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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
          className="mt-8 space-y-6"
          initial={{ transform: 'translateY(-30px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.39, 0.21, 0.12, 0.96], }}
          viewport={{ amount: 0.1, once: true }}
        >
          <div className="bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-md rounded-lg border border-accent p-6">
            <h2 className="text-2xl font-semibold mb-4">Qu&apos;est-ce qu&apos;un Serveur RAG ?</h2>
            <p className="text-gray-300 mb-4">
              Le RAG (Retrieval-Augmented Generation) est une architecture qui combine la recherche d&apos;informations
              dans une base de connaissances avec la génération de texte par IA. Cette technologie permet aux
              modèles de langage d&apos;accéder à des données spécifiques et actualisées pour produire des réponses
              plus précises et contextuelles.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">LLM</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Vector Database</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Embeddings</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Semantic Search</span>
            </div>
          </div>

          <div className="bg-gradient-to-bl from-primary/90 to-secondary/90 backdrop-blur-md rounded-lg border border-accent p-6">
            <h2 className="text-2xl font-semibold mb-4">Technologies & Solutions RAG</h2>
            <p className="text-gray-300 mb-4">
              Exploration des principales plateformes et frameworks pour implémenter des serveurs RAG :
              LangChain pour l&apos;orchestration, ChromaDB et Pinecone pour le stockage vectoriel, Ollama pour
              l&apos;hébergement local de LLM, et OpenAI/Anthropic pour les modèles cloud.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">LangChain</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Ollama</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">ChromaDB</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Pinecone</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Weaviate</span>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-primary/90 to-secondary/90 backdrop-blur-md rounded-lg border border-accent p-6">
            <h2 className="text-2xl font-semibold mb-4">Applications en Entreprise</h2>
            <p className="text-gray-300 mb-4">
              Les serveurs RAG révolutionnent l&apos;accès à l&apos;information en entreprise : assistants intelligents
              pour la documentation technique, systèmes de support client automatisés, analyse de bases de
              connaissances internes, et aide à la décision basée sur des données propriétaires sécurisées.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Documentation</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Knowledge Base</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">Chatbots</span>
              <span className="px-3 py-1 bg-accent/20 rounded-full text-sm">IA Privée</span>
            </div>
          </div>
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
