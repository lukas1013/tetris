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
import Dot from '../components/dot';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [gameSpeed, setSpeed] = useState(1500);
	const [poliminos, setPoliminos] = useState(null);
	const [isQuickDrop, setQuickDrop] = useState(false);

	//fall effect
	const fallInterval = useMemo(() => {
		return setInterval(() => {
			dispatch({type: 'down'})
		}, gameSpeed);
	}, [gameSpeed]);
	
	const quickFallInterval = useMemo(() => {
		if (isQuickDrop)
			return setInterval(() => {
				dispatch({type: 'quick drop'})
			}, 20);
	}, [isQuickDrop]);
	
	const generationInterval = useMemo(() => {
		return setInterval(() => {
			dispatch({type: 'add'})
		}, gameConfig.level1.generation);
	}, []);
	
	const canFall = useCallback((poliminos, {posY, posX, hasArrived}) => {
		if (hasArrived || posY === gameConfig.maxY)
			return false;
		
		if (poliminos.some(p => {
			return p.posY === posY + 10 && p.posX === posX && (p.hasArrived || p.posY === gameConfig.maxY)
		})) {
			return false;
		}
		return true;
	}, []);
	
	const canMoveLeft = useCallback((poliminos, {posY, posX, hasArrived}) => {
		if (hasArrived || posX === gameConfig.minX)
			return false;
			
		if (poliminos.some(p => {
			return p.posX === posX - 10 && p.posY === posY
		})) {
			return false;
		}
		return true;
	}, []);
	
	const canMoveRight = useCallback((poliminos, {posY, posX, hasArrived}) => {
		if (hasArrived || posX === gameConfig.maxX)
			return false;
			
		if (poliminos.some(p => {
			return p.posX === posX + 10 && p.posY === posY
		})) {
			return false;
		}
		return true;
	}, []);
	
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
	
	const initialPoliminoData = {
		poliminos: [{type: 'dot', posX: 40, posY: 0}],
		inFocus: 0
	}
	
	function reducer(state, action) {
		const newState = {...state};
		const { inFocus } = state;
		window.location.hash = inFocus
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
					newState.poliminos[inFocus].posX -= 10;
				}
				return newState;

			case 'right':
				if (canMoveRight(newState.poliminos, newState.poliminos[inFocus])) {
					newState.poliminos[inFocus].posX += 10;
				}
				return newState;

			case 'quick drop':
				if (canFall(newState.poliminos, newState.poliminos[inFocus])) {
					newState.poliminos[inFocus].posY += 10;
					newState.poliminos[inFocus].hasArrived = !canFall(newState.poliminos, newState.poliminos[inFocus]);
				}
				
				if (newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
				}
				
				return newState

			//case 'down':
			default:
				newState.poliminos = newState.poliminos.map(polimino => {
					if (canFall(newState.poliminos, polimino)) {
						polimino.posY += 10;
						polimino.hasArrived = !canFall(newState.poliminos, polimino)
					}
					return polimino;
				});
				
				if (newState.poliminos[inFocus].hasArrived) {
					newState.inFocus = getNextFocus(newState)
				}
				
				return newState;
		}	
	}
	
	const [poliminosData, dispatch] = useReducer(reducer, initialPoliminoData);
	
	useEffect(() => {
		const newPoliminos = poliminosData.poliminos.map((data, key) => {
			return <Dot key={key} posX={data.posX} posY={data.posY} />;
		});
		
		setPoliminos(newPoliminos);
	}, [poliminosData]);
	
	const moveLeft = () => dispatch({type: 'left'});

	const moveRight = () => dispatch({type: 'right'});

	const getDownFaster = () => setQuickDrop(true);

	const cancelQuickDrop = () => {
		clearInterval(quickFallInterval);
		setQuickDrop(false);
	}

	return (
		<GameContext.Provider value={{ poliminos, moveLeft, moveRight, getDownFaster, cancelQuickDrop }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}