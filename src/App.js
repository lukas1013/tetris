import React from 'react';
import { GiPauseButton, GiPlayButton, GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';
import './styles.css';

function App() {
  return (
  		<>
  		
  		<header>
  			<h1 id='title'>Tetris</h1>
  		</header>
  		
		<div className='container'>
		
		</div>
		
		<footer>
			<div className='container'>
			
				<GiAnticlockwiseRotation className='button' />
				
				<FiArrowLeftCircle className='button' />
				
				<FiArrowDownCircle className='button' />
				
				<FiArrowRightCircle className='button' />
				
				<GiClockwiseRotation className='button' />
				
			</div>
		</footer>
		
		</>
  );
}

export default App;
