import gameConfig from '../config/game';
import getBlockCoords from './coords/';
import { canFall, moveDown } from './motion';

export function getFilledLines(poliminos) {
	const lines = {};

	for (let p of poliminos) {
		const r = p.removeds || [];
		const coords = r.length ? p.coords : getBlockCoords(p.type, p.coords, p.angle)
		coords.forEach((c, i) => {
			if (!r.includes(i)) {
				lines[c.y] = !!lines[c.y] ? lines[c.y] + 1 : 1;
			}
		})
	}
	
	for (let i in lines) {
		if (lines[i] < 10) {
			delete lines[i]
		}
	}
	
	return lines
}

export function removeFilledLines(poliminos, lines) {

	for (let i in lines) {
		poliminos = [...poliminos].map(p => {
			const r = p.removeds || [];
			const coords = r.length ? p.coords : getBlockCoords(p.type, p.coords, p.angle)
			
			for (let c in coords) {
				if (coords[c].y === parseInt(i) && !r.includes(c)) {
					r.push(parseInt(c))
				}
				
				if (coords[c].y < parseInt(i)) {
					coords[c].y += 10;
				}
			}

			if (r.length) {
				p.removeds = r
				p.coords = [...coords]
			}else {
				//coord B
				p.coords = {...coords[1]}
			}

			return p
		})
	}
}