import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GameProvider } from './contexts/game';

const Home = React.lazy(() => import('./pages/home/'));
const Game = React.lazy(() => import('./pages/game/'));

export default function Routes() {
	return (
		<Suspense fallback={() => <div>Loading...</div>}>
			<Switch>
				<Route path='/' exact component={Home} />
				<GameProvider>
					<Route path='/game' component={Game} />
				</GameProvider>
			</Switch>
		</Suspense>
	);
}