import React from 'react';

import { GameProvider } from './contexts/game'; 
import Game from './pages/game';

import './styles.css';

const App = () => 
	(<GameProvider>
		<Game/>
	</GameProvider>);

export default App;
