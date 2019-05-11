import * as React from 'react';
import './App.css';

const QuerySelector = ({ settings, setSettings }) => {
	let css = {};
	Object.keys(settings).forEach(k => (css[k] = settings[k] ? '' : ' pressed'));

	return (
		<div className="row">
			{Object.keys(settings).map(k => {
				return (
					<button
						className={settings[k] ? '' : 'pressed'}
						onClick={() => {
							let newSettings = Object.assign({}, settings);
							newSettings[k] = !settings[k];
							setSettings(newSettings);
							console.log(settings);
						}}
						key={k}
					>
						{k}
					</button>
				);
			})}
		</div>
	);
};

export default QuerySelector;
