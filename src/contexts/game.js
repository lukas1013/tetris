import
	React, 
	{ 
		useEffect,
		useState,
		useCallback,
		useMemo,
		createContext, 
		useContext 
	} from 'react';
	
import Dot from '../components/dot';
import gameConfig from '../config/game';

const GameContext = createContext({});

export const GameProvider = ({children}) => {
	const [gameSpeed, setSpeed] = useState(1500);
	const [xCoords, setXCoords] = useState([40]);
	const [yCoords, setYCoords] = useState([0]);
	const [poliminos, setPoliminos] = useState(null);
	const [inFocus, setInFocus] = useState(0); //first polimino
	const [poliminosData, setPoliminosData] = useState([]);
	const [isQuickDrop, setQuickDrop] = useState(false);
	
	useEffect(() => {
		setPoliminosData(previous => {
			const newPoliminosData = !!previous[0] ? previous.concat([{type: 'dot', posY: '0', posX: '40'}]) : [{type:'dot', posX: xCoords[0], posY: yCoords[0]}];
			
			return newPoliminosData;
		});
	}, []);
	
	const renderPoliminos = useCallback(() => {
		const newPoliminos = poliminosData.map((data, key) => {
			return <Dot posX={xCoords[key]} posY={yCoords[key]} />;
		});
		
		setPoliminos(newPoliminos);
	}, [poliminosData, xCoords, yCoords]);
	
	useEffect(() => {
		renderPoliminos();
	}, [renderPoliminos]);
	
	const fallTimer = useMemo(() => {
		return setTimeout(() => {
			let coords = [...yCoords];
			
			let newY = coords.map((coord, key) => {
				if (coord < gameConfig.maxY) {
					coord += 10;
				}
				return coord;
			})
		
			setYCoords(newY);
		}, gameSpeed);
	}, [gameSpeed, yCoords]);
	
	useEffect(() => {
		if (isQuickDrop) {
			clearTimeout(fallTimer);
		}
		
		setTimeout(() => {
			let coords = [...yCoords];
			if (isQuickDrop && coords[inFocus] < gameConfig.maxY) {
				coords[inFocus] += 10;
				setYCoords(coords);
			}
		}, 20);
	}, [isQuickDrop, fallTimer, inFocus, yCoords]);
	
	function addPolimino() {
		
	}

	function moveLeft() {
		if (xCoords[inFocus] > gameConfig.minX && yCoords[inFocus] < gameConfig.maxY) {
			const newX = [...xCoords];
			newX[inFocus] -= 10;
			setXCoords(newX);
		}
	}
	
	function moveRight() {
		if (xCoords[inFocus] < gameConfig.maxX && yCoords[inFocus] < gameConfig.maxY) {
			const newX = [...xCoords];
			newX[inFocus] += 10;
			setXCoords(newX);
		}
	}
	
	const getDownFaster = () => setQuickDrop(true);

	const cancelQuickDrop = () => setQuickDrop(false);

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