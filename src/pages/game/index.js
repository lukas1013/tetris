import React from 'react';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiPlay, FiPause, FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';

import { useGame } from '../../contexts/game';

import './styles.css';

function Game() {
	const { play, pause, isPaused, gTimer, score, poliminos, moveLeft, moveRight, cancelQuickDrop, getDownFaster, clockwiseRotate, antiClockwiseRotate, nextBlocks } = useGame();

	return (
		<>
		<header>
			<div className='container'>
  				<h1 id='title'>Tetris</h1>
  				<span id='level'>Level 1</span>
  				{isPaused ? <FiPlay onClick={play} id='play' /> : <FiPause onClick={pause} id='pause' />}
  			</div>
  		</header>
  		
		<div id='game-content' className='content'>
			<svg version="1.1"
   			xmlns="http://www.w3.org/2000/svg"
   			width='100'
   			height='200'
   			viewBox='0 0 100 200'
   			className='block-container'>
				{poliminos}
			</svg>
			
			<aside id='side'>
				<h3>Score:</h3> 
				<h4>{score}</h4> 
				<h3>Next:</h3>
				<span id='generation-timer'>{gTimer}s</span>
				<svg version='1.1' width='30' height='120' viewBox='0 0 30 120' id='next' className='container'>
					{nextBlocks}
				</svg>
				
			</aside>
			
		</div>
		
		<footer>
			<div className='container'>
			
				<GiAnticlockwiseRotation onClick={antiClockwiseRotate} className='button spin' />
				
				<FiArrowLeftCircle onClick={moveLeft} className='button' />
				
				<FiArrowDownCircle onTouchEnd={cancelQuickDrop} onTouchStart={getDownFaster} className='button' />
				
				<FiArrowRightCircle onClick={moveRight} className='button' />
				
				<GiClockwiseRotation onClick={clockwiseRotate} className='button spin' />
				
			</div>
			
		</footer>
		</>
	);
}

export default Game;