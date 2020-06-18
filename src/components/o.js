import React, { memo } from 'react';
import getBlockCoords from '../helpers/coords/o';

function O({ coords, style }){
	const [a,b,c,d] = getBlockCoords(coords)
	
	return (
		<>
		<rect
			{...a}
			width='10'
			height='10'
			fill='green'
			style={style}
			className='dot'/>
		
		<rect {...b}
			width='10'
			height='10'
			fill='green'
			style={style}
			className='dot'/>
		
		<rect {...c}
			width='10'
			height='10'
			fill='green'
			style={style}
			className='dot'/>
		
		<rect {...d}
			width='10'
			height='10'
			fill='green'
			style={style}
			className='dot'/>
		
		</>
	)
}
export default memo(O);