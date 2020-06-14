import gameConfig from '../../config/game'

export function canRotate(poliminos, polimino, to) {
	const { spin, coords: [{...a},{...b},{...c},{...d}] } = polimino;
	const points = rotate([a,b,c,d], spin, to)
	
	const collided = poliminos.some(p => {
		const { coords } = p;
		if (p === polimino)
			return false
		
		return coords.some(c => points.some(point => {
			return point.x === c.x && point.y === c.y
		}))
	})
	
	return !collided
}

export function rotate(coords, from, to) {
	const [{...a},{...b},{...c},{...d}] = coords;
	let spin;
	
	if (to === 'right') {
		spin = from < 3 ? from + 1 : 0;
	}else {
		spin = from > 0 ? from - 1 : 3;
	}
	
	//if overtaking, push
	if (b.x === gameConfig.maxX) {
		b.x -= 10;
	}
	
	if (b.x === gameConfig.minX) {
		b.x += 10;
	}
	
	if (b.y === gameConfig.minY) {
		b.y += 10;
	}

	if (spin === 0) {
		a.x = b.x - 10;
		c.x = b.x + 10;
		d.y = b.y + 10;
		a.y = c.y = b.y;
		d.x = b.x;
	}
	
	if (spin === 1) {
		a.y = b.y - 10;
		c.y = b.y + 10;
		d.x = b.x - 10;
		a.x = c.x = b.x;
		d.y = b.y;
	}
	
	if (spin === 2) {
		a.x = b.x + 10;
		c.x = b.x - 10;
		d.y = b.y - 10;
		a.y = c.y = b.y;
		d.x = b.x;
	}
	
	if (spin === 3) {
		a.y = b.y + 10;
		c.y = b.y - 10;
		d.x = b.x + 10;
		a.x = c.x = b.x;
		d.y = b.y;
	}
	
	return [a,b,c,d]
}