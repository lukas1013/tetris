import getBlockCoords, { traceRoute } from './coords/';

export function canRotate(poliminos, polimino, direction) {
	if (polimino.type === 'o')
		return false
	
	if (polimino.hasArrived)
		return false
	
	//check if there are any blocks in the path
	const route = traceRoute(polimino.type, polimino.coords, polimino.angle, direction)
	const collided = poliminos.some(p => {
		if (p === polimino)
			return false
		
		const coords = getBlockCoords(p.type, p.coords, p.angle)
		return coords.some(c => route.some(r => {
			return c.x === r.x && c.y === r.y
		}))
	})
	
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
	
	b = {...coords[1]}
	
	return newAngle
}