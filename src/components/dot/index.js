import React, { memo } from 'react';

import './styles.css';

const Dot = ({posX, posY}) => (
	<rect x={posX} 
		y={posY}
		width='10'
		height='10'
		fill='white'
		className='dot'/>
)

export default memo(Dot);