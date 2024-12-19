const CACHE_NAME = "khosmix-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles/global.css",
  "/images/Khosmix.jpg",
  // ... outras URLs para cache
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
