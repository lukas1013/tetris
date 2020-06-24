import gameConfig from '../config/game';
import getBlockCoords, { isCollided } from './coords/';

export function gameOver(poliminos, polimino) {
	const points = getBlockCoords(polimino.type, polimino.coords, polimino.angle)
	
	if (polimino.hasArrived && points.some(p => p.y < gameConfig.minY)) {
		return true
	}
	
	return poliminos.some(p => {
		return isCollided(polimino, p)
	})
}