import React, { memo } from 'react';

function O({ coords, style }){
	const a = {}, b = coords, c = {}, d = {};
	
	a.y = b.y;
	a.x = c.x = b.x - 10;
	d.y = c.y = b.y + 10;
	d.x = b.x;
	
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