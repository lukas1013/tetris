import React, { memo } from 'react';
import getBlockCoords from '../helpers/coords/i';

function I({ coords, angle, style }){
	const [a,b,c,d] = getBlockCoords(coords, angle);
	
	return (
		<>
		<rect
			{...a}
			width='10'
			height='10'
			fill='cyan'
			style={style}
			className='dot'/>
		
		<rect {...b}
			width='10'
			height='10'
			fill='cyan'
			style={style}
			className='dot'/>
		
		<rect {...c}
			width='10'
			height='10'
			fill='cyan'
			style={style}
			className='dot'/>
		
		<rect {...d}
			width='10'
			height='10'
			fill='cyan'
			style={style}
			className='dot'/>
		
		</>
	)
}

export default memo(I);