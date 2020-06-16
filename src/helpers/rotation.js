import gameConfig from '../config/game';
import getBlockCoords, { isCollided } from './coords/';

export function canRotateLeft(poliminos, polimino) {
	if (polimino.type === 'o')
		return false
	
	if (polimino.hasArrived)
		return false
		
	const pol = {...polimino}
	pol.angle = pol.angle > 0 ? pol.angle - 90 : 270
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function canRotateRight(poliminos, polimino) {
	if (polimino.type === 'o')
		return false
	
	if (polimino.hasArrived)
		return false
		
	const pol = {...polimino}
	pol.angle = pol.angle < 270 ? pol.angle + 90 : 0
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function getRotate(b, angle, type, direction) {
	let newAngle;
	
	if (angle === 0 && direction === 'left') {
		newAngle = 270;
	}else if (angle === 270 && direction === 'right') {
		newAngle = 0
	}else {
		newAngle = direction === 'left' ? angle - 90 : angle + 90
	}
	
	const coords = getBlockCoords(type, b, newAngle)
	
	for (let c of coords) {
		if (c.x < gameConfig.minX) {
			coords[1].x += c.x * -1
			break
		}
		
		if (c.x > gameConfig.maxX) {
			coords[1].x -= c.x - gameConfig.maxX
			break
		}
		
		if (c.y < gameConfig.minY) {
			coords[1].y += c.y * -1
			break
		}
	}
	
	b = {...coords[1]}
	
	return newAngle
}