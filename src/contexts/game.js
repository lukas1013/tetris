import React, { 
	useEffect,
	useState,
	useReducer,
	useCallback,
	useMemo,
	createContext,
	useContext 
} from 'react';

import gameConfig from '../config/game';
import * as motionHelper from '../helpers/motion';
import * as rotationHelper from '../helpers/rotation';
import * as lineHelper from '../helpers/line';
import * as gameHelper from '../helpers/game';

import Polimino from '../components/polimino/';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [gameSpeed, setSpeed] = useState(1500);
	const [poliminos, setPoliminos] = useState(null);
	const [quickFall, setQuickFall] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [nextBlocks, setNextBlocks] = useState([]);

	function getRandomPoliminoType() {
		const types = ['t', 'o', 'i', 'l', 'j', 's', 'z'];
		const r = Math.floor(Math.random() * types.length)
		return types[r]
	}
	
	function getRandomColor() {
		const colors = ['#D9003D', '#DB006A', '#B3DB00', '#00DB71', '#006FD9']
		const ind = Math.floor(Math.random() * colors.length)
		return colors[ind]
	}
	
	function getNextFocus(state) {
		const newFocus = [...state.poliminos].reduce((pre, next) => {
			if ((pre.coords.y > next.coords.y && !pre.hasArrived) || (!pre.hasArrived && next.hasArrived)) {
				return pre
			}
			return next
		});
		
		return state.poliminos.indexOf(newFocus)
	}

	const initialGameState = useMemo(() => ({
		poliminos: [{type: getRandomPoliminoType(), coords: {x: 40, y: 0}, angle: 0, color: getRandomColor()}],
		inFocus: 0,
		gTimer: gameConfig.level1.generation / 1000 - 1,
		score: 0,
		nextBlocks: (() => {
			const blocks = []
			
			for (let i = 0; i < 3; i++) {
				const type = getRandomPoliminoType()
				let x = 10, y = 120 / 3 * i + 10;
				
				//if (['l', 'i'].includes(type)) x = 10
				if (['t', 's', 'z'].includes(type)) x = 15
				if (['o', 'j'].includes(type)) x = 20
				
				blocks.push({type, angle: 0, coords: {x, y}, color: getRandomColor()})
			}

			return blocks
		})(),
		theyArrived: [],
		deletedLines: 0,
		ended: false,
		playingTime: 0
	}), [])
	
	function reducer(state, action) {
		const newState = {...state};
		const { inFocus, gTimer, ended } = state;
		
		if (ended || isPaused)
			return newState;
		
		switch (action.type) {
			case 'left':
				if (motionHelper.canMoveLeft(newState.poliminos, newState.poliminos[inFocus])) {
					motionHelper.move(newState.poliminos[inFocus], 'left')
				}
				return newState;

			case 'right':
				if (motionHelper.canMoveRight(newState.poliminos, newState.poliminos[inFocus])) {
					motionHelper.move(newState.poliminos[inFocus], 'right')
				}
				return newState;

			case 'quick fall':
				if (!newState.poliminos[inFocus] || !quickFall) {
					return newState
				}
				if (motionHelper.canFall(newState.poliminos, newState.poliminos[inFocus])) {
					motionHelper.moveDown(newState.poliminos, newState.poliminos[inFocus])
				}else {
					newState.poliminos[inFocus].hasArrived = true
					if (!newState.theyArrived.includes(newState.poliminos[inFocus])) {
						newState.theyArrived = newState.theyArrived.concat([newState.poliminos[inFocus]])
					}
				}
				
				if (newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
					setQuickFall(false)
				}
				
				return newState
			
			case 'down':
				if (!newState.poliminos[inFocus] || newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
				}
				
				newState.poliminos = newState.poliminos.map(polimino => {
					if (newState.theyArrived.includes(polimino))
						return polimino
					
					if (motionHelper.canFall(newState.poliminos, polimino)) {
						motionHelper.moveDown(newState.poliminos, polimino)
						return polimino
					}

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
					const blocks = [...newState.nextBlocks]
					const next = {...blocks.shift()}
					next.coords = {x: 40, y: 0}
					newState.poliminos.push(next);
					
					if (gameHelper.gameOver(newState.theyArrived, next)) {
						newState.ended = true
					}
					
					const type = getRandomPoliminoType()
					const third = {
						type,
						angle: 0,
						coords: {
							x: (() => {
								if (['t', 's', 'z'].includes(type)) return 15;
								if (['o', 'j'].includes(type)) return 20;
								//if (['l', 'i'].includes(type))
								return 10;
							})()
						},
						color: getRandomColor()
					}
					
					blocks.push(third)
					for (let i = 0; i < 3; i++) {
						blocks[i].coords.y = 120 / 3 * i + 10
					}
					
					newState.nextBlocks = blocks

					newState.gTimer = gameConfig.level1.generation / 1000 - 1;
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
	const fallInterval = useMemo(() => {
		if (!gameState.ended && !isPaused) {
			return setInterval(() => {
				dispatch({type: 'down'})
			}, gameSpeed);
		}
	}, [gameSpeed, isPaused, gameState.ended]);
	
	const quickFallInterval = useMemo(() => {
		if (!gameState.ended && quickFall && !isPaused) {
			return setInterval(() => {
				dispatch({type: 'quick fall'})
			}, 50);
		}
	}, [gameState.ended, quickFall, isPaused]);
	
	const generationTimer = useMemo(() => {
		if (!gameState.ended && !isPaused) {
			return setInterval(() => {
				dispatch({type: 'generation timer'})
			}, 1000);
		}
	}, [gameState.ended, isPaused]);
	
	const playingTimeInterval = useMemo(() => {
		if (!gameState.ended && !isPaused) {
			return setInterval(() => {
				dispatch({type: 'update playing time'})
			}, 1000)
		}
	}, [gameState.ended, isPaused]);
	
	useEffect(() => {
		dispatch({type: 'update score'})
	}, [gameState.poliminos])

	useEffect(() => {
		dispatch({type: 'remove filled lines'})
	}, [gameState.theyArrived]);
	
	//render
	useEffect(() => {
		const newPoliminos = gameState.poliminos.map((data, key) => <Polimino focus={gameState.inFocus === key} key={key} {...data} /> );
		
		setPoliminos(newPoliminos);
	}, [gameState]);
	
	//renders preview blocks
	useEffect(() => {
		const newBlocks = gameState.nextBlocks.map((data, key) => <Polimino key={key} {...data} /> );
		
		setNextBlocks(newBlocks);
	}, [gameState.nextBlocks]);
	
	const play = useCallback(() => setIsPaused(false), []);
	
	const pause = useCallback(() => {
		clearInterval(fallInterval)
		clearInterval(quickFallInterval)
		clearInterval(generationTimer)
		clearInterval(playingTimeInterval)
		setIsPaused(true)
	}, [fallInterval, generationTimer, quickFallInterval, playingTimeInterval])
	
	const moveLeft = () => dispatch({type: 'left'});

	const moveRight = () => dispatch({type: 'right'});

	const getDownFaster = () => setQuickFall(true);
	
	const cancelQuickFall = () => {
		clearInterval(quickFallInterval);
		setQuickFall(false);
	}
	
	const antiClockwiseRotate = () => dispatch({type: 'rotate left'})
	
	const clockwiseRotate = () => dispatch({type: 'rotate right'})
	
	return (
		<GameContext.Provider value={{ play, pause, isPaused, ended: gameState.ended, playingTime: gameState.playingTime, deletedLines: gameState.deletedLines, gTimer: gameState.gTimer, score: gameState.score, poliminos, moveLeft, moveRight, getDownFaster, cancelQuickFall, clockwiseRotate, antiClockwiseRotate, nextBlocks }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}