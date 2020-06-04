import React, { useState, useEffect, useRef } from 'react';
import { GiPauseButton, GiPlayButton, GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';

import './styles.css';

import Dot from './components/dot';

function App() {
	const ref = useRef(null);
	const [tableWidth, setTW] = useState(0);
	const [tableHeight, setTH] = useState(0);
	
	useEffect(() => {
		const {width: w, height: h} = ref.current.getBoundingClientRect();
		
		//alert(h)
	}, []);
	
  return (
  		<>
  		
  		<header>
  			<h1 id='title'>Tetris</h1>
  		</header>
  		
		<div ref={ref} className='container'>
			<svg version="1.1"
   			baseProfile="full"
   			xmlns="http://www.w3.org/2000/svg"
   			width='100'
   			height='100'
   			fill='darkcyan'
   			className='block-container'
   			viewBox='0 0 100 100'>
				<Dot posX='0'/>
			</svg>
		</div>
		
		<footer>
			<div className='container'>
			
				<GiAnticlockwiseRotation className='button spin' />
				
				<FiArrowLeftCircle className='button' />
				
				<FiArrowDownCircle className='button' />
				
				<FiArrowRightCircle className='button' />
				
				<GiClockwiseRotation className='button spin' />
				
			</div>
		</footer>
		
		</>
  );
}

export default App;
