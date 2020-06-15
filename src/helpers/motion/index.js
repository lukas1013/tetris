import * as t from './t';
import * as o from './o';
import * as i from './i';

export function canFall(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canFall(poliminos, polimino)
	if (polimino.type === 'o')
		return o.canFall(poliminos, polimino)
	if (polimino.type === 'i')
		return i.canFall(poliminos, polimino)
}

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canMoveLeft(poliminos, polimino)
	if (polimino.type === 'o')
		return o.canMoveLeft(poliminos, polimino)
	if (polimino.type === 'i')
		return i.canMoveLeft(poliminos, polimino)
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (polimino.type === 't')
		return t.canMoveRight(poliminos, polimino)
	if (polimino.type === 'o')
		return o.canMoveRight(poliminos, polimino)
	if (polimino.type === 'i')
		return i.canMoveRight(poliminos, polimino)
}