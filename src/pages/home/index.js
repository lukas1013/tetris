import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestFullscreen } from '../../helpers/fullscreen';
import Ads from './ads';

import './styles.css';

const AboutModal = React.lazy(() => import('./modal/About'));

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const history = useHistory();
	
	return (
		<>
			<header>
				<div className="container">
					<h1 id='title'>Tetris</h1>
				</div>
			</header>
			
			<main id='home-content' className='content'>
				<AboutModal show={showModal} />
				
				<button onClick={() => {requestFullscreen();history.push('/game')}} className='button large'>Play</button>
				<button onClick={() => history.push('/scores')} className='button large'>Scores</button>
				<button onClick={() => setShowModal(true)} className='button large'>About</button>
				<button onClick={() => history.push('/settings')} className='button large'>Settings</button>
				<Ads/>
			</main>
		</>
	);
}