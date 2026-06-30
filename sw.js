// Service worker StratiBuddy — cache-first, 100% hors ligne après la première visite.
const CACHE_NAME = 'stratibuddy-v3';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './src/app.js',
  './src/styles.css',
  './assets/app-icon.svg',
  './assets/logo.svg',
  './assets/monogram.svg',
  './assets/banniere.png',
  './assets/Picto_Altis.svg',
  './assets/Picto_Harris.svg',
  './assets/Picto_Mémo.svg',
  './assets/icons/icon-192-v2.png',
  './assets/icons/icon-512-v2.png',
  './assets/icons/icon-192-maskable-v2.png',
  './assets/icons/icon-512-maskable-v2.png',
  './assets/icons/apple-touch-icon-v2.png',
  './assets/fonts/Fraunces-latin.woff2',
  './assets/fonts/Fraunces-latin-ext.woff2',
  './assets/fonts/SourceSans3-latin.woff2',
  './assets/fonts/SourceSans3-latin-ext.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((noms) => Promise.all(
        noms.filter((nom) => nom !== CACHE_NAME).map((nom) => caches.delete(nom))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((reponseCache) => {
      if (reponseCache) return reponseCache;

      return fetch(event.request)
        .then((reponseReseau) => {
          const copie = reponseReseau.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copie));
          return reponseReseau;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
