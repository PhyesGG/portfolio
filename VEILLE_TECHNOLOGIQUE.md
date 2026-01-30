# Système de Veille Technologique Automatisée

Ce portfolio intègre un système automatisé de génération d'articles de veille technologique sur les serveurs RAG (Retrieval-Augmented Generation).

## 🎯 Fonctionnement

### Publication automatique
- **Fréquence** : Tous les lundis à 9h00 (heure de Paris)
- **Génération** : Article automatiquement généré par IA via Ollama
- **Publication** : Commit automatique sur GitHub → Déploiement sur Vercel
- **Sujet** : Nouveautés et tendances de la semaine passée sur les serveurs RAG et l'IA

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  GitHub Actions (Cron: Lundi 9h)                        │
│  ↓                                                       │
│  1. Installation d'Ollama                               │
│  2. Génération de l'article (IA)                        │
│  3. Sauvegarde dans data/articles.json                  │
│  4. Commit & Push automatique                           │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Vercel (Déploiement automatique)                       │
│  ↓                                                       │
│  Rebuild du site avec le nouvel article                 │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Portfolio en ligne - Section Veille Technologique      │
│  Affichage du nouvel article                            │
└─────────────────────────────────────────────────────────┘
```

## 📁 Structure des fichiers

```
portfolio-main/
├── .github/
│   └── workflows/
│       └── generate-article.yml       # Workflow GitHub Actions
├── scripts/
│   └── generate-article.js            # Script de génération d'articles
├── data/
│   └── articles.json                  # Base de données des articles
├── typings/
│   └── article.d.ts                   # Types TypeScript
└── src/
    ├── components/
    │   ├── ArticleCard.tsx            # Composant d'affichage d'article
    │   └── sections/index/
    │       └── VeilleTechnologique.tsx # Section principale
```

## 🚀 Configuration

### Prérequis GitHub Actions
Le workflow est déjà configuré et s'exécutera automatiquement. Aucune configuration supplémentaire n'est nécessaire !

### Tester manuellement

Vous pouvez déclencher manuellement la génération d'un article :

1. Allez sur GitHub → Onglet "Actions"
2. Sélectionnez "Generate Weekly RAG Article"
3. Cliquez sur "Run workflow"

### Tester en local

Pour générer un article en local (nécessite Ollama installé et lancé) :

```bash
# 1. Assurez-vous qu'Ollama est lancé
ollama serve

# 2. Téléchargez le modèle (première fois)
ollama pull llama3.2

# 3. Exécutez le script
node scripts/generate-article.js
```

## 🔧 Personnalisation

### Changer le modèle Ollama

Éditez `scripts/generate-article.js` :
```javascript
const OLLAMA_MODEL = 'mistral'; // ou 'llama2', 'codellama', etc.
```

### Modifier la fréquence de publication

Éditez `.github/workflows/generate-article.yml` :
```yaml
schedule:
  - cron: '0 8 * * 1'  # Modifiez cette ligne
```

Exemples de cron :
- `0 8 * * 1` : Lundi à 8h UTC (9h Paris)
- `0 8 * * *` : Tous les jours à 8h UTC
- `0 8 1 * *` : Le 1er de chaque mois à 8h UTC

### Personnaliser le prompt

Éditez le prompt dans `scripts/generate-article.js` pour modifier le style, le ton, ou les sujets abordés.

## 📊 Format des articles

Chaque article contient :
- **ID** : Identifiant unique (date)
- **Titre** : Titre accrocheur
- **Résumé** : Description courte (2-3 phrases)
- **Contenu** : Article complet en markdown
- **Date** : Date de publication
- **Tags** : Mots-clés
- **Sources** : Liens de références (optionnel)

## 🎨 Interface utilisateur

Les articles sont affichés dans la section "Veille Technologique" avec :
- ✅ Tri par date (plus récent en premier)
- ✅ Affichage réduit par défaut
- ✅ Expansion au clic pour lire l'article complet
- ✅ Tags cliquables
- ✅ Sources avec liens externes
- ✅ Animations fluides

## 🔒 Sécurité

- Aucune clé API nécessaire (Ollama local sur GitHub Actions)
- Pas de données sensibles
- Commits signés par GitHub Actions Bot
- Validation automatique du format JSON

## 🐛 Dépannage

### L'article n'est pas généré

1. Vérifiez les logs dans GitHub Actions
2. Assurez-vous que le workflow est activé
3. Vérifiez les permissions du GITHUB_TOKEN

### L'article est généré mais pas déployé

1. Vérifiez que Vercel est bien connecté au repo GitHub
2. Vérifiez les logs de déploiement Vercel

### Format d'article invalide

Le script valide automatiquement le JSON. Si le format est invalide, le workflow échouera et aucun commit ne sera effectué.

## 📚 Ressources

- [Ollama Documentation](https://ollama.ai/)
- [GitHub Actions Cron Syntax](https://crontab.guru/)
- [Vercel Auto-deployment](https://vercel.com/docs/git)

---

**Note** : Le premier article sera généré automatiquement le prochain lundi à 9h, ou vous pouvez le déclencher manuellement dès maintenant via GitHub Actions !
