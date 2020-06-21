import
	React, { 
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

import T from '../components/t';
import O from '../components/o';
import I from '../components/i';
import L from '../components/l';
import J from '../components/j';
import S from '../components/s';
import Z from '../components/z';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [gameSpeed, setSpeed] = useState(1500);
	const [poliminos, setPoliminos] = useState(null);
	const [isQuickDrop, setQuickDrop] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [nextBlocks, setNextBlocks] = useState([]);
	
	//fall effect
	const fallInterval = useMemo(() => {
		if (!isPaused)
		return setInterval(() => {
			dispatch({type: 'down'})
		}, gameSpeed);
	}, [gameSpeed, isPaused]);
	
	const quickFallInterval = useMemo(() => {
		if (isQuickDrop && !isPaused)
			return setInterval(() => {
				dispatch({type: 'quick drop'})
			}, 20);
	}, [isQuickDrop, isPaused]);
	
	const generationTimer = useMemo(() => {
		if (!isPaused)
			return setInterval(() => {
				dispatch({type: 'generation timer'})
			}, 1000);
	}, [isPaused]);
	
	function getRandomPoliminoType() {
		const types = ['t', 'o', 'i', 'l', 'j', 's', 'z'];
		const r = Math.floor(Math.random() * types.length)
		return types[r]
	}
	
	function getRandomColor() {
		const colors = ['red', 'yellow', 'darkviolet', 'limegreen', 'turquoise']
		const ind = Math.floor(Math.random() * colors.length)
		return colors[ind]
	}
	
	function getNextFocus(state) {
		const newFocus = [...state.poliminos].reduce((pre, next) => {
			if ((pre.coords.y > next.coords.y && !pre.hasArrived) || (!pre.hasArrived && next.hasArrived)) {
				return pre
			}else if ((next.coords.y > pre.coords.y && !next.hasArrived) || (!next.hasArrived && pre.hasArrived)) {
				return next
			}
			return next
		});
		
		return state.poliminos.indexOf(newFocus)
	}
	
	const initialGameStatus = useMemo(() => ({
		poliminos: [{type: getRandomPoliminoType(), coords: {x: 40, y: 0}, angle: 0, color: getRandomColor()}],
		inFocus: 0,
		gTimer: gameConfig.level1.generation / 1000 - 1,
		score: 0,
		nextBlocks: (() => {
			const blocks = []
			
			for (let i = 0; i < 3; i++) {
				const type = getRandomPoliminoType()
				let x = 10, y = 120 / 3 * i + 10;
				
				if (type === 'l') x = 5
				if (type === 'o') x = 15
				
				blocks.push({type, angle: 0, coords: {x, y}, color: getRandomColor()})
			}

			return blocks
		})(),
		theyArrived: [],
		deletedLines: 0
	}), [])
	
	function reducer(state, action) {
		const newState = {...state};
		const { inFocus, gTimer } = state;
		
		if (isPaused)
			return newState;
		
		switch (action.type) {
			case 'left':
				if (motionHelper.canMoveLeft(newState.poliminos, newState.poliminos[inFocus])) {
					const polimino = newState.poliminos[inFocus]
					const coords = {x: polimino.coords.x - 10, y: polimino.coords.y}
					newState.poliminos[inFocus].coords = coords
				}
				return newState;

			case 'right':
				if (motionHelper.canMoveRight(newState.poliminos, newState.poliminos[inFocus])) {
					const polimino = newState.poliminos[inFocus]
					const coords = {x: polimino.coords.x + 10, y: polimino.coords.y}
					newState.poliminos[inFocus].coords = coords
				}
				return newState;

			case 'quick drop':
				if (motionHelper.canFall(newState.poliminos, newState.poliminos[inFocus])) {
					motionHelper.moveDown(newState.poliminos, newState.poliminos[inFocus])
				}else {
					newState.poliminos[inFocus].hasArrived = true
				}

				if (newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
				}
				
				return newState
			
			case 'down':
				newState.poliminos = newState.poliminos.map(polimino => {
					if (newState.theyArrived.includes(polimino))
						return polimino
					
					if (motionHelper.canFall(newState.poliminos, polimino)) {
						motionHelper.moveDown(newState.poliminos, polimino)
					}else {
						polimino.hasArrived = true
						newState.theyArrived = newState.theyArrived.concat([polimino])
					}
					return polimino;
				});
				
				if (!newState.poliminos[inFocus] || newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
				}
				
				return newState;
			
			case 'rotate left':
				if (rotationHelper.canRotate(newState.poliminos, newState.poliminos[inFocus], 'left')) {
					const polimino = newState.poliminos[inFocus];
					const { coords, angle, type } = polimino;
					polimino.angle = rotationHelper.getRotate(coords, angle, type, 'left')
				}
				return newState;
				
			case 'rotate right':
				if (rotationHelper.canRotate(newState.poliminos, newState.poliminos[inFocus], 'right')) {
					const polimino = newState.poliminos[inFocus];
					const { coords, angle, type } = polimino;
					polimino.angle = rotationHelper.getRotate(coords, angle, type, 'right')
				}
				return newState;
			
			case 'update score':
				let score = newState.theyArrived.reduce((acc, p) => {
					return acc + 10
				}, 0)
				
				score += newState.deletedLines * 1000
				newState.score = score
				return newState;
			
			case 'generation timer':
				if (gTimer === 0) {
					const blocks = [...newState.nextBlocks]
					const next = {...blocks.shift()}
					next.coords = {x: 40, y: 0}
					newState.poliminos.push(next);
					
					const type = getRandomPoliminoType()
					const third = {
						type,
						angle: 0,
						coords: {
							x: (() => {
								if (type === 'l') return 5
								if (type === 'o') return 15
								return 10
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
				
			//case 'remove filled lines:'
			default:
				const lines = lineHelper.getFilledLines(newState.theyArrived)
				if (Object.keys(lines).length) {
					lineHelper.removeFilledLines(newState.theyArrived, lines)
					//if all blocks have been removed, remove from the game
					newState.poliminos = newState.poliminos.filter(p => {
						const r = p.removeds || [];
						return r.length < 4
					})
					newState.deletedLines += Object.keys(lines).length
				}
				
				return newState
		}	
	}
	
	const [gameStatus, dispatch] = useReducer(reducer, initialGameStatus);
	
	useEffect(() => {
		dispatch({type: 'update score'})
	}, [gameStatus.poliminos])

	useEffect(() => {
		dispatch({type: 'remove filled lines'})
	}, [gameStatus.theyArrived]);

	//render
	useEffect(() => {
		const newPoliminos = gameStatus.poliminos.map((data, key) => {
			if (data.type === 't')
				return <T key={key} coords={data.coords} angle={data.angle} removeds={data.removeds} color={data.color}/>;
			
			if (data.type === 'o')
				return <O key={key} coords={data.coords} removeds={data.removeds} color={data.color}/>;
			
			if (data.type === 'i')
				return <I key={key} coords={data.coords} angle={data.angle} removeds={data.removeds} color={data.color}/>;
			
			if (data.type === 'l')
				return <L key={key} coords={data.coords} angle={data.angle} removeds={data.removeds} color={data.color}/>;
			
			if (data.type === 'j')
				return <J key={key} coords={data.coords} angle={data.angle} removeds={data.removeds} color={data.color}/>;
			
			if (data.type === 's')
				return <S key={key} coords={data.coords} angle={data.angle} removeds={data.removeds} color={data.color}/>;
			
			if (data.type === 'z')
				return <Z key={key} coords={data.coords} angle={data.angle} removeds={data.removeds} color={data.color}/>;
			//tmp
			return null
		});
		
		setPoliminos(newPoliminos);
	}, [gameStatus]);
	
	useEffect(() => {
		const newBlocks = gameStatus.nextBlocks.map((data, key) => {
			if (data.type === 't')
				return <T key={key} coords={data.coords} angle={data.angle} color={data.color}/>;
			
			if (data.type === 'o')
				return <O key={key} coords={data.coords} color={data.color}/>;
			
			if (data.type === 'i')
				return <I key={key} coords={data.coords} angle={data.angle} color={data.color}/>;
			
			if (data.type === 'l')
				return <L key={key} coords={data.coords} angle={data.angle} color={data.color}/>;
			
			if (data.type === 'j')
				return <J key={key} coords={data.coords} angle={data.angle} color={data.color}/>;
			
			if (data.type === 's')
				return <S key={key} coords={data.coords} angle={data.angle} color={data.color}/>;
			
			if (data.type === 'z')
				return <Z key={key} coords={data.coords} angle={data.angle} color={data.color}/>;
			//tmp
			return null
		});
		
		setNextBlocks(newBlocks);
	}, [gameStatus.nextBlocks]);
	
	const play = useCallback(() => setIsPaused(false), []);
	
	const pause = useCallback(() => {
		clearInterval(fallInterval)
		clearInterval(quickFallInterval)
		clearInterval(generationTimer)
		setIsPaused(true)
	}, [fallInterval, generationTimer, quickFallInterval])
	
	const moveLeft = () => dispatch({type: 'left'});

	const moveRight = () => dispatch({type: 'right'});

	const getDownFaster = () => setQuickDrop(true);
	
	const cancelQuickDrop = () => {
		clearInterval(quickFallInterval);
		setQuickDrop(false);
	}
	
	const antiClockwiseRotate = () => dispatch({type: 'rotate left'})
	
	const clockwiseRotate = () => dispatch({type: 'rotate right'})
	
	return (
		<GameContext.Provider value={{ play, pause, isPaused, gTimer: gameStatus.gTimer, score: gameStatus.score, poliminos, moveLeft, moveRight, getDownFaster, cancelQuickDrop, clockwiseRotate, antiClockwiseRotate, nextBlocks }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}