// =============================================
// SAFELY — Service Worker (PWA Offline Cache)
// =============================================
const CACHE_NAME = "safely-cache-v1";

// Senarai fail yang akan dicache untuk guna tanpa internet
const FAIL_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    // Fonts Google (dicache setelah muat turun pertama)
    "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap",
    // Audio
    "./audio/bgm.mp3",
    "./audio/click.mp3",
    "./audio/betul.mp3",
    "./audio/salah.mp3",
    // Watak
    "./assets/characters/boy_welcome.png",
    "./assets/characters/girl_welcome.png",
    "./assets/characters/boy_trophy.png",
    "./assets/characters/girl_trophy.png",
    "./assets/characters/boy_wrong.png",
    "./assets/characters/girl_wrong.png",
    // Latarbelakang
    "./assets/backgrounds/bg_utama.png",
    // Situasi soalan
    "./assets/situasi/situasi1.png",
    "./assets/situasi/situasi2.png",
    "./assets/situasi/situasi3.png",
    "./assets/situasi/situasi4.png",
    "./assets/situasi/situasi5.png",
    "./assets/situasi/situasi6.png",
    "./assets/situasi/situasi7.png",
    "./assets/situasi/situasi8.png",
    "./assets/situasi/situasi9.png",
    "./assets/situasi/situasi10.png",
    "./assets/situasi/situasi11.png",
    "./assets/situasi/situasi12.png",
    "./assets/situasi/situasi13.png",
    "./assets/situasi/situasi14.png",
    "./assets/situasi/situasi15.png"
];

// Pasang: cache semua fail penting
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FAIL_CACHE.map(url => {
                // Cuba cache setiap fail, abaikan jika gagal (contoh: gambar belum ada)
                return cache.add(url).catch(() => {});
            }));
        }).then(() => self.skipWaiting())
    );
});

// Aktif: buang cache lama
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: hidangkan dari cache dulu, kemudian internet
self.addEventListener("fetch", event => {
    // Langkau permintaan bukan GET
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            // Tidak ada dalam cache — cuba ambil dari internet dan cache
            return fetch(event.request).then(response => {
                // Hanya cache respons yang berjaya
                if (!response || response.status !== 200 || response.type === "opaque") {
                    return response;
                }
                const responseKlon = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseKlon);
                });
                return response;
            }).catch(() => {
                // Tiada internet & tiada cache — hidangkan halaman utama sebagai fallback
                return caches.match("./index.html");
            });
        })
    );
});
