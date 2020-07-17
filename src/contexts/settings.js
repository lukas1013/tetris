import React, { useState, useEffect, createContext, useContext } from 'react';
import { getSettings, saveSettings, deleteSettings } from '../db';

const SettingsContext = createContext({});

export const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState({
		fontSize: 4 * document.body.getBoundingClientRect().width / 100 + 'px',
		colorPrimary: '#E1DEF9',
		colorSecondary: '#00DB71',
		windowColor: '#141314',
		headerColor: '#0D0207',
		buttonColor: '#DA0061',
		footerColor: '#383438',
		sidebarColor: '#0D0207',
		gameButtonColor: '#E1DEF9',
		fullscreen: false,
		sound:true,
		track: 1,
		vibrate:true
	});
	
	//load settings
	useEffect(() => {
		getSettings().then(savedSettings => {
			if (Object.keys(savedSettings).length) {
				setSettings(savedSettings)
			}
		})
	}, []);
	
	//render preferences
	useEffect(() => {
		if (Object.keys(settings).length) {
			const { fontSize, colorPrimary, colorSecondary, windowColor, headerColor, buttonColor, footerColor, sidebarColor, gameButtonColor } = settings;
		
			document.documentElement.setAttribute('style', `
				--fontSize:${fontSize};
				--colorPrimary:${colorPrimary};
				--colorSecondary:${colorSecondary};
				--windowColor:${windowColor};
				--headerColor:${headerColor};
				--buttonColor:${buttonColor};
				--footerColor:${footerColor};
				--sidebarColor:${sidebarColor};
				--gameButtonColor:${gameButtonColor}
			`);
		}
	}, [settings]);
	
	async function savePreferences(preferences) {
		await saveSettings(preferences);
		//quick access to firefox
		try{
			localStorage.setItem('fullscreen', JSON.stringify(preferences.fullscreen));
			localStorage.setItem('track', preferences.track)
		}catch(e){
			console.log(e.message)
		}
		setSettings(preferences);
	}
	
	async function resetDefault() {
		await deleteSettings();
		
		const defaultSettings = {
			fontSize: 4 * document.body.getBoundingClientRect().width / 100 + 'px',
			colorPrimary: '#E1DEF9',
			colorSecondary: '#00DB71',
			windowColor: '#141314',
			headerColor: '#0D0207',
			buttonColor: '#DA0061',
			footerColor: '#383438',
			sidebarColor: '#0D0207',
			gameButtonColor: '#E1DEF9',
			fullscreen: false,
			sound:true,
			track: 1,
			vibrate:true
		}
		try{
			localStorage.setItem('fullscreen', JSON.stringify(false));
			localStorage.setItem('track', 1);
		}catch(e){
			console.log(e.message)
		}
		
		setSettings(defaultSettings);
	}
	
	return (
		<SettingsContext.Provider value={{ settings, savePreferences, resetDefault }}>
			{children}
		</SettingsContext.Provider>
	);
}

export const useSettings = () => useContext(SettingsContext);