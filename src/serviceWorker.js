export default function registerWorker() {
	if ('serviceWorker' in navigator) {
		window.onload = function() {
			navigator.serviceWorker.register('/service-worker.js')
				.catch(err => {
					console.log(err.message)
				})
		}
	}
}