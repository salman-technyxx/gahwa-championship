// register service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('../sw.js')
			.then(
				() => console.log('SW registration successful'),
				err => console.log('SW registration failed: ', err)
			);
	});
}
