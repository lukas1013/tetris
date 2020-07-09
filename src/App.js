import React from 'react';
import Routes from './routes';
import { SettingsProvider } from './contexts/settings';
import './styles.css';

const App = () => <SettingsProvider><Routes/></SettingsProvider>;

export default App;