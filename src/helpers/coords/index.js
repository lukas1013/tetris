import getTCoords from './t';
import getOCoords from './o';
import getICoords from './i';
import getLCoords from './l';

export default function getBlockCoords(type, coords, angle) {
	if (type === 't')
		return getTCoords(coords, angle)
	if (type === 'o')
		return getOCoords(coords)
	if (type === 'i')
		return getICoords(coords, angle)
	if (type === 'l')
		return getLCoords(coords, angle)
}

export function isCollided(p1, p2) {
	const points = getBlockCoords(p1.type, p1.coords, p1.angle)
	const coords = getBlockCoords(p2.type, p2.coords, p2.angle)
	
	return points.some(p => coords.some(c => c.x === p.x && c.y === p.y));
}