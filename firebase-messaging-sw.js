// Reçoit les notifications quand l'appli est fermée (Firebase Cloud Messaging).
// Ce fichier doit rester à côté de index.html et de firebase-config.js.
self.window = self; // firebase-config.js écrit dans window.FIREBASE_CONFIG
importScripts('firebase-config.js');
importScripts(
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js'
);
firebase.initializeApp(self.FIREBASE_CONFIG);
// Les messages envoyés par la fonction notifyPartner contiennent un bloc "notification" :
// Firebase les affiche tout seul, et un toucher ouvre l'appli sur la bonne page.
firebase.messaging();
