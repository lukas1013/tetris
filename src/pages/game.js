import React from 'react';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiPlay, FiPause, FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';

import { useGame } from '../contexts/game';
import Dot from '../components/dot';

function Game() {
	const { play, pause, isPaused, gTimer, poliminos, moveLeft, moveRight, cancelQuickDrop, getDownFaster } = useGame();

	return (
		<>
		<header>
			<div className='container'>
  				<h1 id='title'>Tetris</h1>
  				{isPaused ? <FiPlay onClick={play} id='play' /> : <FiPause onClick={pause} id='pause' />}
  			</div>
  		</header>
  		
		<div className='container'>
			<svg version="1.1"
   			xmlns="http://www.w3.org/2000/svg"
   			width='100'
   			height='200'
   			viewBox='0 0 100 200'
   			className='block-container'>
				{poliminos}
			</svg>
			
			<div id='side'>
				<h3>Score:</h3> 
				<h4>0</h4> 
				<h3>Next:</h3>
				<span id='generation-time'>{gTimer}s</span>
				<svg version='1.1' width='30' height='90' viewBox='0 0 30 90' id='next-container'>
					<Dot style={{
						width: '30%',
						height: '10%'
					}} />
					
					<Dot style={{
						width: '30%',
						height: '10%'
					}} y='20' />
					
					<Dot style={{
						width: '30%',
						height: '10%'
					}} y='40' />
				</svg>
				
			</div>
			
		</div>
		
		<footer>
			<div className='container'>
			
				<GiAnticlockwiseRotation className='button spin' />
				
				<FiArrowLeftCircle onClick={moveLeft} className='button' />
				
				<FiArrowDownCircle onTouchEnd={cancelQuickDrop} onTouchStart={getDownFaster} className='button' />
				
				<FiArrowRightCircle onClick={moveRight} className='button' />
				
				<GiClockwiseRotation className='button spin' />
				
			</div>
			
		</footer>
		</>
	);
}

export default Game;