import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GameProvider } from './contexts/game';
import { ScoreProvider } from './contexts/score';

import Home from './pages/home/';
import Game from './pages/game/';
import Score from './pages/score/';

export default function Routes() {
	return (
		<Suspense fallback={() => <div>Loading...</div>}>
			<Switch>
				<Route path='/' exact component={Home} />
				
				<Route path='/game'>
					<GameProvider>
						<Game/>
					</GameProvider>
				</Route>
				
				<Route path='/scores'>
					<ScoreProvider>
						<Score/>
					</ScoreProvider>
				</Route>
			</Switch>
		</Suspense>
	);
}