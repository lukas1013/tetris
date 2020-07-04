
export function registerWorker() {
	if ('serviceWorker' in window) {
		window.onload = function() {
			navigator.serviceWorker.register('/sw.js').then(registration => {
				alert(JSON.stringify(registration))
			}).catch(err => {
				alert(JSON.stringify(err))
			})
		}
	}
}