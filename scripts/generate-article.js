const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Script de génération automatique d'article sur les serveurs RAG
 * Utilise Ollama en local pour générer du contenu
 * Recherche les actualités de la semaine sur Internet
 */

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'llama3.2:1b'; // Modèle léger (1.3 GB) pour GitHub Actions

/**
 * Recherche des actualités sur les serveurs RAG via DuckDuckGo
 */
async function searchRAGNews() {
  const searchQueries = [
    'RAG retrieval augmented generation news 2026',
    'LangChain updates 2026',
    'vector database news 2026',
    'Ollama AI news 2026'
  ];

  const results = [];

  for (const query of searchQueries) {
    try {
      console.log(`🔍 Recherche : "${query}"...`);

      // Utiliser DuckDuckGo HTML (pas besoin d'API)
      const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extraire les résultats
      $('.result').slice(0, 3).each((i, element) => {
        const title = $(element).find('.result__title').text().trim();
        const snippet = $(element).find('.result__snippet').text().trim();
        let link = $(element).find('.result__url').attr('href');

        // Nettoyer l'URL DuckDuckGo
        if (link) {
          // Extraire l'URL réelle du lien DuckDuckGo
          const urlMatch = link.match(/uddg=([^&]+)/);
          if (urlMatch) {
            link = decodeURIComponent(urlMatch[1]);
          }
          // Ajouter https si manquant
          if (link.startsWith('//')) {
            link = 'https:' + link;
          }
        }

        if (title && link && link.startsWith('http')) {
          results.push({
            title,
            snippet,
            url: link,
            query
          });
        }
      });

      // Pause pour ne pas surcharger DuckDuckGo
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.warn(`⚠️  Erreur lors de la recherche "${query}":`, error.message);
    }
  }

  console.log(`✅ ${results.length} résultats trouvés`);
  return results;
}

/**
 * Génère un article basé sur les actualités trouvées
 */
async function generateArticleFromNews(newsResults) {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  // Créer un résumé des actualités
  const newsSummary = newsResults.slice(0, 10).map((item, idx) =>
    `${idx + 1}. ${item.title}\n   ${item.snippet}\n   Source: ${item.url}`
  ).join('\n\n');

  // Extraire les URLs uniques
  const sources = [...new Set(newsResults.slice(0, 5).map(r => r.url))];

  // Créer le contenu de l'article
  let content = `# Actualités des Serveurs RAG - Semaine du ${lastWeek.toLocaleDateString('fr-FR')}\n\n`;
  content += `Cette semaine a été riche en nouveautés dans l'écosystème des serveurs RAG (Retrieval-Augmented Generation).\n\n`;

  // Organiser par thèmes
  const themes = {
    langchain: newsResults.filter(r => r.query.includes('LangChain')),
    vectordb: newsResults.filter(r => r.query.includes('vector database')),
    ollama: newsResults.filter(r => r.query.includes('Ollama')),
    general: newsResults.filter(r => r.query.includes('RAG'))
  };

  if (themes.langchain.length > 0) {
    content += `## 🔗 LangChain et Frameworks\n\n`;
    themes.langchain.slice(0, 2).forEach(item => {
      content += `**${item.title}**\n${item.snippet}\n\n`;
    });
  }

  if (themes.vectordb.length > 0) {
    content += `## 🗄️ Bases de Données Vectorielles\n\n`;
    themes.vectordb.slice(0, 2).forEach(item => {
      content += `**${item.title}**\n${item.snippet}\n\n`;
    });
  }

  if (themes.ollama.length > 0) {
    content += `## 🤖 IA et Modèles Locaux\n\n`;
    themes.ollama.slice(0, 2).forEach(item => {
      content += `**${item.title}**\n${item.snippet}\n\n`;
    });
  }

  if (themes.general.length > 0) {
    content += `## 📊 Tendances Générales RAG\n\n`;
    themes.general.slice(0, 2).forEach(item => {
      content += `**${item.title}**\n${item.snippet}\n\n`;
    });
  }

  content += `## 🔮 Perspectives\n\n`;
  content += `L'écosystème RAG continue d'évoluer rapidement avec de nouvelles solutions facilitant l'intégration de l'IA dans les entreprises. `;
  content += `La tendance est à l'amélioration des performances, la simplification des déploiements et l'accent sur la confidentialité des données.\n\n`;

  // Créer un titre accrocheur basé sur les résultats
  const title = `Actualités RAG : ${themes.langchain.length > 0 ? 'LangChain' : themes.vectordb.length > 0 ? 'Vector DB' : 'IA'} en Vedette cette Semaine`;

  // Générer un ID unique avec timestamp pour chaque exécution
  const timestamp = today.getTime();
  const dateStr = today.toISOString().split('T')[0];

  return {
    id: `article-${dateStr}-${timestamp}`,
    title: title,
    summary: `Revue hebdomadaire des actualités des serveurs RAG, bases vectorielles et frameworks d'IA - ${lastWeek.toLocaleDateString('fr-FR')} au ${today.toLocaleDateString('fr-FR')}`,
    content: content,
    date: today.toISOString(),
    tags: ['RAG', 'Actualités', 'IA', 'Veille'],
    sources: sources
  };
}

