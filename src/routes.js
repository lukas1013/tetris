import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GameProvider } from './contexts/game';

import Home from './pages/home/';
import Game from './pages/game/';

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
			</Switch>
		</Suspense>
	);
}