# Foyer à deux

Le site du couple, en deux parties :

- **Foyer à deux** : tâches, courses (avec le mode « Je fais les courses » et le paiement), menus de la semaine avec banque de recettes et générateur, budget commun, agenda et projets.
- **Ma Maison** : lumières, climatisation et scènes, pièce par pièce (en mode aperçu tant que Home Assistant n'est pas relié).

Le site est une seule page HTML, sans installation ni serveur : GitHub Pages suffit pour l'héberger.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Le site complet (HTML, CSS et JavaScript), avec la banque de départ intégrée : 149 recettes et 120 ingrédients, chargés à la première visite. Ce fichier suffit à lui seul |
| `firebase-config.js` | Les réglages Firebase pour la sauvegarde en ligne (à remplir, voir `FIREBASE.md`) |
| `firestore.rules` | Modèle des règles Firestore (les vraies, avec vos adresses, sont dans la console Firebase) |
| `firebase-messaging-sw.js` | Reçoit les notifications quand l'appli est fermée |
| `NOTIFICATIONS.md` | Le guide pour activer les notifications |
| `FIREBASE.md` | Le guide pas à pas pour activer la sauvegarde en ligne et le partage |
| `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Pour installer le site sur l'écran d'accueil du téléphone, comme une appli |
| `.nojekyll` | Demande à GitHub Pages de servir les fichiers tels quels |

## Mise en ligne avec GitHub Pages

1. Sur [github.com](https://github.com), créez un nouveau dépôt (bouton **New**), par exemple `foyer-a-deux`.
2. Dans le dépôt, cliquez sur **Add file → Upload files** et glissez **tout le contenu de ce dossier** (le fichier `.nojekyll` compris), puis **Commit changes**.
   - Si `.nojekyll` n'apparaît pas (fichier caché), ce n'est pas grave : le site fonctionne sans.
3. Allez dans **Settings → Pages**. Sous **Build and deployment**, choisissez **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
4. Après une à deux minutes, le site est en ligne à l'adresse `https://VOTRE-NOM.github.io/foyer-a-deux/`.

Avec un compte GitHub gratuit, le dépôt doit être **public** pour utiliser GitHub Pages : n'importe qui pourrait lire ces fichiers. C'est pour ça que le dossier ne contient que les recettes et les ingrédients, aucune donnée personnelle.

## Installer sur le téléphone ou la tablette

- **iPhone / iPad (Safari)** : ouvrez le site, bouton **Partager**, puis **Sur l'écran d'accueil**.
- **Android (Chrome)** : ouvrez le site, menu **⋮**, puis **Ajouter à l'écran d'accueil** ou **Installer l'application**.

Sur la tablette murale, cochez « Se souvenir de mon choix sur cet appareil » en choisissant Ma Maison : elle ouvrira directement cette partie.

## Ce qui change par rapport à la version claude.ai

- **Sans Firebase, les données restent sur chaque appareil.** Pour les sauvegarder en ligne et les partager entre vous deux en direct, suivez `FIREBASE.md` (gratuit, environ 15 minutes).
- **Sans Firebase, effacer les données du navigateur efface celles du site** sur cet appareil. Avec Firebase, il suffit de se reconnecter.
- **Ma Maison reste en mode aperçu** : le branchement prévu passait par un connecteur Claude, qui n'existe pas en dehors de claude.ai. Hors claude.ai, la page devra appeler Home Assistant directement.

## Mettre à jour le site

Remplacez `index.html` (ou `data/seed.json`) dans le dépôt par la nouvelle version (**Add file → Upload files**). GitHub Pages republie tout seul en une à deux minutes.
