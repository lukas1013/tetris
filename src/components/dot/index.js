import React, { memo } from 'react';

import './styles.css';

const Dot = props => (
	<rect {...props.coords}
		width='10'
		height='10'
		fill={props.fill || 'white'}
		style={props.style}
		className='dot'/>
)

export default memo(Dot);