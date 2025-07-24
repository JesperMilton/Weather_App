const swVersion = "v1";
const cacheName = `offline-cache-${swVersion}`;

async function networkResponse(request) {
  try {
    return await fetch(request);
  } catch (e) {
    const cache = await caches.open(cacheName);
    return await cache.match("./offline.html");
  }
}

async function preCache() {
  const cache = await caches.open(cacheName);
  await cache.add("./offline.html");
}

self.addEventListener("install", async (event) => {
  event.waitUntil(preCache());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(networkResponse(event.request));
});