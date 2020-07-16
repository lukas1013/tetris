import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GameProvider } from './contexts/game';
import { ScoreProvider } from './contexts/score';

const Home = React.lazy(() => import('./pages/home/'));
const Game = React.lazy(() => import('./pages/game/'));
const Scores = React.lazy(() => import('./pages/scores/'));
const Settings = React.lazy(() => import('./pages/settings/'));

export default function Routes() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route path='/' exact component={Home} />
				
				<Route path='/game'>
					<GameProvider>
						<Game/>
					</GameProvider>
				</Route>
				
				<Route path='/scores'>
					<ScoreProvider>
						<Scores/>
					</ScoreProvider>
				</Route>
				
				<Route path='/settings' component={Settings} />
			</Switch>
		</Suspense>
	);
}