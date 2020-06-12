import gameConfig from '../config/game';

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived || polimino.posX === gameConfig.minX)
			return false;
			
	if (poliminos.some(p => {
		return p.posX === polimino.posX - 10 && p.posY === polimino.posY
	})) {
		return false;
	}
	return true;
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

export function canFall(poliminos, polimino) {
	let points;
	
	if (polimino.type === 't') {
		//extracting the coords from the collision points
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