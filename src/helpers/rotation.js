import getBlockCoords, { traceRoute } from './coords/';

export function canRotate(poliminos, polimino, direction) {
	if (polimino.hasArrived || polimino.type === 'o')
		return false
	
	//check if there are any blocks in the path
	const route = traceRoute(polimino.type, polimino.coords, polimino.angle, direction)
	const collided = poliminos.some(p => {
		if (p === polimino)
			return false
		
		const coords = getBlockCoords(p.type, p.coords, p.angle)
		return coords.some(c => route.some(r => c.x === r.x && c.y === r.y))
	})
	
	return !collided
}

export function rotate(polimino, direction) {
	if (polimino.angle === 0 && direction === 'left') {
		polimino.angle = 270;
	}else if (polimino.angle === 270 && direction === 'right') {
		polimino.angle = 0
	}else {
		polimino.angle = direction === 'left' ? polimino.angle - 90 : polimino.angle + 90;
	}
	
	const coords = getBlockCoords(polimino.type, polimino.coords, polimino.angle);
	
	polimino.coords = {...coords[1]}
}