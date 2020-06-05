import
	React, 
	{ 
		useEffect,
		useState,
		createContext, 
		useContext 
	} from 'react';
	
import Dot from '../components/dot';
import gameConfig from '../config/game';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [poliminosData, setPoliminosData] = useState([{type: 'dot', posX: 40}]);
	const [inFocus, setInFocus] = useState(0);
	
	//in first rendering
	
	
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
	
	return (
		<GameContext.Provider value={{ poliminosData, cancelMove, moveLeft, moveRight }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}