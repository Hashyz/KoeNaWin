// sw.js (Service Worker file)

const CACHE_NAME = 'daily-round-tracker-v3'; // IMPORTANT: Increment cache version after changes!
const urlsToCache = [
  '/', // Caches the root HTML file for your GitHub Pages project
  '/KoeNaWin/', // If your project is in a subfolder, include this as the start URL
  '/KoeNaWin/index.html', // Specific path to your index.html
  '/KoeNaWin/manifest.json', // Manifest file
  // Add paths to your icon files here if you have them:
  // '/KoeNaWin/icons/icon-192x192.png',
  // '/KoeNaWin/icons/icon-512x512.png',
];

// Install event: Caches your OWN essential app shell files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache during install');
        // Cache only your direct project assets here.
        // CDN links are now handled in the fetch event for more flexibility.
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activates the service worker immediately
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

// Fetch event: Intercepts network requests and implements cache-first strategy
self.addEventListener('fetch', event => {
  // IMPORTANT: Only process http/https requests, ignore chrome-extension://, etc.
  if (!event.request.url.startsWith('http')) {
    return; // Skip non-http(s) requests
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request).then(
          fetchResponse => {
            // Check if we received a valid response that is cacheable
            if(!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type === 'opaque') {
              return fetchResponse;
            }
            // IMPORTANT: Clone the response. A response is a stream
            // and can only be consumed once.
            const responseToCache = fetchResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return fetchResponse;
          }
        );
      })
  );
});
