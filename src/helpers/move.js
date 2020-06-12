import gameConfig from '../config/game';

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived || polimino.posX === gameConfig.minX)
			return false;
			
	if (poliminos.some(p => {
		return p.posX === polimino.posX - 10 && p.posY === polimino.posY
	})) {
		return false;
	}
	return true;
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived || polimino.posX === gameConfig.maxX)
			return false;
			
	if (poliminos.some(p => {
		return p.posX === polimino.posX + 10 && p.posY === polimino.posY
	})) {
		return false;
	}
	return true;
}

export function canFall(poliminos, polimino) {
	if (polimino.type === 't')
			return true
		
	if (polimino.hasArrived || polimino.posY === gameConfig.maxY)
		return false;
	
	if (poliminos.some(p => {
		return p.posY === polimino.posY + 10 && p.posX === polimino.posX && (p.polimino.hasArrived || p.posY === gameConfig.maxY)
	})) {
		return false;
	}
	return true;
}
