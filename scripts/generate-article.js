const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

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

Consignes de rédaction :
- Rédigé en français
- Couvre les nouveautés et tendances de la semaine (du ${lastWeek.toLocaleDateString('fr-FR')} au ${today.toLocaleDateString('fr-FR')})
- Structuré avec des titres et sous-titres en markdown (# ## ###)
- Ton professionnel mais accessible
- Longueur idéale : 400-600 mots. Si l'actualité de la semaine est faible, un article plus court et honnête vaut mieux qu'un contenu artificiel
- Si des technologies concrètes sont concernées par l'actualité (LangChain, Ollama, ChromaDB, Pinecone, etc.), les mentionner est un plus — mais ne les cite pas si ce n'est pas pertinent

Format de réponse en JSON :
{
  "title": "Titre de l'article",
  "summary": "Résumé en 2-3 phrases",
  "content": "Contenu complet en markdown. Utilise \\n pour les sauts de ligne. Echappe les guillemets avec \\\".",
  "tags": ["tag1", "tag2", "tag3"],
  "sources": ["https://example.com/source1", "https://example.com/source2"]
}

IMPORTANT :
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
  const articlesDir = path.join(__dirname, '..', 'data', 'articles');

  // Créer le dossier si inexistant
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  const filename = `${article.id}.json`;
  const filePath = path.join(articlesDir, filename);

  const existing = fs.existsSync(filePath);
  fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');

  if (existing) {
    console.log(`⚠️  Article existant remplacé : ${filename}`);
  } else {
    console.log(`💾 Nouvel article sauvegardé : ${filename}`);
  }
}

async function main() {
  try {
    console.log('🚀 Démarrage de la génération d\'article...\n');

    // 1. Rechercher les actualités sur Internet
    console.log('📰 Recherche d\'actualités sur les serveurs RAG...\n');
    const newsResults = await searchRAGNews();

    if (newsResults.length === 0) {
      console.error('❌ Aucune actualité trouvée. Génération annulée.');
      process.exit(1);
    }

    console.log('\n✅ Actualités trouvées, génération de l\'article...');
    const article = await generateArticleFromNews(newsResults);

    console.log('\n📝 Article généré :');
    console.log('Titre:', article.title);
    console.log('Résumé:', article.summary);
    console.log('Tags:', article.tags.join(', '));
    console.log('Sources:', article.sources.length, 'sources');
    process.exit(1);
  }
}

main();
