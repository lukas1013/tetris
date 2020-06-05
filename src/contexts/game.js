import
	React, 
	{ 
		useEffect,
		useState,
		createContext, 
		useContext 
	} from 'react';
	
//import Dot from '../components/dot';
import gameConfig from '../config/game';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	//const [moving, setMoving] = useState(false);
	const [poliminosData, setPoliminosData] = useState([]);
	const [focused, setFocused] = useState(null);
	
	useEffect(() => {
		setPoliminosData([{type: 'dot', posX: 40}])
	}, [])
	
	function moveLeft() {
		//setMoving(true)
	}
	
	function moveRight() {
		if (poliminosData[0].posX < gameConfig.maxX) {
			setPoliminosData(previous => {
				const newPoliminosData = [...previous];
				
				newPoliminosData[0].posX += 10
				
				return newPoliminosData;
			})
			//poliminosData[0].posX += 10
		}
		
		//setMoving(true)
	}
	
	function cancelMove() {
		//setMoving(false)
	}
	
	return (
		<GameContext.Provider value={{ poliminosData, focused, cancelMove, moveLeft, moveRight }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}