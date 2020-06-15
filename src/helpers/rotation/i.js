import gameConfig from '../../config/game'
import { isCollided } from '../coords/';

export function canRotate(poliminos, polimino, direction) {
	const pol = {...polimino}
	pol.angle = rotate({...pol.coords}, pol.angle, direction)

	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
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

	return angle
}