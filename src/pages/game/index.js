import React from 'react';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiPlay, FiPause, FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';
import { addSeconds, format } from 'date-fns';

import { useGame } from '../../contexts/game';

import './styles.css';

const GameOverModal = React.lazy(() => import('./modal/GameOver'));

function Game() {
	const { play, pause, isPaused, ended, playingTime, deletedLines, gTimer, score, poliminos, moveLeft, moveRight, cancelQuickFall, getDownFaster, clockwiseRotate, antiClockwiseRotate, nextBlocks } = useGame();
	
	function timer() {
		return format(addSeconds(new Date(0), playingTime), 'mm:ss')
	}
	
	return (
		<>
		<header>
			<div className='container'>
  				<h1 id='title'>Tetris</h1>
  				<span id='level'>Level 1</span>
  				{isPaused ? <FiPlay onClick={play} id='play' /> : <FiPause onClick={pause} id='pause' />}
  			</div>
  		</header>
  		
  		<GameOverModal show={ended} playingTime={timer()} deletedLines={deletedLines}/>
  		
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
				<h3>Playing Time:</h3> 
				<h4>{timer()}</h4> 
				<h3>Score:</h3> 
				<h4>{score}</h4> 
				<h3>Next:</h3>
				<span>{gTimer}s</span>
				<svg version='1.1' width='40' height='120' viewBox='0 0 40 120' id='next' className='container'>
					{nextBlocks}
				</svg>
				
			</aside>
			
		</div>
		
		<footer>
			<div className='container'>
			
				<GiAnticlockwiseRotation onClick={antiClockwiseRotate} className='button spin' />
				
				<FiArrowLeftCircle onClick={moveLeft} className='button' />
				
				<FiArrowDownCircle onTouchEnd={cancelQuickFall} onTouchStart={getDownFaster} className='button' />
				
				<FiArrowRightCircle onClick={moveRight} className='button' />
				
				<GiClockwiseRotation onClick={clockwiseRotate} className='button spin' />
				
			</div>
			
		</footer>
		</>
	);
}

export default Game;