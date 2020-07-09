import PouchDB from 'pouchdb-browser';
import parseTime from './utils/time';

const db = new PouchDB('tetris-20', {
	'auto_compaction': true
});

function getDoc(id) {
	return new Promise((resolve, reject) => {
		db.get(id)
			.then(doc => resolve(doc))
			.catch(err => {
				if (err.status === 404) {
					db.put({
						'_id': id
					})
					
				}
				reject();
			})
	})
}

async function saveScore(playingTime, score, deletedLines) {
	const data = {
		playingTime: parseTime(playingTime),
		score,
		deletedLines
	}
	
	return await getDoc('Scores').then(doc => {
		const scores = doc.scores || [];
		doc.scores = scores.length ? scores.concat([data]) : [data];
		db.put(doc); //saving
	}).catch(err => {
		db.put({
			'_id': 'Scores',
			'Scores': [data]
		})
	})
}

async function deleteScore(index) {
	return await getDoc('Scores')
		.then(doc => {
			doc.scores = doc.scores.filter((score, ind) => ind !== index)
			db.put(doc)
		})
}

function getScores() {
	return new Promise(resolve => {
		getDoc('Scores')
			//returns scores in descending order
			.then(doc => resolve([...doc.scores].sort((a,b) => b.score - a.score)))
			.catch(err => resolve([]))
	})
}

export { saveScore, deleteScore, getScores }