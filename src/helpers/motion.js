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
			return point
		
		//for each polimino
		if(poliminos.some(p => {
			const { hasArrived, coords} = p;
			if (coords.some(c => {
				return c.y === point.y + 10 && c.x === point.x && (hasArrived || c.y === gameConfig.maxY)
			})) {
				return p
			}
		}))
			return point
	});
	
	//if collided, can't fall
	return !collided;
}

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	let points;
	
	if (polimino.type === 't') {
		const [c0,,,c3] = polimino.coords;
		points = [c0,c3];
	}
	
	const collided = points.some(point => {
		//hit the left side
		if (point.x === gameConfig.minX)
			return point
		
		if(poliminos.some(p => {
			const { hasArrived, coords} = p;
			if (coords.some(c => {
				//ignores the same array
				if (coords === polimino.coords)
					return false;
				//alert(`${c.x === point.x - 10}: point: ${JSON.stringify(point)}\ncoord: ${JSON.stringify(c)}`)
				return c.x === point.x - 10 && c.y === point.y
			})) {
				return p
			}
		})) {
			return point
		}
	});
	
	return !collided;
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived || polimino.posX === gameConfig.maxX)
			return false;
			
	if (poliminos.some(p => {
		return p.posX === polimino.posX + 10 && p.posY === polimino.posY
	})) {
		return false;
	}
	return true;
}