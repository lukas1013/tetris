import React from 'react';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiPlay, FiPause, FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';

import { useGame } from '../../contexts/game';
import Dot from '../../components/dot';
import T from '../../components/t';

import './styles.css';

function Game() {
	const { play, pause, isPaused, gTimer, poliminos, moveLeft, moveRight, cancelQuickDrop, getDownFaster, clockwiseRotate, antiClockwiseRotate } = useGame();

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
			
			<div id='side'>
				<h3>Score:</h3> 
				<h4>0</h4> 
				<h3>Next:</h3>
				<span id='generation-time'>{gTimer}s</span>
				<svg version='1.1' width='30' height='90' viewBox='0 0 30 90' id='next-container'>
					<T fill='yellow' coords={[{
						x: 0,
						y: 0
					},{
						x: 10,
						y: 0
					},{
						x: 20,
						y: 0
					},{
						x: 10,
						y: 10
					}]} style={{
						width: '30%',
						height: '10%'
					}} />
					
					<Dot style={{
						width: '30%',
						height: '10%'
					}} coords={{x: 10, y: '30'}} />
					
					<Dot style={{
						width: '30%',
						height: '10%'
					}} coords={{x: 10, y: '50'}} />
				</svg>
				
			</div>
			
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