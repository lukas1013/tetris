import React, { memo } from 'react';

import './styles.css';

function T(props){
	return (
		<>
		<rect
			{...props.coords[0]}
			width='10'
			height='10'
			fill='yellow'
			style={props.style}
			className='dot'/>
		
		<rect {...props.coords[1]}
			width='10'
			height='10'
			fill='yellow'
			style={props.style}
			className='dot'/>
		
		<rect {...props.coords[2]}
			width='10'
			height='10'
			fill='yellow'
			style={props.style}
			className='dot'/>
		
		<rect {...props.coords[3]}
			width='10'
			height='10'
			fill='yellow'
			style={props.style}
			className='dot'/>
		
		</>
	)
}
export default memo(T);