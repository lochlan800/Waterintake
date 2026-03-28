const CACHE_NAME = 'water-tracker-v1';
const ASSETS = [
  '/Waterintake/',
  '/Waterintake/index.html',
  '/Waterintake/manifest.json',
  '/Waterintake/icon-192.png',
  '/Waterintake/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
