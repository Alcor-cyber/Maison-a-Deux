# Notifications de Foyer à deux

Quand l'un de vous ajoute une **tâche**, un **rendez-vous**, une **dépense** ou un **remboursement**, un **projet**, ou **termine les courses**, l'autre reçoit une notification sur son téléphone, même appli fermée.

Fonctionnement : l'appli écrit chaque action dans la collection `activity` de Firestore. La fonction `notifyPartner` de ce dossier, hébergée chez Firebase, la transforme en notification envoyée aux appareils du partenaire.

Il y a 5 étapes. Les étapes A, B et C se font une seule fois, sur un ordinateur.

---

## A. Passer au forfait Blaze (obligatoire pour héberger la fonction)

1. Console Firebase, en bas à gauche : **Mettre à niveau**, puis forfait **Blaze**, puis ajoutez une carte bancaire.
2. À votre échelle, tout reste dans la partie gratuite (2 millions d'appels de fonction par mois offerts, vous en ferez quelques centaines) : **0 € en pratique**.
3. Pendant la mise à niveau, Firebase propose une **alerte de budget** : mettez **1 €**. Vous recevrez un e-mail si un jour un centime était facturé.

## B. Créer la clé « Web Push »

1. Roue dentée en haut à gauche, puis **Paramètres du projet**, puis onglet **Cloud Messaging**.
2. En bas, section **Configuration Web**, puis **Certificats Web Push** : cliquez sur **Générer une paire de clés**.
3. Une longue clé apparaît (elle commence souvent par `B…`). Copiez-la.
4. Ouvrez `firebase-config.js` (celui du site) et remplacez la dernière ligne :
   ```js
   window.FIREBASE_VAPID_KEY = null;
   ```
   par :
   ```js
   window.FIREBASE_VAPID_KEY = "la-clé-copiée";
   ```
   Cette clé est publique, elle peut aller sur GitHub.

## C. Installer la fonction (depuis un ordinateur)

1. Installez **Node.js** version **20** ou plus récente (« LTS ») depuis [nodejs.org](https://nodejs.org).
2. Décompressez ce dossier (`foyer-notifications`) sur l'ordinateur.
3. Ouvrez un terminal **dans ce dossier** :
   - **Windows** : ouvrez le dossier dans l'Explorateur, cliquez dans la barre d'adresse, tapez `cmd` puis Entrée.
   - **Mac** : clic droit sur le dossier, puis **Nouveau terminal au dossier** (ou ouvrez Terminal et tapez `cd ` puis glissez le dossier).
4. Tapez ces commandes, une par une, en attendant la fin de chacune :
   ```
   npm install -g firebase-tools
   ```
   ```
   firebase login
   ```
   (une page web s'ouvre : connectez-vous avec le compte Google du projet Firebase)
   ```
   cd functions
   ```
   ```
   npm install
   ```
   ```
   cd ..
   ```
   ```
   firebase deploy --only functions
   ```
5. La dernière commande prend quelques minutes. Elle se termine par **« Deploy complete! »**.
   - Si elle demande d'activer des services (Cloud Functions, Cloud Build, Artifact Registry, Eventarc), répondez **oui** (`y`).
   - Si elle échoue la première fois avec un message sur des **permissions** ou **Eventarc**, attendez 5 minutes et relancez `firebase deploy --only functions` : c'est le temps que Google active les services.
   - Sur Mac, si `npm install -g` refuse (« permission denied »), utilisez `sudo npm install -g firebase-tools` et tapez le mot de passe de la session.

Dans la console Firebase, **Functions** (menu Hébergement et sans serveur) doit maintenant afficher **notifyPartner**.

## D. Mettre le site à jour sur GitHub

Dans le dépôt **Maison-a-Deux** : **Add file → Upload files**, envoyez :
- `index.html` (nouvelle version)
- `firebase-messaging-sw.js` (nouveau fichier, à côté de index.html)
- `firebase-config.js` (avec la clé de l'étape B)

puis **Commit changes**.

## E. Activer sur chaque iPhone (vous deux)

1. iOS **16.4 ou plus récent**.
2. Ouvrez https://alcor-cyber.github.io/Maison-a-Deux/ dans **Safari**, puis **Partager → Sur l'écran d'accueil**. Si l'icône existait déjà, supprimez-la et recréez-la.
3. Ouvrez l'appli **depuis l'icône**, et connectez-vous.
4. **Réglages → Notifications** :
   - **Sur ce compte, vous êtes** : choisissez votre prénom (il s'affiche dans les notifications envoyées à l'autre) ;
   - **Activer les notifications sur cet appareil**, puis **Autoriser** quand l'iPhone le demande ;
   - **Envoyer une notification de test** : elle doit arriver sur votre propre téléphone en quelques secondes.
5. Décochez dans « Me prévenir pour » les types que vous ne voulez pas recevoir.

Sur un ordinateur ou un Android, ça marche aussi : même bouton dans Réglages, sans passer par l'écran d'accueil.

---

## En cas de problème

| Ce que vous voyez | Que faire |
|---|---|
| « Pas encore configurées : il manque la clé Web Push » | Étape B : la clé n'est pas dans `firebase-config.js`, ou l'ancien fichier est encore en ligne |
| « Sur iPhone, ajoutez d'abord l'appli à l'écran d'accueil » | Ouvrez l'appli depuis son icône, pas depuis Safari |
| Le test n'arrive pas | Vérifiez que **notifyPartner** existe dans Functions (étape C). Dans Functions, puis notifyPartner, l'onglet **Journaux** montre les erreurs |
| Plus de notifications après un moment | Réglages, puis **Désactiver sur cet appareil**, puis **Activer** de nouveau |
| L'autre ne reçoit rien | Il doit avoir activé les notifications sur **son** téléphone, et ne pas avoir décoché ce type |
