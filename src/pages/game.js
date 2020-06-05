import React, { useState, useEffect, useRef } from 'react';
import { GiPauseButton, GiPlayButton, GiAnticlockwiseRotation, GiClockwiseRotation } from 'react-icons/gi';
import { FiArrowLeftCircle, FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi';

import { useGame } from '../contexts/game';
import Dot from '../components/dot';

function Game() {
	const { poliminosData, cancelMove, moveLeft, moveRight } = useGame();
	
	return (
		<>
		<header>
  			<h1 id='title'>Tetris</h1>
  		</header>
  		
		<div className='container'>
			<svg version="1.1"
   			xmlns="http://www.w3.org/2000/svg"
   			width='100'
   			height='200'
   			viewBox='0 0 100 200'
   			className='block-container'>
				{
					poliminosData.map((item, key) => {
						switch (item.type) {
							case 'dot':
								return <Dot key={key} {...item} />
								break;
							
							default:
								// code
						}
					})
				}
			</svg>
		</div>
		
		<footer>
			<div className='container'>
			
				<GiAnticlockwiseRotation className='button spin' />
				
				<FiArrowLeftCircle onTouchEnd={cancelMove} onTouchStart={moveLeft} className='button' />
				
				<FiArrowDownCircle className='button' />
				
				<FiArrowRightCircle onTouchEnd={cancelMove} onTouchStart={moveRight} className='button' />
				
				<GiClockwiseRotation className='button spin' />
				
			</div>
			
		</footer>
		</>
	);
}

export default Game;