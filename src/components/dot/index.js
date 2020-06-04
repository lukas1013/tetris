import React, { useState, useEffect } from 'react';

export default function Dot({posX, vel = 1}) {
	const [posY, setY] = useState(0);
	
	useEffect(() => {
		
	});
	
	return (
		<rect x={posX} y={posY} width='1' height='1'/>
	);
}