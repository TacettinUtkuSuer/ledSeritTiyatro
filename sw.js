/* LED Tiyatro — Service Worker: GitHub Pages'te bir kez açıldıktan sonra internetsiz çalışma */
const CACHE = 'ledtiyatro-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return; // WLED cihaz istekleri asla önbelleğe alınmaz
  if (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    // Ağ öncelikli (güncellemeler için), 3 sn içinde yanıt yoksa veya çevrimdışıysa önbellek
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 3000);
        const res = await fetch(req, { signal: ctl.signal }); clearTimeout(t);
        if (res.ok) cache.put('./index.html', res.clone());
        return res;
      } catch {
        return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }
  // Diğer dosyalar: önbellek öncelikli, arka planda güncelle
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
    const net = fetch(req).then(res => { if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())); return res; }).catch(() => hit);
    return hit || net;
  }));
});
