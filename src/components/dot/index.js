import React from 'react';

import './styles.css';

function Dot({posX, posY}) {
	return (
		<rect x={posX}
			y={posY}
			width='10'
			height='10'
			fill='white'
			className='dot'/>
	);
}

export default Dot;