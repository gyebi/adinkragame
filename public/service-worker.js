const CACHE_NAME = "adinkra-game-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/game.js",
  "/stylesheet.css",
  "/adinkra_symbols.jpeg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});