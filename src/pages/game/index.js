import React, { memo } from 'react';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiPlay, FiPause, FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';

import { useGame } from '../../contexts/game';
import parseTime from '../../utils/time';

import './styles.css';

const GameOverModal = React.lazy(() => import('./modal/GameOver'));

function Game() {
	const { level, play, pause, isPaused, ended, playingTime, deletedLines, gTimer, score, poliminos, moveLeft, moveRight, cancelQuickFall, getDownFaster, clockwiseRotate, antiClockwiseRotate, nextBlocks } = useGame();
	
	return (
		<>
		<header>
			<div className='container'>
  				<h1 id='title'>Tetris</h1>
  				{isPaused ? <FiPlay onClick={play} id='play' /> : <FiPause onClick={pause} id='pause' />}
  			</div>
  		</header>
  		
  		<GameOverModal show={ended} playingTime={parseTime(playingTime)} score={score} deletedLines={deletedLines}/>
  		
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
				<div className='container'>
					<h3>Playing Time:</h3> 
					<h4>{parseTime(playingTime)}</h4> 
	  				<h3 id='level'>Level:</h3>
	  				<h4>{level}</h4>
					<h3>Score:</h3> 
					<h4>{score}</h4> 
					<h3>Next:</h3>
					<span>{gTimer}s</span>
					<svg version='1.1' width='40' height='120' viewBox='0 0 40 120' id='next' className='container'>
						{nextBlocks}
					</svg>
				</div>
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

export default memo(Game);