const CACHE = 'heart-circulation-v3.0-20260711'
const CORE = ['./', './index.html', './structure-manifest.json']
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE))))
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))))
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok && !event.request.url.endsWith('.glb')) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()))
    return response
  })))
})
