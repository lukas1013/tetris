import React, { memo } from 'react';
import getBlockCoords from '../../helpers/coords/';

import Polyline from './Polyline';

function Polimino({ type, coords, angle, color, removeds, style, focus }){
	const r = removeds || [];
	const [a,b,c,d] = r.length ? coords : getBlockCoords(type, coords, angle)
	
	return (
		<>
		
		{focus && <Polyline type={type} coords={b} angle={angle} stroke='#A544FF'/>}
		
		{!r.includes(0) && <rect
			{...a}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		}
		
		{!r.includes(1) && <rect {...b}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		}
		
		{!r.includes(2) && <rect {...c}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		}
		
		{!r.includes(3) && <rect {...d}
			width='10'
			height='10'
			fill={color}
			style={style}
			className='dot'/>
		}
		
		</>
	)
}

export default memo(Polimino);