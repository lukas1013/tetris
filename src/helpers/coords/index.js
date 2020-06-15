import getTCoords from './t';
import getOCoords from './o';
import getICoords from './i';

export default function getBlockCoords(type, coords, angle) {
	if (type === 't')
		return getTCoords(coords, angle)
	if (type === 'o')
		return getOCoords(coords)
	if (type === 'i')
		return getICoords(coords, angle)
}