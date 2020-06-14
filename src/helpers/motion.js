import gameConfig from '../config/game';

export function canFall(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	let points;
	
	//extracting the coords from the collision points
	if (polimino.type === 't') {
		const [c0,,c2,c3] = polimino.coords;
		points = [c0,c2,c3];
	}
	
	const collided = points.some(point => {
		if (point.y === gameConfig.maxY)
			return true
		
		//for each polimino
		if(poliminos.some(p => {
			const { hasArrived, coords } = p;
			if (coords.some(c => c.y === point.y + 10 && c.x === point.x && (hasArrived || c.y === gameConfig.maxY))) {
				return true
			}
			return false
		}))
			return true
		return false
	});
	
	//if collided, can't fall
	return !collided;
}

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	let points;
	
	if (polimino.type === 't') {
		const [c0,,c2,c3] = polimino.coords;
		points = [c0,c2,c3];
	}
	
	const collided = points.some(point => {
		//hit the left side
		if (point.x === gameConfig.minX)
			return true
		
		if(poliminos.some(p => {
			const { coords } = p;
			if (coords.some(c => {
				//ignores the same array
				if (coords === polimino.coords)
					return false;
				
				return c.x === point.x - 10 && c.y === point.y
			})) {
				return true
			}
			return false
		})) {
			return true
		}
		return false
	});
	
	return !collided;
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	let points;
	
	if (polimino.type === 't') {
		const [c0,,c2,c3] = polimino.coords;
		points = [c0,c2,c3];
	}
	
	const collided = points.some(point => {
		//hit the left side
		if (point.x === gameConfig.maxX)
			return true
		
		if(poliminos.some(p => {
			const { coords } = p;
			if (coords.some(c => {
				//ignores the same array
				if (coords === polimino.coords)
					return false;
				
				return c.x === point.x + 10 && c.y === point.y
			})) {
				return true
			}
			return false
		})) {
			return true
		}
		return false
	});
	
	return !collided;
}