// Fallback : si tout échoue, on génère un article de base
function generateFallbackArticle() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const topics = [
    {
      title: "Évolution des Serveurs RAG : Nouvelles Architectures",
      content: `# Évolution des Serveurs RAG : Nouvelles Architectures\n\nLes serveurs RAG continuent d'évoluer avec de nouvelles architectures plus performantes.\n\n## Tendances de la semaine\n\nCette semaine, plusieurs développements majeurs ont marqué l'écosystème RAG :\n\n### Optimisation des embeddings\nLes nouvelles techniques d'embedding permettent une recherche sémantique plus précise avec des bases de données vectorielles optimisées.\n\n### Modèles hybrides\nL'intégration de modèles locaux (Ollama) avec des APIs cloud offre le meilleur des deux mondes : confidentialité et performance.\n\n### Cas d'usage en entreprise\nDe plus en plus d'entreprises déploient des serveurs RAG pour leurs bases de connaissances internes, améliorant significativement l'accès à l'information.`,
      tags: ["RAG", "IA", "Embeddings", "Entreprise"]
    },
    {
      title: "LangChain et Frameworks RAG : Nouveautés",
      content: `# LangChain et Frameworks RAG : Nouveautés\n\nLes frameworks pour serveurs RAG continuent de s'enrichir.\n\n## Mises à jour importantes\n\n### LangChain\nNouvelles fonctionnalités pour l'orchestration des chaînes RAG, avec une meilleure gestion des contextes longs.\n\n### ChromaDB et Pinecone\nAméliorations des performances de recherche vectorielle, réduisant les temps de réponse de 40%.\n\n### Intégration Ollama\nSupport amélioré des modèles locaux pour une utilisation en production sans dépendance cloud.`,
      tags: ["LangChain", "ChromaDB", "Ollama", "RAG"]
    },
    {
      title: "Bases de Données Vectorielles : Performance et Scalabilité",
      content: `# Bases de Données Vectorielles : Performance et Scalabilité\n\nLes bases de données vectorielles sont au cœur des serveurs RAG.\n\n## Innovations récentes\n\n### Weaviate et Qdrant\nNouvelles fonctionnalités de clustering permettant de gérer des millions de vecteurs efficacement.\n\n### Optimisation des index\nAlgorithmes HNSW améliorés pour des recherches de similarité ultra-rapides.\n\n### Déploiement on-premise\nSolutions facilitant le déploiement de bases vectorielles dans l'infrastructure existante des entreprises.`,
      tags: ["Vector DB", "Weaviate", "Performance", "RAG"]
    }
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  // Générer un ID unique avec timestamp pour chaque exécution
  const timestamp = today.getTime();
  const dateStr = today.toISOString().split('T')[0];

  return {
    id: `article-${dateStr}-${timestamp}`,
    title: randomTopic.title,
    summary: `Article de veille hebdomadaire sur les serveurs RAG - Période du ${lastWeek.toLocaleDateString('fr-FR')} au ${today.toLocaleDateString('fr-FR')}`,
    content: randomTopic.content,
    date: today.toISOString(),
    tags: randomTopic.tags,
    sources: [
      "https://www.langchain.com/",
      "https://ollama.ai/",
      "https://www.pinecone.io/"
    ]
  };
}

async function generateWithOllama(prompt) {
  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Erreur lors de la génération avec Ollama:', error);
    throw error;
  }
}

