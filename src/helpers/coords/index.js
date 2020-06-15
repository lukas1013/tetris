import getTCoords from './t';
import getOCoords from './o';

export default function getBlockCoords(type, coords, angle) {
	if (type === 't')
		return getTCoords(coords, angle)
	if (type === 'o')
		return getOCoords(coords)
}