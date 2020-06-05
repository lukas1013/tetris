import
	React, 
	{ 
		useEffect,
		useState,
		createContext, 
		useContext 
	} from 'react';
	
import gameConfig from '../config/game';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [gameSpeed, setSpeed] = useState(1500);
	const [poliminosData, setPoliminosData] = useState([{type: 'dot', posX: 40, speed: gameSpeed}]);
	const [inFocus, setInFocus] = useState(0); //first polimino
	
	//console.log('GameContext')
	
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
	
	function cancelMove() {
		
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
		<GameContext.Provider value={{ gameSpeed, poliminosData, cancelMove, moveLeft, moveRight, getDownFaster, cancelQuickDrop }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}