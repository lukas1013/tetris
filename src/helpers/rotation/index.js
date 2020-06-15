import * as t from './t';

export function canRotateLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canRotate(poliminos, polimino, 'left')
}

export function canRotateRight(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canRotate(poliminos, polimino, 'right')
	
}

export function getRotateLeft(coords, angle, type) {
	if (type === 't')
		return t.rotate(coords, angle, 'left')
}

export function getRotateRight(coords, angle, type) {
	if (type === 't')
		return t.rotate(coords, angle, 'right')
}