import React, { useState, useEffect } from 'react';

import './styles.css';

export default function Dot({posX, vel = 1}) {
	const [posY, setY] = useState(0);
	
	useEffect(() => {
		
	}, []);
	
	return (
		<rect x={posX}
			y={posY}
			width='10'
			height='10'
			fill='darkgray'
			className='dot'/>
	);
}