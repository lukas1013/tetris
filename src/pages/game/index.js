import React, { useEffect, memo } from 'react';
import { GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiPlay, FiPause, FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';
import { MdHome } from 'react-icons/md';

import { useGame } from '../../contexts/game';
import { useHistory } from 'react-router-dom';
import { exitFullscreen } from '../../helpers/fullscreen';
import parseTime from '../../utils/time';

import './styles.css';

const GameOverModal = React.lazy(() => import('./modal/GameOver'));
const Soundtrack = React.lazy(() => import('./soundtrack'));

function Game() {
	const { soundEnabled, level, start, play, pause, isPaused, ended, playingTime, deletedLines, gTimer, score, poliminos, moveLeft, moveRight, cancelQuickFall, getDownFaster, clockwiseRotate, antiClockwiseRotate, nextBlocks } = useGame();
	const history = useHistory();
	
	useEffect(() => {
		start()
	}, [start]);
	
	return (
		<>
		<header>
			<div className='container'>
  				<h1 id='title'>Tetris</h1>
  				<MdHome onClick={() => {exitFullscreen();history.push('/')}} id='home'/>
  				{isPaused ? <FiPlay onClick={play} id='play' /> : <FiPause onClick={pause} id='pause' />}
  			</div>
  		</header>
  		
  		{soundEnabled && <Soundtrack paused={isPaused} ended={ended}/>}
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