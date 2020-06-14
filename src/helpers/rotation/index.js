import gameConfig from '../../config/game';
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

export function getRotateLeft(coords, spin, type) {
	if (type === 't')
		return t.rotate(coords, spin, 'left')
}

export function getRotateRight(coords, spin, type) {
	if (type === 't')
		return t.rotate(coords, spin, 'right')
}