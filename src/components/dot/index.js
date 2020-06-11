import React, { memo } from 'react';

import './styles.css';

const Dot = props => (
	<rect {...props}
		width='10'
		height='10'
		fill='white'
		className='dot'/>
)

export default memo(Dot);