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
		if(poliminos.some(p => {
			const { hasArrived, coords } = p;
			return coords.y === point.y + 10 && coords.x === point.x && (hasArrived || coords.y === gameConfig.maxY)
			}
		))
			return true
		return false
	});
	
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