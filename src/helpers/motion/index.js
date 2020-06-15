import * as t from './t';
import * as o from './o';

export function canFall(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canFall(poliminos, polimino)
	if (polimino.type === 'o')
		return o.canFall(poliminos, polimino)
}

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canMoveLeft(poliminos, polimino)
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canMoveRight(poliminos, polimino)
}