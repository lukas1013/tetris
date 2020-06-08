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
	const [inFocus, setInFocus] = useState(0); //first polimino
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
		//}, gameConfig.level1.generation);
		}, gameConfig.level1.generation);
	}, [gameSpeed]);
	
	const initialPoliminoData = [{
		type: 'dot',
		posX: 40,
		posY: 0
	}];

	function reducer(state, action) {
		let newState = [...state];

		switch (action.type) {
			case 'add':
				let type = 'dot';
				return newState.concat([{type, posX: 40, posY: 0}]);

			case 'left':
				if (state[inFocus].posX > gameConfig.minX && canMoveLeft(state, state[inFocus])) {
					state[inFocus].posX -= 10;
					return newState;
				}
				return state;

			case 'right':
				if (newState[inFocus].posX < gameConfig.maxX && canMoveRight(state, state[inFocus])) {
					newState[inFocus].posX += 10;
					return newState;
				}
				return state;
			
			case 'quick drop':
				if (newState[inFocus].posY < gameConfig.maxY && canFall(newState, newState[inFocus])) {
					newState[inFocus].posY += 10;
					//checks if the polimino arrived after having moved
					newState[inFocus].hasArrived = (newState[inFocus].posY === gameConfig.maxY || !canFall(newState, newState[inFocus])) ? true : false;
					return newState;
				}
				return state;
				
			default:
				//check if everyone has reached the end
				if (state.every(item => item.posY === gameConfig.maxY || item.hasArrived)) {
					return state;
				}
				
				newState = newState.map(item => {
					if (item.posY < gameConfig.maxY && canFall(newState, item)) {
						item.posY += 10;
						//checks if the polimino arrived after having moved
						item.hasArrived = (item.posY === gameConfig.maxY || !canFall(newState, newState[inFocus])) ? true : false;
					}else{
						item.hasArrived = true;
					}
					return item;
				});

				return newState;
		}
	}
	
	const [poliminosData, dispatch] = useReducer(reducer, initialPoliminoData);

	//render
	useEffect(() => {
		const newPoliminos = poliminosData.map((data, key) => {
			return <Dot key={key} posX={data.posX} posY={data.posY} />;
		});

		setPoliminos(newPoliminos);
	}, [poliminosData]);
	
	//chage focus
	useEffect(() => {
		let newFocus = inFocus;
		for (let ind in poliminosData) {
			if (poliminosData[ind].posY < gameConfig.maxY && !poliminosData[ind].hasArrived) {
				newFocus = ind;
				break
			}
		}
		setInFocus(newFocus);
	}, [poliminosData]);
	
	function canFall(state, polimino) {
		if (state.some(({posY, posX, hasArrived}) => {
			return (posY === polimino.posY + 10 && posX === polimino.posX) && (posY === gameConfig.maxY || hasArrived)
		})) {
			return false;
		}
		return true;
	}
	
	function canMoveLeft(state, polimino) {
		if (polimino.hasArrived)
			return false;
			
		if (state.some(({posY, posX}) => {
			return (posX === polimino.posX - 10 && posY === polimino.posY)
		})) {
			return false;
		}
		return true;
	}
	
	function canMoveRight(state, polimino) {
		if (polimino.hasArrived)
			return false;
			
		if (state.some(({posY, posX}) => {
			return (posX === polimino.posX + 10 && posY === polimino.posY)
		})) {
			return false;
		}
		return true;
	}
	
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