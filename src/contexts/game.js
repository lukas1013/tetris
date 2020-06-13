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
import { canMoveLeft, canMoveRight, canFall } from '../helpers/motion';
import Dot from '../components/dot';
import T from '../components/t';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [gameSpeed, setSpeed] = useState(1500);
	const [poliminos, setPoliminos] = useState(null);
	const [isQuickDrop, setQuickDrop] = useState(false);
	const [isPaused, setIsPaused] = useState(false);

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
	
	function getNextFocus(state) {
		const newFocus = [...state.poliminos].reduce((pre, next) => {
			if ((pre.posY > next.posY && !pre.hasArrived) || (!pre.hasArrived && next.hasArrived)) {
				return pre
			}else if ((next.posY > pre.posY && !next.hasArrived) || (!next.hasArrived && pre.hasArrived)) {
				return next
			}
			return next
		});
		
		return state.poliminos.indexOf(newFocus)
	}
	
	const initialGameStatus = {
		poliminos: [{type: 't', coords: [{x: 30, y: 0}, {x: 40, y: 0}, {x: 50, y: 0}, {x: 40, y: 10}], spin: 0}],
		inFocus: 0,
		gTimer: gameConfig.level1.generation / 1000 - 1
	}
	
	function reducer(state, action) {
		const newState = {...state};
		const { inFocus, gTimer } = state;
		
		if (isPaused)
			return newState;
		
		switch (action.type) {
			case 'add':
				let type = 'dot';
				newState.poliminos.push({
					type,
					posX: 40,
					posY: 0
				});
				
				return newState;

			case 'left':
				if (canMoveLeft(newState.poliminos, newState.poliminos[inFocus])) {
					if (newState.poliminos[inFocus].type === 't') {
						const { coords } = newState.poliminos[inFocus];
						newState.poliminos[inFocus].coords = coords.map(coord => {
							coord.x -= 10
							return coord
						})
					}else {
						newState.poliminos[inFocus].posX -= 10;
					}
				}
				return newState;

			case 'right':
				if (canMoveRight(newState.poliminos, newState.poliminos[inFocus])) {
					if (newState.poliminos[inFocus].type === 't') {
						const { coords } = newState.poliminos[inFocus];
						newState.poliminos[inFocus].coords = coords.map(coord => {
							coord.x += 10
							return coord
						})
					}else {
						newState.poliminos[inFocus].posX += 10;
					}
				}
				return newState;

			case 'quick drop':
				const polimino = newState.poliminos[inFocus];
				if (canFall(newState.poliminos, polimino)) {
					const { coords } = polimino
					newState.poliminos[inFocus].coords = coords.map(coord => {
						coord.y += 10;
						return coord
					});
					
					newState.poliminos[inFocus].hasArrived = !canFall(newState.poliminos, polimino);
				}
				
				if (newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
				}
				
				return newState

			case 'down':
				newState.poliminos = newState.poliminos.map(polimino => {
					if (canFall(newState.poliminos, polimino)) {
						if (polimino.type === 't') {
							const { coords } = polimino;
							polimino.coords = coords.map(coord => {
								coord.y += 10
								return coord
							})
						}else{
							polimino.posY += 10;
						}
						polimino.hasArrived = !canFall(newState.poliminos, polimino)
					}
					return polimino;
				});
				
				if (newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
				}
				
				return newState;
			
			//case 'generation timer':
			default:
				if (gTimer === 0) {
					const type = 't';
					newState.poliminos.push({
						type,
						coords: [
							{x: 30, y: 0},
							{x: 40, y: 0},
							{x: 50, y: 0},
							{x: 40, y: 10}
						]
					});
					
					newState.gTimer = gameConfig.level1.generation / 1000 - 1;
					return newState 
				}
				
				newState.gTimer -= 1;
				return newState
		}	
	}
	
	const [gameStatus, dispatch] = useReducer(reducer, initialGameStatus);
	
	//render
	useEffect(() => {
		const newPoliminos = gameStatus.poliminos.map((data, key) => {
			if (data.type === 't')
				return <T key={key} coords={data.coords} fill='white'/>;
			return <Dot key={key} coords={{x: data.posX, y: data.posY}} fill='white' />;
		});
		
		setPoliminos(newPoliminos);
	}, [gameStatus]);
	
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

	return (
		<GameContext.Provider value={{ play, pause, isPaused, gTimer: gameStatus.gTimer, poliminos, moveLeft, moveRight, getDownFaster, cancelQuickDrop }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}