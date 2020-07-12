import React, { 
	useEffect,
	useState,
	useReducer,
	useMemo,
	createContext,
	useContext 
} from 'react';

import { useSettings } from './settings';
import gameConfig from '../config/game';
import * as motionHelper from '../helpers/motion';
import * as rotationHelper from '../helpers/rotation';
import * as lineHelper from '../helpers/line';
import * as gameHelper from '../helpers/game';

import Polimino from '../components/polimino/';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const { settings } = useSettings();
	const [poliminos, setPoliminos] = useState(null);
	const [quickFall, setQuickFall] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [nextBlocks, setNextBlocks] = useState([]);
	const [level, setLevel] = useState('level1');

	const initialGameState = useMemo(() => ({
		poliminos: [{type: gameHelper.getRandomPoliminoType(), coords: {x: 50, y: 0}, angle: 0, color: gameHelper.getRandomColor()}],
		inFocus: 0,
		gTimer: gameConfig[level].generation / 1000 - 1,
		score: 0,
		nextBlocks: (() => {
			const blocks = []
			
			for (let i = 0; i < 3; i++) {
				const type = gameHelper.getRandomPoliminoType()
				let x = 10, y = 120 / 3 * i + 10;
				
				//if (['l', 'i'].includes(type)) x = 10
				if (['t', 's', 'z'].includes(type)) x = 15
				if (['o', 'j'].includes(type)) x = 20
				
				blocks.push({type, angle: 0, coords: {x, y}, color: gameHelper.getRandomColor()})
			}

			return blocks
		})(),
		theyArrived: [],
		deletedLines: 0,
		ended: false,
		playingTime: 0
	}), [level])
	
	function vibrate() {
		if ('vibrate' in navigator && settings.vibrate) {
			navigator.vibrate(30);
		}
	}
	
	function reducer(state, action) {
		const newState = {...state};
		const { inFocus, gTimer, ended } = state;
		
		if (ended || isPaused)
			return newState;
		
		switch (action.type) {
			case 'left':
				if (motionHelper.canMoveLeft(newState.poliminos, newState.poliminos[inFocus])) {
					motionHelper.move(newState.poliminos[inFocus], 'left');
				}else{
					vibrate();
				}
				return newState;

			case 'right':
				if (motionHelper.canMoveRight(newState.poliminos, newState.poliminos[inFocus])) {
					motionHelper.move(newState.poliminos[inFocus], 'right');
				}else{
					vibrate();
				}
				return newState;

			case 'quick fall':
				if (!newState.poliminos[inFocus] || !quickFall) {
					return newState
				}
				if (motionHelper.canFall(newState.poliminos, newState.poliminos[inFocus])) {
					motionHelper.moveDown(newState.poliminos, newState.poliminos[inFocus])
				}else {
					vibrate();
					newState.poliminos[inFocus].hasArrived = true
					if (!newState.theyArrived.includes(newState.poliminos[inFocus])) {
						newState.theyArrived = newState.theyArrived.concat([newState.poliminos[inFocus]])
					}
					newState.inFocus = gameHelper.getNextFocus(newState)
					setQuickFall(false)
				}
				
				return newState
			
			case 'down':
				if (!newState.poliminos[inFocus] || newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = gameHelper.getNextFocus(newState)
				}
				
				newState.poliminos = newState.poliminos.map(polimino => {
					if (newState.theyArrived.includes(polimino))
						return polimino
					
					if (motionHelper.canFall(newState.poliminos, polimino)) {
						motionHelper.moveDown(newState.poliminos, polimino)
						return polimino
					}
					
					vibrate();
					polimino.hasArrived = true
					newState.theyArrived = newState.theyArrived.concat([polimino])
					return polimino;
				});
				
				return newState;
			
			case 'rotate left':
				if (rotationHelper.canRotate(newState.poliminos, newState.poliminos[inFocus], 'left')) {
					rotationHelper.rotate(newState.poliminos[inFocus], 'left')
				}
				return newState;
				
			case 'rotate right':
				if (rotationHelper.canRotate(newState.poliminos, newState.poliminos[inFocus], 'right')) {
					rotationHelper.rotate(newState.poliminos[inFocus], 'right')
				}
				return newState;
			
			case 'update score':
				let score = newState.theyArrived.length * 10
				score += newState.deletedLines * 100
				newState.score = score
				return newState;
			
			case 'generation timer':
				if (gTimer === 0) {
					gameHelper.nextPolimino(newState)
					newState.gTimer = gameConfig[level].generation / 1000 - 1;
					return newState 
				}
				
				newState.gTimer -= 1;
				return newState
				
			case 'remove filled lines':
				const lines = lineHelper.getFilledLines(newState.theyArrived)
				if (lines.length) {
					lineHelper.removeFilledLines(newState.theyArrived, lines)
					//if all blocks have been removed, remove from the game
					newState.poliminos = newState.poliminos.filter(p => {
						const r = p.removeds || [];
						return r.length < 4
					})
					newState.deletedLines += lines.length
				}
				
				return newState
			
			//case 'update playing time':	
			default:
				newState.playingTime = newState.playingTime + 1
				return newState
		}	
	}
	
	const [gameState, dispatch] = useReducer(reducer, initialGameState);
	
	//fall effect
	useEffect(() => {
		if (!gameState.ended && !isPaused) {
			const fallInterval = setInterval(() => {
				dispatch({type: 'down'})
			}, gameConfig[level].speed)
			
			//clearing the interval in "componentWillUnmount"
			return () => clearInterval(fallInterval)
		}
	}, [gameState.ended, isPaused, level]);
	
	useEffect(() => {
		if (!gameState.ended && quickFall && !isPaused) {
			const quickFallInterval = setInterval(() => {
					dispatch({type: 'quick fall'})
			}, 50);
			
			return () => clearInterval(quickFallInterval)
		}
	}, [gameState.ended, quickFall, isPaused]);
	
	useEffect(() => {
		if (!gameState.ended && !isPaused) {
			const generationTimer = setInterval(() => {
					dispatch({type: 'generation timer'})
			}, 1000);
			
			return () => clearInterval(generationTimer)
		}
	}, [gameState.ended, isPaused]);
	
	useEffect(() => {
		if (!gameState.ended && !isPaused) {
			const playingTimeInterval = setInterval(() => {
					dispatch({type: 'update playing time'})
			}, 1000)
			
			return () => clearInterval(playingTimeInterval)
		}
	}, [gameState.ended, isPaused]);
	
	useEffect(() => {
		dispatch({type: 'update score'})
	}, [gameState.poliminos])

	useEffect(() => {
		dispatch({type: 'remove filled lines'})
	}, [gameState.theyArrived]);
	
	//increases the difficulty
	useEffect(() => {
		const times = {
			2: 120, 3: 240, 4: 360, 5: 420, 6: 480, 7: 540, 8: 600, 9: 660, 10: 720
		}
		
		for (let i in times) {
			if (times[i] === gameState.playingTime) {
				setLevel(`level${i}`)
				break
			}
		}
	}, [gameState.playingTime, level]);
	
	//render
	useEffect(() => {
		const newPoliminos = gameState.poliminos.map((data, key) => <Polimino focus={gameState.inFocus === key && !gameState.theyArrived.includes(gameState.poliminos[key])} key={key} {...data} /> );
		
		setPoliminos(newPoliminos);
	}, [gameState]);
	
	//renders preview blocks
	useEffect(() => {
		const newBlocks = gameState.nextBlocks.map((data, key) => <Polimino key={key} {...data} /> );
		
		setNextBlocks(newBlocks);
	}, [gameState.nextBlocks]);
	
	const play = () => setIsPaused(false);
	
	const pause = () => setIsPaused(true);
	
	const moveLeft = () => dispatch({type: 'left'});

	const moveRight = () => dispatch({type: 'right'});

	const getDownFaster = () => setQuickFall(true);
	
	const cancelQuickFall = () => setQuickFall(false);
	
	const antiClockwiseRotate = () => dispatch({type: 'rotate left'})
	
	const clockwiseRotate = () => dispatch({type: 'rotate right'})
	
	return (
		<GameContext.Provider value={{ level: level.slice(5), play, pause, isPaused, ended: gameState.ended, playingTime: gameState.playingTime, deletedLines: gameState.deletedLines, gTimer: gameState.gTimer, score: gameState.score, poliminos, moveLeft, moveRight, getDownFaster, cancelQuickFall, clockwiseRotate, antiClockwiseRotate, nextBlocks }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}