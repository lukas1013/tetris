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
				if (state[inFocus].posX > gameConfig.minX && newState[inFocus].posY < gameConfig.maxY) {
					state[inFocus].posX -= 10;
					return newState;
				}
				return state;

			case 'right':
				if (newState[inFocus].posX < gameConfig.maxX && newState[inFocus].posY < gameConfig.maxY) {
					newState[inFocus].posX += 10;
					return newState;
				}
				return state;
			
			case 'quick drop':
				if (newState[inFocus].posY < gameConfig.maxY) {
					newState[inFocus].posY += 10;
					return newState;
				}
				return state;
				
			default:
				//check if everyone has reached the end
				if (state.every(item => item.posY === gameConfig.maxY)) {
					return state;
				}
				
				newState = newState.map(item => {
					if (item.posY < gameConfig.maxY) {
						item.posY += 10;
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