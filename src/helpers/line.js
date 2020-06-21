import gameConfig from '../config/game';
import getBlockCoords from './coords/';

export function getFilledLines(poliminos) {
	const lines = {}, completed = [];
	
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
		if (lines[i] === 10) {
			completed.push(parseInt(i))
		}
	}
	
	return completed;
}

export function removeFilledLines(poliminos, lines) {
	poliminos.forEach(p => {
		const r = p.removeds || [];
		const coords = r.length ? p.coords : getBlockCoords(p.type, p.coords, p.angle)
		lines.forEach(l => {
			coords.forEach((c, i) => {
				if (c.y === l && !r.includes(i)) {
					r.push(i)
				}
				
				if (c.y < l) {
					c.y += 10
				}
			})
		})
		
		if (r.length) {
			p.removeds = r;
			p.coords = [...coords] 
		}else {
			p.coords = {...coords[1]}
		}
	})
}