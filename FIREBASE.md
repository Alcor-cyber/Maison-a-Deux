# Sauvegarde en ligne et partage avec Firebase

Avec Firebase, vos données (tâches, courses, menus, recettes, budget, agenda, projets, Ma Maison) sont **sauvegardées en ligne** et **partagées entre vous deux en direct**. Chacun se connecte avec son e-mail et son mot de passe, et seuls vos deux comptes peuvent lire ou modifier les données.

Comptez environ 15 minutes. C'est gratuit : l'offre gratuite de Firebase (« Spark ») suffit largement pour deux personnes, sans carte bancaire.

## 1. Créer le projet

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com) et connectez-vous avec un compte Google.
2. **Créer un projet**, nommez-le par exemple `foyer-a-deux`.
3. Google Analytics : vous pouvez le **désactiver**, il ne sert pas ici. Puis **Créer le projet**.

## 2. Créer la base de données

1. Menu de gauche : **Créer** (ou **Build**), puis **Firestore Database**, puis **Créer une base de données**.
2. Emplacement : choisissez un emplacement en Europe, par exemple **eur3 (europe-west)**. Il ne pourra plus être changé.
3. Choisissez **Démarrer en mode production**, puis **Créer**.

## 3. Créer vos deux comptes

1. Menu de gauche : **Authentication**, puis **Commencer**.
2. Onglet **Mode de connexion** : choisissez **Adresse e-mail/Mot de passe**, activez le premier interrupteur, puis **Enregistrer**.
3. Onglet **Utilisateurs** : **Ajouter un utilisateur**. Saisissez l'e-mail et un mot de passe pour Thomas. Recommencez pour Christelle.

Notez bien les deux adresses : elles servent à l'étape suivante.

## 4. Protéger les données

1. Retournez dans **Firestore Database**, onglet **Règles**.
2. Effacez tout et collez le contenu du fichier `firestore.rules` de ce dossier.
3. **Remplacez** `thomas@exemple.fr` et `christelle@exemple.fr` par vos deux vraies adresses, écrites exactement comme à l'étape 3, en minuscules.
4. Cliquez sur **Publier**.

Sans cette étape, personne ne peut accéder aux données, même vous : le site affichera « Le compte … n'a pas accès aux données ».

## 5. Relier le site à Firebase

1. Cliquez sur la roue dentée en haut à gauche, puis **Paramètres du projet**.
2. En bas, dans **Vos applications**, cliquez sur l'icône **Web** (`</>`).
3. Donnez un nom (par exemple `site`), ne cochez pas Firebase Hosting, puis **Enregistrer l'application**.
4. Firebase affiche un bloc de code qui contient `const firebaseConfig = { apiKey: ..., ... };`. Copiez **uniquement ce qui est entre les accolades**, accolades comprises.
5. Ouvrez le fichier `firebase-config.js` de ce dossier et remplacez `null` par ce bloc. Le résultat doit ressembler à ceci :

```js
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  authDomain: "foyer-a-deux.firebaseapp.com",
  projectId: "foyer-a-deux",
  storageBucket: "foyer-a-deux.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

Ces informations ne sont pas secrètes : elles servent seulement à trouver votre projet. Ce sont les règles de l'étape 4 et vos mots de passe qui protègent les données. Elles peuvent donc être publiées sur GitHub.

6. Dans **Authentication**, onglet **Paramètres**, puis **Domaines autorisés** : cliquez sur **Ajouter un domaine** et saisissez `VOTRE-NOM.github.io`, votre adresse GitHub Pages sans `https://` ni nom de dépôt.

## 6. Mettre en ligne

Dans votre dépôt GitHub : **Add file → Upload files**, glissez `firebase-config.js` et le nouveau `index.html`, puis **Commit changes**. Une à deux minutes plus tard, ouvrez le site.

## 7. Première connexion

- Le site affiche un écran de connexion. Connectez-vous **d'abord sur le téléphone qui contient déjà vos données** : à la toute première connexion, tout ce qu'il contient (tâches, courses, menus, recettes, prénoms…) est envoyé dans la sauvegarde en ligne. Si l'appareil est vide, c'est la banque de 149 recettes qui est envoyée.
- Ensuite, connectez-vous sur l'autre téléphone avec l'autre compte : tout apparaît, et chaque modification se voit chez l'autre en direct.
- Vous restez connecté. **Réglages → Se déconnecter** permet de changer de compte.
- Sans réseau (dans un magasin par exemple), le site continue de fonctionner. Les modifications sont envoyées dès que la connexion revient.

## En cas de problème

| Message | Que faire |
|---|---|
| « E-mail ou mot de passe incorrect » | Vérifiez le compte dans Authentication → Utilisateurs. Les trois points à droite d'un compte permettent de changer son mot de passe. |
| « Le compte … n'a pas accès aux données » | L'adresse n'est pas dans les règles (étape 4), ou elle est écrite différemment. |
| Pas d'écran de connexion | `firebase-config.js` contient encore `null`, ou n'a pas été envoyé sur GitHub. |
| « Le serveur en ligne ne répond pas » | Pas de connexion internet au premier chargement. Rechargez la page avec du réseau. |
