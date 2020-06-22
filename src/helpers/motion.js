import gameConfig from '../config/game';
import getBlockCoords, { isCollided } from './coords/';

export function canFall(poliminos, polimino) {
	const removeds = polimino.removeds || [];
	if (polimino.hasArrived && !removeds.length)
		return false
	
	if (removeds.length) {
		const blocks = polimino.coords
		
		//if collided, can't fall
		return !poliminos.some(p => {
			const r = p.removeds || [];
			return blocks.some(b => b.y === gameConfig.maxY || p.coords.some((c, i) => {
				return b.y + 10 === c.y && b.x === c.x && !r.includes(i)
			}))
		})
	}
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => c.y === gameConfig.maxY)) {
		return false
	}
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords}
	pol.coords.y += 10
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function moveDown(poliminos, polimino) {
	const removeds = polimino.removeds || [];
	
	if (removeds.length) {
		const { coords: blocks } = polimino, collided = [];
		
		poliminos.forEach(p => {
			const r = p.removeds || [];
			const coords = r.length ? p.coords : getBlockCoords(p.type, p.coords, p.angle)
			//adds the coordinate that will collide in the Array
			blocks.forEach(b => {
				if (coords.some((c, i) => c.x === b.x && c.y === b.y + 10 && !r.includes(i)) && !collided.includes(b)) {
					collided.push(b)
				}
			})
		})
		
		for (let b of blocks) {
			//if it collided with the floor or would collide with some polimino, move on to the next
			if (b.y === gameConfig.maxY || collided.includes(b)) {
				continue
			}
			b.y += 10
		}
		
	}else {
		const coords = {...polimino.coords};
		coords.y += 10
		polimino.coords = coords
		if (coords.y === gameConfig.maxY) {
			polimino.hasArrived = true
		}
		
	}
}

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived) {
		return false;
	}
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => c.x === gameConfig.minX)) {
		return false;
	}
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords};
	pol.coords.x -= 10;
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived) {
		return false
	}
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => c.x === gameConfig.maxX)) {
		return false;
	}
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords};
	pol.coords.x += 10;
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function move(polimino, direction) {
	const coords = {...polimino.coords};
	coords.x = direction === 'left' ? coords.x - 10 : coords.x + 10;
	polimino.coords = coords;
}