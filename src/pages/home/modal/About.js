import React from 'react';
import { FaGithub } from 'react-icons/fa';

import './styles.css';

export default function About({ show, children }) {
	if (!show) return null;
	
	return (
		<div id='about-modal'>
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
				{children}
			</footer>
		</div>
	);
}