const CACHE_NAME = 'pelatihan-v1';
const BASE_PATH = '/TraineesData/';  // TAMBAHKAN INI
const urlsToCache = [
  BASE_PATH,
  BASE_PATH + '/index.html',
  BASE_PATH + '/styles.css',
  BASE_PATH + '/app.js',
  BASE_PATH + '/icons/icon-72x72.png',
  BASE_PATH + '/icons/icon-96x96.png',
  BASE_PATH + '/icons/icon-128x128.png',
  BASE_PATH + '/icons/icon-144x144.png',
  BASE_PATH + '/icons/icon-152x152.png',
  BASE_PATH + '/icons/icon-192x192.png',
  BASE_PATH + '/icons/icon-384x384.png',
  BASE_PATH + '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});