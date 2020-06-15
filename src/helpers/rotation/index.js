import * as t from './t';
import * as i from './i';

export function canRotateLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canRotate(poliminos, polimino, 'left')
	if (polimino.type === 'i')
		return i.canRotate(poliminos, polimino, 'left')
	
	//O
	return false
}

export function canRotateRight(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canRotate(poliminos, polimino, 'right')
	if (polimino.type === 'i')
		return i.canRotate(poliminos, polimino, 'right')
	
	//O
	return false
}

export function getRotateLeft(coords, angle, type) {
	if (type === 't')
		return t.rotate(coords, angle, 'left')
	if (type === 'i')
		return i.rotate(coords, angle, 'left')
}

export function getRotateRight(coords, angle, type) {
	if (type === 't')
		return t.rotate(coords, angle, 'right')
	if (type === 'i')
		return i.rotate(coords, angle, 'right')
}