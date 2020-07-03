import React, { memo } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaCrown } from 'react-icons/fa';

import { useScore } from '../../contexts/score';

import './styles.css';

function Scores(props) {
	const { scores, deleteScore } = useScore();

	return (
		<>
			<header>
				<div className='container'>
					<h1 id='title'>Scores</h1>
				</div>
			</header>
			
			<main id='score-content'>
				<span className={!scores.length ? 'on' : 'off'} id='no-content'>There are no scores to show</span>
				
				{scores.map((score, key) => (
					<article className='score' key={key}>
						<header>
							<div className='container'>
								{key === 0 && <FaCrown className='icon crown'/>}
								<h2 className='icon place'>{key + 1}</h2>
								<MdDelete onClick={() => deleteScore(key)} className='icon delete'/>
							</div>
						</header>
						<div className='content'>
							<h3>Playing time:</h3>
							<span>{score.playingTime}</span>
							<h3>Score:</h3>
							<span>{score.score}</span>
							<h3>Deleted lines:</h3>
							<span>{score.deletedLines}</span>
						</div>
					</article>
				))}
			</main>
			
		</>
	);
}

export default memo(Scores);