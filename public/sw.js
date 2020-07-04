const CACHE_VERSION = 'v1';
const CACHE_NAME = 'tetris-20' + CACHE_VERSION;

self.oninstall = function(event) {
	event.waitUltil(caches.open(CACHE_NAME).then(cache => {
		cache.addAll(['/', '/static/', '/css2?family=Roboto+Condensed', '/css2?family=Noto+Serif']);	
	}));
}

self.onfetch = function(event) {
	event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
}

self.onativate = function(event) {
	const whiteList = [CACHE_NAME];
	
	event.waitUltil(caches.keys().then(keylist => {
		return Promise.all(keylist.map(key => {
			if (whiteList.indexOf(key) === -1) {
				return caches.delete(key);
			}
		}))
	}));
}