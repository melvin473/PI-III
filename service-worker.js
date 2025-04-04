const CACHE_NAME = 'diario-autista';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/main.js',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
];

// Instala o service worker e armazena os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativa o service worker e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(name => {
        if (name !== CACHE_NAME) return caches.delete(name);
      })
    ))
  );
});

// Intercepta requisições e responde com cache se disponível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
