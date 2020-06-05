import
	React, 
	{ 
		useEffect,
		useState,
		createContext, 
		useContext 
	} from 'react';
	
import Dot from '../components/dot';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [moving, setMoving] = useState(false);
	const [pieces, setPieces] = useState([]);
	
	useEffect(() => {
		setPieces(<Dot/>)
	}, [])
	
	function moveLeft() {
		setMoving(true)
	}
	
	function moveRight() {
		setMoving(true)
	}
	
	function cancelMove() {
		setMoving(false)
	}
	
	return (
		<GameContext.Provider value={{ pieces, moving, cancelMove, moveLeft, moveRight }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}