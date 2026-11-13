// Qwerbeet als App: erst das Netz fragen (immer die neueste Version), ohne Netz kommt die gespeicherte Fassung.
// Online-Spiele brauchen weiter Internet, alles an einem Gerät läuft auch offline.
const C = 'qwerbeet-v2', FILES = ['./', './index.html', './peerjs.min.js', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// Netz zuerst, aber höchstens 4 s warten: bei sehr schlechtem Netz kommt dann die gespeicherte Fassung (falls vorhanden)
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  const cached = () => caches.match(r, {ignoreSearch: true}).then(m => m || caches.match('./index.html'));
  const net = fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; });
  const slow = new Promise(ok => setTimeout(ok, 4000)).then(() => cached()).then(m => m || net);
  e.respondWith(Promise.race([net.catch(() => cached()), slow]).then(x => x || net));
});
