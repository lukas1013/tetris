import gameConfig from '../../config/game';

export default function getBlockCoords(b, angle) {
	const a = {}, c = {}, d = {};
	
	if (angle === 0) {
		if (b.x === gameConfig.minX) b.x = 10;
		if (b.x > gameConfig.maxX - 20) b.x = gameConfig.maxX - 20
		a.x = b.x - 10;
		c.x = b.x + 10;
		d.x = b.x + 20;
		a.y = c.y = d.y = b.y;
	}
	
	if (angle === 90) {
		a.y = b.y - 10;
		c.y = b.y + 10;
		d.y = b.y + 20;
		a.x = c.x = d.x = b.x;
	}
	
	if (angle === 180) {
		if (b.x < 20) b.x = 20;
		if (b.x === gameConfig.maxX) b.x -= 10;
		a.x = b.x + 10;
		c.x = b.x - 10;
		d.x = b.x - 20;
		a.y = c.y = d.y = b.y;
	}
	
	if (angle === 270) {
		a.y = b.y + 10;
		c.y = b.y - 10;
		d.y = b.y - 20;
		a.x = c.x = d.x = b.x;
	}
	
	return [a,b,c,d]
}

export function traceRoute(b, angle, direction) {
	const coords = [], [a,c,d] = getBlockCoords(b, angle)
	let route;
	
	if (angle === 0 && direction === 'left') {
		route = 315
	}else {
		route = direction === 'right' ? angle + 90 / 2 : angle - 90 / 2
	}
	
	if (route === 45) {
		coords.push({
			x: b.x - 10,
			y: b.y
		}, {
			x: b.x - 10,
			y: b.y - 10
		}, {
			x: b.x,
			y: b.y - 10
		}, {
			x: b.x + 10,
			y: b.y
		}, {
			x: b.x + 10,
			y: b.y + 10
		}, {
			x: b.x,
			y: b.y + 10
		}, {
			x: b.x + 20,
			y: b.y
		}, {
			x: b.x + 20,
			y: b.y + 10
		}, {
			x: b.x + 20,
			y: b.y + 20
		}, {
			x: b.x + 10,
			y: b.y + 20
		}, {
			x: b.x,
			y: b.y + 20
		})
	}
	
	if (route === 135) {
		coords.push({
			x: b.x,
			y: b.y - 10
		}, {
			x: b.x + 10,
			y: b.y - 10
		}, {
			x: b.x + 10,
			y: b.y
		}, {
			x: b.x,
			y: b.y + 10
		}, {
			x: b.x - 10,
			y: b.y + 10
		}, {
			x: b.x - 10,
			y: b.y
		}, {
			x: b.x,
			y: b.y + 20
		}, {
			x: b.x - 10,
			y: b.y + 20
		}, {
			x: b.x - 20,
			y: b.y + 20
		}, {
			x: b.x - 20,
			y: b.y - 10
		}, {
			x: b.x - 20,
			y: b.y
		})
	}
	
	if (route === 225) {
		coords.push({
			x: b.x + 10,
			y: b.y
		}, {
			x: b.x + 10,
			y: b.y + 10
		}, {
			x: b.x,
			y: b.y + 10
		}, {
			x: b.x - 10,
			y: b.y
		}, {
			x: b.x - 10,
			y: b.y - 10
		}, {
			x: b.x,
			y: b.y - 10
		}, {
			x: b.x - 20,
			y: b.y
		}, {
			x: b.x - 20,
			y: b.y - 10
		}, {
			x: b.x - 20,
			y: b.y - 20
		}, {
			x: b.x - 10,
			y: b.y - 20
		}, {
			x: b.x,
			y: b.y - 20
		})
	}
	
	if (route === 315) {
		coords.push({
			x: b.x,
			y: b.y + 10
		}, {
			x: b.x - 10,
			y: b.y + 10
		}, {
			x: b.x - 10,
			y: b.y
		}, {
			x: b.x,
			y: b.y - 10
		}, {
			x: b.x + 10,
			y: b.y - 10
		}, {
			x: b.x + 10,
			y: b.y
		}, {
			x: b.x,
			y: b.y - 20
		}, {
			x: b.x + 10,
			y: b.y - 20
		}, {
			x: b.x + 20,
			y: b.y - 20
		}, {
			x: b.x + 20,
			y: b.y - 10
		}, {
			x: b.x + 20,
			y: b.y
		})
	}
	
	return coords
}