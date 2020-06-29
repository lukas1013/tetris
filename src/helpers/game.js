import gameConfig from '../config/game';
import getBlockCoords, { isCollided } from './coords/';
import * as db from '../db';

export function getRandomPoliminoType() {
	const types = ['t', 'o', 'i', 'l', 'j', 's', 'z'];
	const r = Math.floor(Math.random() * types.length)
	return types[r]
}

export function getRandomColor() {
	const colors = ['#D9003D', '#DB006A', '#B3DB00', '#00DB71', '#006FD9']
	const ind = Math.floor(Math.random() * colors.length)
	return colors[ind]
}


export function getNextFocus(state) {
	const newFocus = [...state.poliminos].reduce((pre, next) => {
		if ((pre.coords.y > next.coords.y && !pre.hasArrived) || (!pre.hasArrived && next.hasArrived)) {
			return pre
		}
		return next
	});
	
	return state.poliminos.indexOf(newFocus)
}

export function nextPolimino(state) {
	const blocks = [...state.nextBlocks], { inFocus } = state;
	const next = {...blocks.shift()}
	next.coords = {x: 40, y: 0}
	state.poliminos.push(next);
	
	if (gameOver(state.theyArrived, next)) {
		state.ended = true
		db.saveScore(state.playingTime, state.score, state.deletedLines)
		return state
	}

	if (!state.poliminos[inFocus] || state.poliminos[inFocus].hasArrived) {
		state.inFocus = getNextFocus(state)
	}

	const type = getRandomPoliminoType()
	const third = {
		type,
		angle: 0,
		coords: {
			x: (() => {
				if (['t', 's', 'z'].includes(type)) return 15;
				if (['o', 'j'].includes(type)) return 20;
				//if (['l', 'i'].includes(type))
				return 10;
			})()
		},
		color: getRandomColor()
	}
	
	blocks.push(third)
	for (let i = 0; i < 3; i++) {
		blocks[i].coords.y = 120 / 3 * i + 10
	}
	
	state.nextBlocks = blocks

}

export function gameOver(poliminos, polimino) {
	const points = getBlockCoords(polimino.type, polimino.coords, polimino.angle)
	
	if (polimino.hasArrived && points.some(p => p.y < gameConfig.minY)) {
		return true
	}
	
	return poliminos.some(p => {
		return isCollided(polimino, p)
	})
}