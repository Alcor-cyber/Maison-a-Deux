# Foyer à deux

Le site du couple, en deux parties :

- **Foyer à deux** : tâches, courses (avec le mode « Je fais les courses » et le paiement), menus de la semaine avec banque de recettes et générateur, budget commun, agenda et projets.
- **Ma Maison** : lumières, climatisation et scènes, pièce par pièce (en mode aperçu tant que Home Assistant n'est pas relié).

Le site est une seule page HTML, sans installation ni serveur : GitHub Pages suffit pour l'héberger.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Le site complet (HTML, CSS et JavaScript) |
| `data/seed.json` | La banque de départ : 149 recettes et 120 ingrédients, chargée à la première visite |
| `manifest.webmanifest` et `icons/` | Pour installer le site sur l'écran d'accueil du téléphone, comme une appli |
| `.nojekyll` | Demande à GitHub Pages de servir les fichiers tels quels |

## Mise en ligne avec GitHub Pages

1. Sur [github.com](https://github.com), créez un nouveau dépôt (bouton **New**), par exemple `foyer-a-deux`.
2. Dans le dépôt, cliquez sur **Add file → Upload files** et glissez **tout le contenu de ce dossier** (le fichier `.nojekyll` et les dossiers `data` et `icons` compris), puis **Commit changes**.
   - Si `.nojekyll` n'apparaît pas (fichier caché), ce n'est pas grave : le site fonctionne sans.
3. Allez dans **Settings → Pages**. Sous **Build and deployment**, choisissez **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
4. Après une à deux minutes, le site est en ligne à l'adresse `https://VOTRE-NOM.github.io/foyer-a-deux/`.

Avec un compte GitHub gratuit, le dépôt doit être **public** pour utiliser GitHub Pages : n'importe qui pourrait lire ces fichiers. C'est pour ça que le dossier ne contient que les recettes et les ingrédients, aucune donnée personnelle.

## Installer sur le téléphone ou la tablette

- **iPhone / iPad (Safari)** : ouvrez le site, bouton **Partager**, puis **Sur l'écran d'accueil**.
- **Android (Chrome)** : ouvrez le site, menu **⋮**, puis **Ajouter à l'écran d'accueil** ou **Installer l'application**.

Sur la tablette murale, cochez « Se souvenir de mon choix sur cet appareil » en choisissant Ma Maison : elle ouvrira directement cette partie.

## Ce qui change par rapport à la version claude.ai

- **Les données restent sur chaque appareil.** Sur claude.ai, le site partageait les données entre vous deux en direct. Sur GitHub Pages, chaque téléphone garde ses propres tâches, courses, menus et dépenses (stockés dans le navigateur). Pour retrouver le partage, il faut brancher une base de données en ligne, par exemple Firebase ou Supabase (gratuit à cette échelle).
- **Effacer les données du navigateur efface celles du site** sur cet appareil.
- **Ma Maison reste en mode aperçu** : le branchement prévu passait par un connecteur Claude, qui n'existe pas en dehors de claude.ai. Hors claude.ai, la page devra appeler Home Assistant directement.

## Mettre à jour le site

Remplacez `index.html` (ou `data/seed.json`) dans le dépôt par la nouvelle version (**Add file → Upload files**). GitHub Pages republie tout seul en une à deux minutes.
