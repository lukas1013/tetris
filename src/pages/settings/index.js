import React, { useState, useEffect, useRef, memo } from 'react';
import { useSettings } from '../../contexts/settings';

import './styles.css';

function Settings(props) {
	const { settings, savePreferences, resetDefault } = useSettings();
	const [preferences, setPreferences] = useState({...settings});
	
	const fSizeRef = useRef(null);
	const { width } = document.body.getBoundingClientRect();
	
	//render font size changes
	useEffect(() => {
		fSizeRef.current.style.fontSize = preferences.fontSize;
	}, [preferences]);
	
	useEffect(() => {
		setPreferences(settings)
	}, [settings]);
	
	function setPreference(prop, value) {
		const newPreferences = {...preferences}
		newPreferences[prop] = value;
		setPreferences(newPreferences)
	}
	
	return (
		<>
			<header>
				<main className='container'>
					<h1 id='title'>Settings</h1>
				</main>
			</header>
			
			<main id='settings-content' className='content'>
				<section className='setting'>
					<h2>Text</h2>
					<h3>Size</h3>
					<div className='container'>
						<button onClick={() => setPreference('fontSize',3 * width / 100 + 'px')} className={preferences.fontSize === 3 * width / 100 + 'px' ? 'choice on' : 'choice'}>small</button>
						<button onClick={() => setPreference('fontSize',4 * width / 100 + 'px')} className={preferences.fontSize === 4 * width / 100 + 'px' ? 'choice on' : 'choice'}>medium</button>
						<button onClick={() => setPreference('fontSize',6 * width / 100 + 'px')} className={preferences.fontSize === 6 * width / 100 + 'px' ? 'choice on' : 'choice'}>large</button>
						<span>10</span>
						<input id='range-fz' step='0.1' onChange={e => setPreference('fontSize',e.target.value + 'px')} value={typeof preferences.fontSize === 'string' ? preferences.fontSize.replace('px','') : ''} type='range' min='10' max='60'/>
						<span>60</span>
						<span id='f-size' ref={fSizeRef}>{preferences.fontSize}</span>
					</div>
					
					<h3>Color</h3>
					<div className='container'>
						<h4 className='label'>Primary</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#E1DEF9"}} disabled={preferences.colorPrimary === '#E1DEF9'} onClick={() => setPreference('colorPrimary','#E1DEF9')} className='color'></button>
							<button style={{backgroundColor: "#DA0061"}} disabled={preferences.colorPrimary === '#DA0061'} onClick={() => setPreference('colorPrimary','#DA0061')} className='color'></button>
							<button style={{backgroundColor: "#7100D9"}} disabled={preferences.colorPrimary === '#7100D9'} onClick={() => setPreference('colorPrimary','#7100D9')} className='color'></button>
							<button style={{backgroundColor: "#00DB71"}} disabled={preferences.colorPrimary === '#00DB71'} onClick={() => setPreference('colorPrimary','#00DB71')} className='color'></button>
						</div>
						
						<h4 className='label'>Secondary</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#E1DEF9"}} disabled={preferences.colorSecondary === '#E1DEF9'} onClick={() => setPreference('colorSecondary','#E1DEF9')} className='color'></button>
							<button style={{backgroundColor: "#DA0061"}} disabled={preferences.colorSecondary === '#DA0061'} onClick={() => setPreference('colorSecondary','#DA0061')} className='color'></button>
							<button style={{backgroundColor: "#7100D9"}} disabled={preferences.colorSecondary === '#7100D9'} onClick={() => setPreference('colorSecondary','#7100D9')} className='color'></button>
							<button style={{backgroundColor: "#00DB71"}} disabled={preferences.colorSecondary === '#00DB71'} onClick={() => setPreference('colorSecondary','#00DB71')} className='color'></button>
						</div>
					</div>
				</section>
					
				<section className='setting'>
					<h2>Background</h2>
					<h3>Color</h3>
					<div className='container'>
						<h4 className='label'>Window</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#E1DEF9"}} disabled={preferences.windowColor === '#E1DEF9'} onClick={() => setPreference('windowColor','#E1DEF9')} className='color'></button>
							<button style={{backgroundColor: "#383438"}} disabled={preferences.windowColor === '#383438'} onClick={() => setPreference('windowColor','#383438')} className='color dark'></button>
							<button style={{backgroundColor: "#141314"}} disabled={preferences.windowColor === '#141314'} onClick={() => setPreference('windowColor','#141314')} className='color dark'></button>
							<button style={{backgroundColor: "#0D0207"}} disabled={preferences.windowColor === '#0D0207'} onClick={() => setPreference('windowColor','#0D0207')} className='color dark'></button>
						</div>
						
						<h4 className='label'>Header</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#383438"}} disabled={preferences.headerColor === '#383438'} onClick={() => setPreference('headerColor','#383438')} className='color dark'></button>
							<button style={{backgroundColor: "#0D0207"}} disabled={preferences.headerColor === '#0D0207'} onClick={() => setPreference('headerColor','#0D0207')} className='color dark'></button>
							<button style={{backgroundColor: "#DA0061"}} disabled={preferences.headerColor === '#DA0061'} onClick={() => setPreference('headerColor','#DA0061')} className='color'></button>
							<button style={{backgroundColor: "#7100D9"}} disabled={preferences.headerColor === '#7100D9'} onClick={() => setPreference('headerColor','#7100D9')} className='color'></button>
						</div>
						
						<h4 className='label'>Footer</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#383438"}} disabled={preferences.footerColor === '#383438'} onClick={() => setPreference('footerColor','#383438')} className='color dark'></button>
							<button style={{backgroundColor: "#0D0207"}} disabled={preferences.footerColor === '#0D0207'} onClick={() => setPreference('footerColor','#0D0207')} className='color dark'></button>
							<button style={{backgroundColor: "#DA0061"}} disabled={preferences.footerColor === '#DA0061'} onClick={() => setPreference('footerColor','#DA0061')} className='color'></button>
							<button style={{backgroundColor: "#7100D9"}} disabled={preferences.footerColor === '#7100D9'} onClick={() => setPreference('footerColor','#7100D9')} className='color'></button>
						</div>
						
						<h4 className='label'>Buttons</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#E1DEF9"}} disabled={preferences.buttonColor === '#E1DEF9'} onClick={() => setPreference('buttonColor','#E1DEF9')} className='color'></button>
							<button style={{backgroundColor: "#383438"}} disabled={preferences.buttonColor === '#383438'} onClick={() => setPreference('buttonColor','#383438')} className='color dark'></button>
							<button style={{backgroundColor: "#DA0061"}} disabled={preferences.buttonColor === '#DA0061'} onClick={() => setPreference('buttonColor','#DA0061')} className='color'></button>
							<button style={{backgroundColor: "#7100D9"}} disabled={preferences.buttonColor === '#7100D9'} onClick={() => setPreference('buttonColor','#7100D9')} className='color'></button>
						</div>
					</div>
				</section>
				
				<section className='setting'>
					<h2>Game</h2>
					<div id='check-container'>
						<input onChange={() => setPreference('fullscreen', !preferences.fullscreen)} checked={preferences.fullscreen} id='fullscreen' type='checkbox' />
						<h4><label htmlFor='fullscreen'>Fullscreen</label></h4>
							
						<input disabled={true} onChange={() => setPreference('sound', !preferences.sound)} checked={preferences.sound} id='sound' type='checkbox' />
						<h4><label htmlFor='sound'>Sound</label></h4>
							
						<input onChange={() => setPreference('vibrate', !preferences.vibrate)} checked={preferences.vibrate} id='vibrate' type='checkbox' />
						<h4><label htmlFor='vibrate'>Vibrate</label></h4>
					</div>
					
					<h3>Sidebar</h3>
					<div className='container'>
						<h4 className='label'>Color</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#E1DEF9"}} disabled={preferences.sidebarColor === '#E1DEF9'} onClick={() => setPreference('sidebarColor','#E1DEF9')} className='color'></button>
							<button style={{backgroundColor: "#383438"}} disabled={preferences.sidebarColor === '#383438'} onClick={() => setPreference('sidebarColor','#383438')} className='color dark'></button>
							<button style={{backgroundColor: "#141314"}} disabled={preferences.sidebarColor === '#141314'} onClick={() => setPreference('sidebarColor','#141314')} className='color dark'></button>
							<button style={{backgroundColor: "#0D0207"}} disabled={preferences.sidebarColor === '#0D0207'} onClick={() => setPreference('sidebarColor','#0D0207')} className='color dark'></button>
						</div>
					</div>
					
					<h3>Buttons</h3>
					<div className='container'>
						<h4 className='label'>Color</h4>
						<div className='color-container'>
							<button style={{backgroundColor: "#E1DEF9"}} disabled={preferences.gameButtonColor === '#E1DEF9'} onClick={() => setPreference('gameButtonColor','#E1DEF9')} className='color'></button>
							<button style={{backgroundColor: "#383438"}} disabled={preferences.gameButtonColor === '#383438'} onClick={() => setPreference('gameButtonColor','#383438')} className='color dark'></button>
							<button style={{backgroundColor: "#DA0061"}} disabled={preferences.gameButtonColor === '#DA0061'} onClick={() => setPreference('gameButtonColor','#DA0061')} className='color'></button>
							<button style={{backgroundColor: "#7100D9"}} disabled={preferences.gameButtonColor === '#7100D9'} onClick={() => setPreference('gameButtonColor','#7100D9')} className='color'></button>
						</div>
					</div>
				</section>
				
				<button id='save' onClick={() => savePreferences(preferences)}>Save</button>
				<button id='reset' onClick={() => resetDefault()}>Reset default</button>
				<button id='cancel' onClick={() => setPreferences(settings)}>Cancel</button>
			</main>
		</>
	);
}

export default memo(Settings);