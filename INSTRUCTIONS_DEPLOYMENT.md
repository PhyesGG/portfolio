# 🚀 Instructions de Déploiement - Système de Veille Automatique

## ✅ Ce qui a été mis en place

Un système complet de génération automatique d'articles sur les serveurs RAG :

1. **Interface web** - Section "Veille Technologique" avec affichage des articles
2. **Génération automatique** - Script Node.js utilisant Ollama (IA locale)
3. **Publication hebdomadaire** - GitHub Actions configuré pour tous les lundis à 9h
4. **Déploiement continu** - Push automatique → Vercel rebuild

## 📋 Étapes pour activer le système

### 1. Pousser le code sur GitHub

```bash
# Si vous n'avez pas encore initialisé git
git init
git add .
git commit -m "🚀 Ajout du système de veille technologique automatisé"

# Si vous avez déjà un repo GitHub
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
git branch -M main
git push -u origin main

# Si le repo existe déjà
git add .
git commit -m "🚀 Ajout du système de veille technologique automatisé"
git push
```

### 2. Vérifier les permissions GitHub Actions

1. Allez sur votre repo GitHub
2. `Settings` → `Actions` → `General`
3. Descendez jusqu'à **"Workflow permissions"**
4. Sélectionnez **"Read and write permissions"**
5. Cochez **"Allow GitHub Actions to create and approve pull requests"**
6. Cliquez sur **"Save"**

### 3. Activer GitHub Actions

1. Allez dans l'onglet **"Actions"** de votre repo
2. Si c'est la première fois, cliquez sur **"I understand my workflows, go ahead and enable them"**
3. Vous devriez voir le workflow **"Generate Weekly RAG Article"**

### 4. Tester le workflow manuellement (optionnel)

Pour générer votre premier article immédiatement :

1. Allez dans **Actions** → **"Generate Weekly RAG Article"**
2. Cliquez sur **"Run workflow"** (bouton à droite)
3. Sélectionnez la branche `main`
4. Cliquez sur **"Run workflow"** (bouton vert)
5. Attendez 2-3 minutes que le workflow se termine
6. Un nouvel article sera ajouté et committé automatiquement

### 5. Vérifier le déploiement Vercel

1. Le commit automatique de GitHub Actions déclenchera un rebuild sur Vercel
2. Attendez 1-2 minutes que Vercel déploie
3. Visitez votre site : l'article devrait apparaître dans la section "Veille Technologique"

## 🎯 Calendrier de publication

- **Prochain article automatique** : Lundi prochain à 9h00 (heure de Paris)
- **Fréquence** : Tous les lundis à la même heure
- **Déclenchement manuel** : Possible à tout moment via GitHub Actions

## 🔍 Vérifier que tout fonctionne

### Sur le site web (localhost ou Vercel)
- ✅ L'onglet "Veille Technologique" est visible dans la navbar
- ✅ La section affiche 3 cartes explicatives sur les RAG
- ✅ En dessous, une section "Articles de Veille Hebdomadaire"
- ✅ Un article d'exemple est déjà affiché

### Sur GitHub
- ✅ Le workflow "Generate Weekly RAG Article" est visible dans Actions
- ✅ Les permissions d'écriture sont activées
- ✅ Le fichier `.github/workflows/generate-article.yml` existe

## 🛠️ Tester en local (optionnel)

Si vous voulez tester la génération d'article sur votre machine :

```bash
# 1. Installez Ollama (si pas déjà fait)
# Windows: Téléchargez depuis https://ollama.com/download

# 2. Lancez Ollama
ollama serve

# 3. Dans un autre terminal, téléchargez le modèle
ollama pull llama3.2

# 4. Générez un article
node scripts/generate-article.js

# 5. L'article sera ajouté dans data/articles.json
# Relancez le serveur Next.js pour le voir
npm run dev
```

## 📊 Suivi des publications

Vous pouvez suivre toutes les exécutions du workflow :

1. GitHub → Onglet **"Actions"**
2. Cliquez sur **"Generate Weekly RAG Article"**
3. Vous verrez l'historique de toutes les exécutions
4. Cliquez sur une exécution pour voir les logs détaillés

## ❓ Questions fréquentes

### Le workflow ne s'exécute pas automatiquement ?
- Vérifiez que le repo GitHub est actif (pas archivé)
- Vérifiez que GitHub Actions est activé
- Vérifiez les permissions d'écriture (étape 2)

### L'article est généré mais pas visible sur le site ?
- Attendez 1-2 minutes que Vercel déploie
- Vérifiez que `data/articles.json` a bien été modifié sur GitHub
- Videz le cache de votre navigateur (Ctrl+F5)

### Comment modifier le contenu des articles ?
- Éditez le prompt dans `scripts/generate-article.js`
- Testez en local avec `node scripts/generate-article.js`
- Une fois satisfait, committez et poussez les changements

### Comment changer l'heure de publication ?
- Éditez `.github/workflows/generate-article.yml`
- Modifiez la ligne `cron: '0 8 * * 1'`
- Exemple pour mardi 14h : `cron: '0 12 * * 2'`

## 📚 Documentation complète

Consultez `VEILLE_TECHNOLOGIQUE.md` pour plus de détails techniques.

---

**🎉 C'est tout ! Votre système de veille automatique est prêt à fonctionner !**

Une fois le code poussé sur GitHub avec les bonnes permissions, les articles seront générés automatiquement chaque lundi à 9h.
