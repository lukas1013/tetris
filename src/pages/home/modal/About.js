import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import './styles.css';

export default function About(props) {
	const [display, setDisplay] = useState('flex');
	
	if (!props.show) return null;
	
	return (
		<div id='about-modal' style={{display}}>
			<header>
				<div className='container'>
					<h2 id='modal-title'>About</h2>
				</div>
			</header>
			
			<div className='content'>
				<p>
					This game was recreated in order
					to improve and show my programming skills.
				</p>
				
				<a id='github-link' href='https://github.com/lukas1013/tetris' target='_blank' rel='noreferrer noopener'>
					<FaGithub id='github'/> Github
				</a>
			</div>
			
			<footer>
				<button className='button large' id='ok-modal' onClick={() => setDisplay('none')}>
					Ok
				</button>
			</footer>
		</div>
	);
}