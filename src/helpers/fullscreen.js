export function requestFullscreen() {
	const enabled = JSON.parse(localStorage.getItem('fullscreen'));
	const html = document.documentElement;
	html.requestFullscreen = html.requestFullscreen || html.mozRequestFullScreen || html.webkitRequestFullscreen || html.msRequestFullscreen || html.oRequestFullscreen;
	
	if (enabled) {
		try{
			html.requestFullscreen({ navigationUI: 'hide' })
		}catch(err) {
			console.log(err.message)
		}
	}
}

export function exitFullscreen() {
	document.fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
	document.exitFullscreen = document.exitFullscreen || document.msExitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;

	if (document.fullscreenElement) {
		try{
			document.exitFullscreen();
		}catch(e) {
			console.log(e.message)
		}
	}
}