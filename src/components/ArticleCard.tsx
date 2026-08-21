import { motion } from "framer-motion";
import { useState } from "react";
import { marked } from "marked";
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

  const renderedContent = marked(article.content) as string;

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
        <h3 className="text-xl font-semibold text-text">{article.title}</h3>
        <span className="text-sm text-mut whitespace-nowrap ml-4">
          {formatDate(article.date)}
        </span>
      </div>

      <p className="text-text/85 mb-4">{article.summary}</p>

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
            className="prose max-w-none text-text/85
              [&_h1]:text-text [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6
              [&_h2]:text-text [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5
              [&_h3]:text-text [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2 [&_h3]:mt-4
              [&_p]:mb-3 [&_p]:leading-relaxed
              [&_strong]:text-cobalt [&_strong]:font-semibold
              [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-3 [&_ul]:space-y-1
              [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-3 [&_ol]:space-y-1
              [&_li]:text-text/85
              [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent/80
              [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-accent
              [&_pre]:bg-secondary [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-3
              [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-mut
              [&_hr]:border-accent/30 [&_hr]:my-4"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
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
