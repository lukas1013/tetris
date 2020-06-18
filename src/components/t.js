import React, { memo } from 'react';
import getBlockCoords from '../helpers/coords/t';

function T({ coords, angle, color, style }){
	const [a,b,c,d] = getBlockCoords(coords, angle);
	
	return (
		<>
		<rect
			{...a}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		
		<rect {...b}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		
		<rect {...c}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		
		<rect {...d}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		
		</>
	)
}

export default memo(T);