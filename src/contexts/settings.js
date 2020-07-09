import React, { useState, useEffect, createContext, useContext } from 'react';
import { getSettings, saveSettings, deleteSettings } from '../db';

const SettingsContext = createContext({});

export const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState({});

	//render preferences
	useEffect(() => {
		//html tag
		if (Object.keys(settings).length) {
			renderSettings(settings);
		}
	}, [settings]);
	
	//load settings
	useEffect(() => {
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
			vibrate:true
		}
		getSettings().then(savedSettings => {
			setSettings(Object.keys(savedSettings).length ? savedSettings : defaultSettings);
		}).catch(() => setSettings(defaultSettings));
	}, []);
	
	const savePreferences = async preferences => {
		await saveSettings(preferences);
		setSettings(preferences);
	}
	
	const resetDefault = async () => {
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
			vibrate:true
		}
		renderSettings(defaultSettings);
		setSettings(defaultSettings);
	}
	
	function renderSettings(settings) {
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
	
	return (
		<SettingsContext.Provider value={{ settings, savePreferences, resetDefault }}>
			{children}
		</SettingsContext.Provider>
	);
}

export const useSettings = () => useContext(SettingsContext);