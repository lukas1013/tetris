import gameConfig from '../../config/game';
import getBlockCoords from '../coords/';

export function canFall(poliminos, { coords, angle, type}) {
	let points;
	const [a,,c,d] = getBlockCoords(type, coords, angle);
	points = [a,c,d];

	const collided = points.some(point => {
		if (point.y === gameConfig.maxY)
			return true
		
		//for each polimino
		return poliminos.some(p => {
			const { hasArrived } = p;
			const coords = getBlockCoords(p.type, p.coords, p.angle)
			return coords.some(c => {
				return c.y === point.y + 10 && c.x === point.x && (hasArrived || c.y === gameConfig.maxY)
			})
		})
	})
	
	//if collided, can't fall
	return !collided;
}

export function canMoveLeft(poliminos, polimino) {
	let points;
	const [a,,c,d] = getBlockCoords(polimino.type, polimino.coords, polimino.angle)
	points = [a,c,d];

	const collided = points.some(point => {
		//hit the left side
		if (point.x === gameConfig.minX)
			return true
		
		return poliminos.some(p => {
			const coords = getBlockCoords(p.type, p.coords, p.angle);
			//ignores the same polimino
			if (p === polimino)
				return false
			
			return coords.some(c => {
				return c.x === point.x - 10 && c.y === point.y
			})
		})
	});
	
	return !collided;
}

export function canMoveRight(poliminos, polimino) {
	let points;
	const [a,,c,d] = getBlockCoords(polimino.type, polimino.coords, polimino.angle)
	points = [a,c,d];

	const collided = points.some(point => {
		//hit the left side
		if (point.x === gameConfig.maxX)
			return true
		
		return poliminos.some(p => {
			const coords = getBlockCoords(p.type, p.coords, p.angle);
			//ignores the same polimino
			if (p === polimino)
				return false
			
			return coords.some(c => {
				return c.x === point.x + 10 && c.y === point.y
			})
		})
	});
	
	return !collided;
}