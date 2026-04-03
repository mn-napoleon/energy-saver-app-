const CACHE_NAME = "energy-saver-v2"; //  change version when you update app

const urlsToCache = [
  "/",
  "index.html",
  "style.css",
  "script.js",
  "energy-logo.png"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting(); //  force new version immediately

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); //  delete old cache
          }
        })
      );
    })
  );

  self.clients.claim(); //  take control immediately
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});