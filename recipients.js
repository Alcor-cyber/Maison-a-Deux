// Choisit les appareils à prévenir pour une activité.
// activity : { type, by }  ·  tokens : [{ id, email }]  ·  prefs : { [email]: { mute: { [type]: true } } }
// - jamais l'auteur de l'action, sauf pour la notification de test ;
// - pas les personnes qui ont coupé ce type de notification.
function recipients(activity, tokens, prefs) {
  const isTest = activity.type === 'test';
  return tokens
    .filter(t => (isTest ? t.email === activity.by : t.email !== activity.by))
    .filter(t => isTest || !((prefs[t.email] || {}).mute || {})[activity.type])
    .map(t => t.id);
}
module.exports = { recipients };
