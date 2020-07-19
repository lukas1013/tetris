import React, { useState } from 'react';
import { MdHome, MdRefresh } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import './styles.css';

export default function GameOver(props) {
	const history = useHistory();
	const [display, setDisplay] = useState('flex');

	if (!props.show) return null;
	
	return (
		<div id='modal' style={{display}}>
			<div className='container'>
				<header>
					<div className='container'>
						<h2 id='title'>Game Over</h2>
						<span onClick={() => setDisplay('none')} id='close'>X</span>
					</div>
				</header>
				
				<ul className='content'>
					<li>Playing time:</li>
					<li>{props.playingTime}</li>
					<li>Score:</li>
					<li>{props.score}</li>
					<li>Removed lines:</li>
					<li>{props.deletedLines}</li>
				</ul>
				
				<footer>
					<div className='container'>
						{/*temporary*/}
						<button onClick={() => window.location.reload()}>
							<MdRefresh/>
							Restart
						</button>
						
						<button onClick={() => history.push('/')}>
							<MdHome/>
							Home
						</button>
					</div>
				</footer>
			</div>
		</div>
	);
}