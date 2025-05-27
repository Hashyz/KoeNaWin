// sw.js (Service Worker file)

const CACHE_NAME = 'daily-round-tracker-v2'; // IMPORTANT: Increment cache version after changes!
const urlsToCache = [
  '/', // Caches the root HTML file for your GitHub Pages project
  '/KoeNaWin/', // If your project is in a subfolder, include this as the start URL
  '/KoeNaWin/index.html', // Specific path to your index.html
  // '/KoeNaWin/icons/icon-192x192.png', // Assuming you've created these
  // '/KoeNaWin/icons/icon-512x512.png',
  // IMPORTANT: Remove the direct CDN link from here
  // 'https://cdn.tailwindcss.com/', // <-- REMOVE THIS LINE
  // 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap', // <-- REMOVE THIS LINE
];

// Cache all external resources on fetch, for a "cache-first, then network" strategy
// This is a common strategy for external assets like CDNs.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // If we have a cached response, return it
      if (response) {
        return response;
      }
      // Otherwise, try to fetch from the network
      return fetch(event.request).then(
        fetchResponse => {
          // If we get a valid response, and it's for a non-opaque (cacheable) resource
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type === 'opaque') {
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

// Activate event: Cleans up old caches (this remains the same)
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
