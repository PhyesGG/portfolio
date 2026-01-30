const fs = require('fs');
const path = require('path');

/**
 * Script de génération automatique d'article sur les serveurs RAG
 * Utilise Ollama en local pour générer du contenu
 */

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'llama3.2:1b'; // Modèle léger (1.3 GB) pour GitHub Actions

// Fallback : si Ollama échoue, on génère un article de base
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

  return {
    id: `article-${today.toISOString().split('T')[0]}`,
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

  // Vérifier si un article existe déjà pour aujourd'hui
  const existingIndex = data.articles.findIndex(a => a.id === article.id);

  if (existingIndex !== -1) {
    console.log('⚠️  Un article existe déjà pour aujourd\'hui, mise à jour...');
    data.articles[existingIndex] = article;
  } else {
    console.log('✅ Ajout du nouvel article...');
    data.articles.unshift(article); // Ajouter au début
  }

  // Sauvegarder
  fs.writeFileSync(articlesPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('💾 Article sauvegardé avec succès !');
}

async function main() {
  try {
    console.log('🚀 Démarrage de la génération d\'article...\n');

    let article;

    try {
      // Essayer de générer avec Ollama
      article = await generateArticle();
    } catch (ollamaError) {
      console.warn('⚠️  Ollama a échoué, utilisation du mode fallback...');
      console.warn('Erreur Ollama:', ollamaError.message);

      // Utiliser le fallback
      article = generateFallbackArticle();
      console.log('✅ Article fallback généré');
    }

    console.log('\n📝 Article généré :');
    console.log('Titre:', article.title);
    console.log('Résumé:', article.summary);
    console.log('Tags:', article.tags.join(', '));
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
