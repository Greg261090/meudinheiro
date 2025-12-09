self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('meu-dinheiro-v1').then(cache => {
      // Adicionar o CDN do Chart.js para o modo offline
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/icon-256.png',
        '/icons/icon-512.png',
        'https://cdn.jsdelivr.net/npm/chart.js' // Cacheia a biblioteca do gráfico
      ]);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

// Notificações Push (placeholder)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {
    title: 'Meu Dinheiro',
    body: 'Notificação recebida.'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-256.png'
    })
  );
});