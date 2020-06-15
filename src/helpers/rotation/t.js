import gameConfig from '../../config/game'
import getBlockCoords from '../coords/';

export function canRotate(poliminos, polimino, direction) {
	const { angle, coords: {...b} } = polimino;
	const points = rotate(b, angle, direction)
	
	const collided = poliminos.some(p => {
		const { coords } = p;
		if (p === polimino)
			return false
		
		return coords.some(c => points.some(point => {
			return point.x === c.x && point.y === c.y
		}))
	})
	
	return !collided
}

export function rotate(coords, from, direction) {
	let angle;
	
	if (direction === 'right') {
		angle = from < 270 ? from + 90 : 0;
	}else {
		angle = from > 0 ? from - 90 : 270;
	}
	
	//if overtaking, push
	if (coords.x === gameConfig.maxX) {
		coords.x -= 10;
	}
	
	if (coords.x === gameConfig.minX) {
		coords.x += 10;
	}
	
	if (coords.y === gameConfig.minY) {
		coords.y += 10;
	}

	const [,b,,] = getBlockCoords('t' ,coords, angle)
	
	return angle
}