import gameConfig from '../../config/game'
import getBlockCoords from '../coords/';

export function canRotate(poliminos, polimino, direction) {
	const { angle, coords: {...b} } = polimino;
	const newAngle = rotate(b, angle, direction)
	const points = getBlockCoords('i', b, newAngle)
	
	const collided = poliminos.some(p => {
		const { coords } = p;
		if (p === polimino)
			return false

		return points.some(point => {
			return point.x === coords.x && point.y === coords.y
		})
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
		coords.x = angle === 0 ? coords.x - 20 : coords.x - 10
	}
	
	if (coords.x === gameConfig.minX) {
		coords.x = angle === 180 ? coords.x + 20 : coords.x + 10
	}
	
	if (coords.y === gameConfig.minY) {
		coords.y = angle === 270 ? coords.y + 20 : coords.y + 10
	}

	const [,b,,] = getBlockCoords('i' ,coords, angle)
	
	return angle
}