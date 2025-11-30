// sw.js (Service Worker file)

const CACHE_NAME = 'daily-round-tracker-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install event: Caches your essential app shell files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache during install');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event: Cleans up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event: Network-first strategy with cache fallback
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(fetchResponse => {
        if (!fetchResponse || fetchResponse.status !== 200) {
          return fetchResponse;
        }
        
        const responseToCache = fetchResponse.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        
        return fetchResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
