import React, { useState, useEffect } from 'react';

//import {useGame} from '../../contexts/game';

import './styles.css';

export default function Dot({posX, vel = 1}) {
	//const {moving} = useGame()
	const [posY, setY] = useState(0);
	
	useEffect(() => {
		let timer;
		
		if (posY === 190) 
			return clearTimeout(timer);
			
		timer = setTimeout(() => {
			setY(posY + 10)
		}, 1500 * vel);
	}, [posY]);
	
	return (
		<rect x={posX}
			y={posY}
			width='10'
			height='10'
			fill='white'
			className='dot'/>
	);
}