// sw.js (Service Worker file)

const CACHE_NAME = 'daily-round-tracker-v1'; // Update version when you change app files
const urlsToCache = [
  '/', // Caches the root HTML file
  'index.html', // Or your main HTML file name
  'https://cdn.tailwindcss.com', // Tailwind CSS CDN
  'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap', // Google Fonts CSS
  // You might also need to cache the font files themselves if you want to be truly offline for fonts:
  // 'https://fonts.gstatic.com/s/quicksand/v31/6xKtdSZaM9iE8KbpRA_RKe_T.woff2', // Example Quicksand woff2 (check actual URL from dev tools)
  // Add any other specific assets like images if you had them
];

// Install event: Caches all essential app shell files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activates the service worker immediately
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
    .then(() => self.clients.claim()) // Takes control of pages right away
  );
});

// Fetch event: Intercepts network requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // IMPORTANT: Clone the response. A response is a stream
            // and can only be consumed once. We need to consume the stream
            // once to return the response to the browser and once to cache it.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});