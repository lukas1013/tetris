export default function getBlockCoords(b) {
	const a = {}, c = {}, d = {};
	
	a.y = b.y;
	a.x = c.x = b.x - 10;
	d.y = c.y = b.y + 10;
	d.x = b.x;
	
	return [a,b,c,d]
}