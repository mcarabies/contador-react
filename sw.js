const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./styles.css",
  "./components/Contador.js",
  "./favicon.png",
];

const CACHE_NAME = "v3_cache_contador_react";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});


self.addEventListener("activate", (e) => {
   
    const cacheWhitelist = [CACHE_NAME];
   
    e.waitUntil(
      caches.keys().then((cacheNames) => {
          return Promise.all(cacheNames.map((cacheName) => {
              cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
          }))
      }).then(() => self.clients.claim())
    );
  });


  self.addEventListener("fetch", (e) => {
   e.respondWith(
       caches.match(e.request).then(resp => {
        if (resp){
            return resp;
        }
        return fetch(e.request);
       }));
  });