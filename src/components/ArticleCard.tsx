import { motion } from "framer-motion";
import { useState } from "react";
import type { Article } from "../../typings/article";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-md rounded-lg border border-accent p-6 cursor-pointer hover:border-accent/80 transition-all"
      initial={{ transform: 'translateY(-30px)', opacity: 0 }}
      whileInView={{ transform: 'translateY(0px)', opacity: 100 }}
      transition={{ duration: 0.5, delay: 0.1 + (index * 0.05), ease: [0.39, 0.21, 0.12, 0.96] }}
      viewport={{ amount: 0.1, once: true }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{article.title}</h3>
        <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
          {formatDate(article.date)}
        </span>
      </div>

      <p className="text-gray-300 mb-4">{article.summary}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-accent/20 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-accent/30 pt-4 mt-4"
        >
          <div
            className="prose prose-invert max-w-none text-gray-300"
            dangerouslySetInnerHTML={{
              __html: article.content.replace(/\n/g, '<br />')
            }}
          />

          {article.sources && article.sources.length > 0 && (
            <div className="mt-6 pt-4 border-t border-accent/30">
              <h4 className="font-semibold mb-2">Sources :</h4>
              <ul className="list-disc list-inside space-y-1">
                {article.sources.map((source, idx) => (
                  <li key={idx}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      <div className="text-center mt-4 text-sm text-accent">
        {isExpanded ? '▲ Cliquez pour réduire' : '▼ Cliquez pour lire l\'article complet'}
      </div>
    </motion.div>
  );
}
