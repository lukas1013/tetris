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
	//const [poliminosData, setPoliminosData] = useState([{type: 'dot', posX: 40, posY: 0, speed: gameSpeed}]);
	const [xCoords, setXCoords] = useState([40]);
	const [yCoords, setYCoords] = useState([0]);
	const [poliminos, setPoliminos] = useState(null);
	const [inFocus, setInFocus] = useState(0); //first polimino
	const [poliminosData, setPoliminosData] = useState([]);
	
	useEffect(() => {
		setPoliminosData(previous => {
			const newPoliminosData = !!previous[0] ? previous.concat([{type: 'dot', posY: '0', posX: '40', speed: gameSpeed}]) : [{type:'dot', posX: xCoords[0], posY: yCoords[0], speed: gameSpeed}];
			
			return newPoliminosData;
		});
	}, []);
	
	
	const renderPoliminos = useCallback(() => {
		const newPoliminos = poliminosData.map((data, key) => {
			return <Dot posX={xCoords[key]} posY={yCoords[key]} speed={gameSpeed} />;
		});
		
		setPoliminos(newPoliminos);
	}, [poliminosData, xCoords, yCoords, gameSpeed]);
	
	useEffect(() => {
		renderPoliminos();
	}, [renderPoliminos]);
	
	useEffect(() => {
		let pos = [...yCoords]
		
		pos = pos.map((p, k) => {
			if (p < gameConfig.maxY) {
				p += 10;
			}
			return p;
		})
		
		setTimeout(() => {
			setYCoords(pos)
		}, 1000);
	}, [yCoords])

	function moveLeft() {
		if (xCoords[inFocus] > gameConfig.minX) {
			const newX = [...xCoords];
			newX[inFocus] -= 10;
			setXCoords(newX);
		}
	}
	
	function moveRight() {
		if (xCoords[inFocus] < gameConfig.maxX) {
			const newX = [...xCoords];
			newX[inFocus] += 10;
			setXCoords(newX);
		}
	}
	
	//bug - delay
	const getDownFaster = useCallback(() => {
	//function getDownFaster() {
		const newPoliminosData = [...poliminosData];
		
		newPoliminosData[inFocus].speed = 20;
		setPoliminosData(newPoliminosData);
	//}
	}, [inFocus, poliminosData]);
	
	function cancelQuickDrop() {
		const newPoliminosData = [...poliminosData];
		
		newPoliminosData[inFocus].speed = gameSpeed;
		setPoliminosData(newPoliminosData);
	}
	
	return (
		<GameContext.Provider value={{ gameSpeed, poliminos, poliminosData, moveLeft, moveRight, getDownFaster, cancelQuickDrop }}>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const context = useContext(GameContext);
	return context;
}