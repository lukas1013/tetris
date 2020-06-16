import gameConfig from '../../config/game';
import getBlockCoords, { isCollided } from '../coords/';

export function canFall(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => {
		return c.y === gameConfig.maxY
	}))
		return false
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords}
	pol.coords.y += 10
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => {
		return c.x === gameConfig.minX
	}))
		return false
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords}
	pol.coords.x -= 10
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => {
		return c.x === gameConfig.maxX
	}))
		return false
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords}
	pol.coords.x += 10
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}