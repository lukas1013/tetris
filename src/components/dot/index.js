import React, { useState, useEffect } from 'react';

//import {useGame} from '../../contexts/game';

import './styles.css';

export default function Dot({posX, speed}) {
	//const { gameSpeed } = useGame();
	const [posY, setY] = useState(0);
	
	useEffect(() => {
		let timer;
		
		if (posY === 190) 
			return clearTimeout(timer);
			
		timer = setTimeout(() => {
			setY(posY + 10)
		}, speed);
	}, [posY]);
	
	//console.log('Dot')
	
	return (
		<rect x={posX}
			y={posY}
			width='10'
			height='10'
			fill='white'
			className='dot'/>
	);
}