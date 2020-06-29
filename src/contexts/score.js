import React, { useState, useEffect, createContext, useContext } from 'react';
import * as db from '../db';

const ScoreContext = createContext({});

export const ScoreProvider = ({ children }) => {
	const [scores, setScores] = useState([]);
	
	async function deleteScore(index) {
		await db.deleteScore(index);
		const res = await db.getScores()
		setScores(res)
	}
	
	//render scores
	useEffect(() => {
		db.getScores().then(scores => {
			setScores(scores)
		})
	}, [])
	
	return (
		<ScoreContext.Provider value={{ scores, deleteScore }}>
			{children}
		</ScoreContext.Provider>
	);
}

export const useScore = () => useContext(ScoreContext);