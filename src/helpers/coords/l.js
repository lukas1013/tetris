import gameConfig from '../../config/game';

export default function getBlockCoords(b, angle) {
	const a = {}, c = {}, d = {};
	
	if (angle === 0) {
		a.x = c.x = b.x;
		d.x = b.x + 10;
		a.y = b.y - 10;
		c.y = d.y = b.y + 10;
	}
	
	if (angle === 90) {
		if (b.x === gameConfig.minX) b.x = 10;
		if (b.x === gameConfig.maxX) b.x -= 10;
		a.y = c.y = b.y;
 		d.y = b.y + 10;
 		a.x = b.x + 10;
 		c.x = b.x - 10;
 		d.x = b.x - 10;
	}
	
	if (angle === 180) {
		if (b.x === gameConfig.minX) b.x = 10;
		a.x = c.x = b.x;
		d.x = b.x - 10;
		a.y = b.y + 10;
		c.y = d.y = b.y - 10;
	}
	
	if (angle === 270) {
		if (b.x === gameConfig.minX) b.x = 10;
		if (b.x === gameConfig.maxX) b.x -= 10;
		a.y = c.y = b.y;
		d.y = b.y - 10;
		a.x = b.x - 10;
		c.x = d.x = b.x + 10;
	}
	
	return [a,b,c,d]
}