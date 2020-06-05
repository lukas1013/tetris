import React, { useState, useEffect, useRef } from 'react';
import { GiPauseButton, GiPlayButton, GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';

import './styles.css';

import Dot from './components/dot';
//import Footer from './components/footer';

function App() {
	const ref = useRef(null);
	const pieceRef = useRef(null);
	const [posX, setX] = useState(40);

	const [moving, setMoving] = useState(false)

	useEffect(() => {
		console.log('moving...')
		let newX = posX + 10;
		if (newX < 100) {
			moving && setTimeout(() => {
				setX(newX);
			}, 100);
		}
	}, [moving, posX]);
	
	function toLeftTouchStart(e) {
		setMoving(true)
	}
	
	function toLeftTouchEnd(e) {
		setMoving(false)
	}
	
  return (
  		<>
  		
  		<header>
  			<h1 id='title'>Tetris</h1>
  		</header>
  		
		<div ref={ref} className='container'>
			<svg version="1.1"
   			xmlns="http://www.w3.org/2000/svg"
   			width='100'
   			height='200'
   			viewBox='0 0 100 200'
   			className='block-container'>
				<Dot focused={pieceRef} posX={posX}/>
			</svg>
		</div>
		
		<footer>
			<div className='container'>
			
				<GiAnticlockwiseRotation className='button spin' />
				
				<FiArrowLeftCircle className='button' />
				
				<FiArrowDownCircle className='button' />
				
				<FiArrowRightCircle onTouchEnd={toLeftTouchEnd} onTouchStart={toLeftTouchStart} className='button' />
				
				<GiClockwiseRotation className='button spin' />
				
			</div>
			
		</footer>

		</>
  );
}

export default App;
