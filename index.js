// Foyer à deux : notifie le partenaire quand l'autre ajoute une tâche, un rendez-vous,
// une dépense ou un remboursement, un projet, ou termine les courses.
// L'appli écrit un document dans la collection "activity" ; cette fonction l'envoie
// par Firebase Cloud Messaging aux appareils enregistrés dans "pushTokens".
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');
const { recipients } = require('./recipients');

initializeApp();
const SITE = 'https://alcor-cyber.github.io/Maison-a-Deux/';
const DEAD = ['messaging/registration-token-not-registered', 'messaging/invalid-registration-token', 'messaging/invalid-argument'];

exports.notifyPartner = onDocumentCreated({ document: 'activity/{id}', region: 'europe-west1' }, async event => {
  const a = event.data && event.data.data();
  if (!a || !a.by) return;
  const db = getFirestore();
  const [tokSnap, prefSnap] = await Promise.all([db.collection('pushTokens').get(), db.collection('prefs').get()]);
  const tokens = tokSnap.docs.map(d => ({ id: d.id, email: d.data().email }));
  const prefs = Object.fromEntries(prefSnap.docs.map(d => [d.id, d.data()]));
  const to = recipients(a, tokens, prefs);
  if (!to.length) return;
  const res = await getMessaging().sendEachForMulticast({
    tokens: to,
    notification: { title: a.title || 'Foyer à deux', body: a.body || '' },
    webpush: {
      notification: { icon: SITE + 'icon-192.png', badge: SITE + 'icon-192.png' },
      fcmOptions: { link: SITE + (a.route ? '#' + a.route : '') },
    },
  });
  // ménage : un appareil désinstallé ou une autorisation retirée rend son jeton invalide
  await Promise.all(res.responses.map((r, i) => (!r.success && r.error && DEAD.includes(r.error.code))
    ? db.collection('pushTokens').doc(to[i]).delete() : null));
});
