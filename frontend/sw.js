/* global self */

const CACHE_NAME = 'gahwa-cache-v2';
const urlsToCache = [
	'css/main.en.css',
	'css/main.ar.css',
	'js/main.js',
	'img/logo/logo-en-color.svg',
	'img/logo/logo-en-white.svg',
	'img/logo/logo-ar-color.svg',
	'img/logo/logo-ar-white.svg',
	'fonts/Effra-Regular.woff',
];

// cache files locally
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
	);
});
// fetch files in next reload or offline
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then(cachedResponse => cachedResponse || fetch(event.request))
	);
});
