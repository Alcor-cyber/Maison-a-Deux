// Sauvegarde en ligne et partage entre vous deux (Firebase, projet foyer-a-deux).
// Ces valeurs ne sont pas secrètes : l'accès aux données est protégé par les règles Firestore
// (seuls vos deux comptes) et par vos mots de passe.
// Pour revenir au fonctionnement sans compte (données de chaque appareil), remplacez l'objet par null.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCK8Z3aOZ4SiCWz6PUo3Nn1h5AwrzTp3ss",
  authDomain: "foyer-a-deux.firebaseapp.com",
  projectId: "foyer-a-deux",
  storageBucket: "foyer-a-deux.firebasestorage.app",
  messagingSenderId: "646325751496",
  appId: "1:646325751496:web:88edd243f6f41c0e5c1ffd"
};

// Notifications : clé publique « Web Push » (Paramètres du projet → Cloud Messaging → Certificats Web Push).
// Tant qu'elle vaut null, le bouton « Activer les notifications » explique qu'il manque cette clé.
window.FIREBASE_VAPID_KEY = "BAARYQ0WgYJiRaRZJWlxvB6QgDh_BejqSaIAI0BJb-c08sZ-yYe5pc4k3ktXjn6N31sdz5hLGV5aSiUgST7kAng";
