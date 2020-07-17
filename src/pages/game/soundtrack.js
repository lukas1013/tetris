import React, { memo, useEffect, useRef } from 'react';

import track_01 from '../../assets/track_01.mp3';
import track_02 from '../../assets/track_02.mp3';

function Soundtrack({ paused, ended }) {
	const audioRef = useRef(null);
	
	useEffect(() => {
		if (paused && audioRef.current) {
			audioRef.current.pause();
		}
		
		if (!paused && audioRef.current) {
			audioRef.current.play();
		}
		
	}, [paused]);
	
	useEffect(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new window.MediaMetadata({
				title: `Tetris - soundtrack ${localStorage.getItem('track') ?? 1}`
			});
		}
	}, []);
	
	if (ended) return null;
	
	return (
		<audio ref={audioRef} crossOrigin='anonymous' autoPlay loop>
			<source src={localStorage.getItem('track') === '2' ? track_02 : track_01} type='audio/mpeg'/>
		</audio>
	);
}

export default memo(Soundtrack);