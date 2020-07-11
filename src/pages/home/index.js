import React from 'react';
import { useHistory } from 'react-router-dom';
import { requestFullscreen } from '../../helpers/fullscreen';
import Ads from './ads';

import './styles.css';

export default function Home() {
	const history = useHistory();
	
	return (
		<>
			<header>
				<div class="container">
					<h1 id='title'>Tetris</h1>
				</div>
			</header>
			
			<main id='home-content' className='content'>
				<button onClick={() => {requestFullscreen();history.push('/game')}} className='button large'>Play</button>
				<button onClick={() => history.push('/scores')} className='button large'>Scores</button>
				<button onClick={() => history.push('')} className='button large'>About</button>
				<button onClick={() => history.push('/settings')} className='button large'>Settings</button>
				<Ads/>
			</main>
		</>
	);
}