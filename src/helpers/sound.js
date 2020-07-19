//import moveSound from '../assets/move.wav';
//import quickFallSound from '../assets/quick_fall.wav'
import lineRemovalSound from '../assets/remove_line.wav';
import gameOverSound from '../assets/game_over.wav';

const sound = new Audio();

export function playMotionSound() {
	
}

export function playQuickFallSound() {
	
}

export function playLineRemovalSound() {
	sound.src = lineRemovalSound;
	sound.play();
}

export function playGameOverSound() {
	sound.src = gameOverSound;
	sound.play()
}