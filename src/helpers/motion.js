import gameConfig from '../config/game';
import getBlockCoords, { isCollided } from './coords/';

export function canFall(poliminos, polimino) {
	const removeds = polimino.removeds || [];
	if (polimino.hasArrived && !removeds.length)
		return false
	
	if (removeds.length) {
		const blocks = polimino.coords;
		return blocks.some(block => {
			if (block.y === gameConfig.maxY)
				return false
			
			return !poliminos.some(p => {
				const r = p.removeds || [];
				const coords = r.length ? p.coords : getBlockCoords(p.type, p.coords, p.angle)
				return coords.some((c, i) => c.x === block.x && c.y === block.y + 10 && !r.includes(i))
			})
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
		const { coords: blocks } = polimino
		for (let i in blocks) {
			if (blocks[i].y === gameConfig.maxY && removeds.includes(i))
				continue
			
			if (poliminos.some(p => {
				const r = p.removeds || [];
				const coords = r.length ? p.coords : getBlockCoords(p.type, p.coords, p.angle)
				return coords.some((c, ind) => !removeds.includes(i) && c.x === blocks[i].x && c.y === blocks[i].y + 10 && !r.includes(ind))
			})) {
				continue
			}
			
			blocks[i].y += 10
		}
		polimino.coords = [...blocks]
		polimino.removeds = [...removeds]
	}else {
		const coords = {
			x: polimino.coords.x,
			y: polimino.coords.y + 10
		}
		polimino.coords = {...coords}
		if (coords.y === gameConfig.maxY) polimino.hasArrived = true
		
	}
}

export function canMoveLeft(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => {
		return c.x === gameConfig.minX
	}))
		return false
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords}
	pol.coords.x -= 10
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}

export function canMoveRight(poliminos, polimino) {
	if (polimino.hasArrived)
		return false
	
	if (getBlockCoords(polimino.type, polimino.coords, polimino.angle).some(c => {
		return c.x === gameConfig.maxX
	}))
		return false
	
	const pol = {...polimino};
	pol.coords = {...polimino.coords}
	pol.coords.x += 10
	
	const collided = poliminos.some(p => p !== polimino ? isCollided(pol, p) : false)
	
	return !collided
}