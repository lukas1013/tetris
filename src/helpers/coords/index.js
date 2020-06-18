import getTCoords, * as t from './t';
import getOCoords from './o';
import getICoords, * as i from './i';
import getLCoords, * as l from './l';
import getJCoords, * as j from './j';
import getSCoords, * as s from './s';

export default function getBlockCoords(type, coords, angle) {
	if (type === 't')
		return getTCoords(coords, angle)
	if (type === 'o')
		return getOCoords(coords)
	if (type === 'i')
		return getICoords(coords, angle)
	if (type === 'l')
		return getLCoords(coords, angle)
	if (type === 'j')
		return getJCoords(coords, angle)
	if (type === 's')
		return getSCoords(coords, angle)
}

export function isCollided(p1, p2) {
	const points = getBlockCoords(p1.type, p1.coords, p1.angle)
	const coords = getBlockCoords(p2.type, p2.coords, p2.angle)
	
	return points.some(p => coords.some(c => c.x === p.x && c.y === p.y));
}

//returns the blocks needed to rotate the block
export function traceRoute(type, b, angle, direction) {
	if (type === 't')
		return t.traceRoute(b, angle, direction)
	if (type === 'o')
		return getOCoords(b)
	if (type === 'i')
		return i.traceRoute(b, angle, direction)
	if (type === 'l')
		return l.traceRoute(b, angle, direction)
	if (type === 'j')
		return j.traceRoute(b, angle, direction)
	if (type === 's')
		return s.traceRoute(b, angle, direction)
}