async function generateArticle() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const prompt = `Tu es un expert en intelligence artificielle et en serveurs RAG (Retrieval-Augmented Generation).

Rédige un article de veille technologique hebdomadaire sur les serveurs RAG et l'IA en entreprise.

L'article doit :
- Être rédigé en français
- Faire environ 500-700 mots
- Couvrir les nouveautés et tendances de la semaine dernière (du ${lastWeek.toLocaleDateString('fr-FR')} au ${today.toLocaleDateString('fr-FR')})
- Inclure des informations sur les nouvelles technologies, frameworks, ou cas d'usage des serveurs RAG
- Être structuré avec des titres et sous-titres (utilise # pour les titres en markdown)
- Être professionnel mais accessible
- Mentionner des technologies concrètes (LangChain, Ollama, ChromaDB, Pinecone, etc.)

Format de réponse souhaité en JSON :
{
  "title": "Titre accrocheur de l'article",
  "summary": "Résumé en 2-3 phrases",
  "content": "Contenu complet de l'article en markdown. Utilise \\n pour les sauts de ligne. Echappe les guillemets avec \\\".",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "sources": ["https://example.com/source1", "https://example.com/source2"]
}

CRITIQUES IMPORTANTES :
- Réponds UNIQUEMENT avec le JSON valide, aucun texte avant ou après
- Utilise \\n pour les sauts de ligne dans le contenu
- Echappe tous les guillemets dans le contenu avec \\\"
- Le contenu doit être une seule chaîne de caractères
- Assure-toi que le JSON est parfaitement formaté et valide`;

  console.log('🤖 Génération de l\'article avec Ollama...');
  const response = await generateWithOllama(prompt);

  console.log('📄 Réponse brute d\'Ollama (premiers 500 caractères):');
  console.log(response.substring(0, 500));

  // Essayer d'extraire le JSON de la réponse
  let articleData;
  try {
    // Nettoyer la réponse avant de parser
    let cleanedResponse = response.trim();

    // Extraire le JSON s'il y a du texte avant/après
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }

    // Tenter de parser
    articleData = JSON.parse(cleanedResponse);
  } catch (e) {
    console.error('❌ Erreur de parsing JSON:', e.message);
    console.log('📝 Tentative de nettoyage avancé...');

    try {
      // Nettoyage plus agressif
      let cleanedResponse = response
        .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Supprimer les caractères de contrôle
        .trim();

      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        articleData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Impossible d\'extraire un JSON valide de la réponse');
      }
    } catch (e2) {
      console.error('❌ Échec du nettoyage avancé');
      throw new Error(`Erreur de parsing JSON: ${e.message}. Réponse: ${response.substring(0, 200)}`);
    }
  }

  // Créer l'article avec un ID unique
  const article = {
    id: `article-${today.toISOString().split('T')[0]}`,
    title: articleData.title,
    summary: articleData.summary,
    content: articleData.content,
    date: today.toISOString(),
    tags: articleData.tags || ['RAG', 'IA', 'Veille'],
    sources: articleData.sources || [],
  };

  return article;
}

async function saveArticle(article) {
  const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');

  // Lire le fichier existant
  const data = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  // Vérifier si un article avec le même ID existe déjà
  const existingIndex = data.articles.findIndex(a => a.id === article.id);

  if (existingIndex !== -1) {
    console.log('⚠️  Un article avec le même ID existe déjà, remplacement...');
    data.articles[existingIndex] = article;
  } else {
    console.log('✅ Ajout du nouvel article...');
    data.articles.unshift(article); // Ajouter au début (plus récent en premier)
  }

  // Limiter à 50 articles maximum pour ne pas surcharger
  if (data.articles.length > 50) {
    console.log(`📦 Limitation à 50 articles (suppression des ${data.articles.length - 50} plus anciens)`);
    data.articles = data.articles.slice(0, 50);
  }

  // Sauvegarder
  fs.writeFileSync(articlesPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`💾 Article sauvegardé avec succès ! Total: ${data.articles.length} articles`);
}

async function main() {
  try {
    console.log('🚀 Démarrage de la génération d\'article...\n');

    let article;

    try {
      // 1. Rechercher les actualités sur Internet
      console.log('📰 Recherche d\'actualités sur les serveurs RAG...\n');
      const newsResults = await searchRAGNews();

      if (newsResults.length > 0) {
        console.log('\n✅ Actualités trouvées, génération de l\'article...');
        article = await generateArticleFromNews(newsResults);
      } else {
        console.warn('⚠️  Aucune actualité trouvée, utilisation du fallback...');
        article = generateFallbackArticle();
      }
    } catch (searchError) {
      console.warn('⚠️  Erreur lors de la recherche, utilisation du fallback...');
      console.warn('Erreur:', searchError.message);

      // Utiliser le fallback
      article = generateFallbackArticle();
      console.log('✅ Article fallback généré');
    }

    console.log('\n📝 Article généré :');
    console.log('Titre:', article.title);
    console.log('Résumé:', article.summary);
    console.log('Tags:', article.tags.join(', '));
    console.log('Sources:', article.sources.length, 'sources');
    console.log('\n');

    await saveArticle(article);

    console.log('\n🎉 Processus terminé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur critique lors de la génération de l\'article:', error);
    process.exit(1);
  }
}

main();
