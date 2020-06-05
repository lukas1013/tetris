import
	React, 
	{ 
		useEffect,
		useState,
		useCallback,
		createContext, 
		useContext 
	} from 'react';
	
import gameConfig from '../config/game';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [gameSpeed, setSpeed] = useState(1500);
	const [poliminosData, setPoliminosData] = useState([{type: 'dot', posX: 40, speed: gameSpeed}]);
	const [inFocus, setInFocus] = useState(0); //first polimino

	function moveLeft() {
		if (poliminosData[inFocus].posX > gameConfig.minX) {
			const newPosition = [...poliminosData];
			newPosition[inFocus].posX -= 10;
			setPoliminosData(newPosition);
		}
	}
	
	function moveRight() {
		if (poliminosData[inFocus].posX < gameConfig.maxX) {
			const newPosition = [...poliminosData];
			newPosition[inFocus].posX += 10;
			setPoliminosData(newPosition);
		}
	}
	
	//bug - delay
	function getDownFaster() {
		const newPoliminosData = [...poliminosData];
		
		newPoliminosData[inFocus].speed = 10;
		setPoliminosData(newPoliminosData);
	}
	
	function cancelQuickDrop() {
		const newPoliminosData = [...poliminosData];
		
		newPoliminosData[inFocus].speed = gameSpeed;
		setPoliminosData(newPoliminosData);
	}
	
	return (
		<GameContext.Provider value={{ gameSpeed, poliminosData, moveLeft, moveRight, getDownFaster, cancelQuickDrop }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}