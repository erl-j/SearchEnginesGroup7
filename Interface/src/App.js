import React from 'react';
import './App.css';
import Loader from './Loader';
import QuerySelector from './QuerySelector';

function App() {
	const [question, setQuestion] = React.useState('Can dogs look up?');
	const [answer, setAnswer] = React.useState('Yes but they have to sit down');
	const [isLoading, setIsLoading] = React.useState(false);

	const [settings, setSettings] = React.useState({ title: false, detail: false, reply: false });

	const body = (string, fieldMask) => {
		let fields = [];
		if (fieldMask.title) {
			fields.push('title');
		}
		if (fieldMask.detail) {
			fields.push('question_detail');
		}
		if (fieldMask.reply) {
			fields.push('answer');
		}

		let body = {
			query: {
				multi_match: {
					query: {string},
					fields: fields
				},
			}
		};

		return body;
	};

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			console.log('enter pressed');
			setIsLoading(true);
			fetchAnswer(question).then(a => {
				setAnswer(a);
				setIsLoading(false);
			});
		}
	};

	const fetchAnswer = async question => {
		// return fetch('http://localhost:9200/eli/_search', {
		// 	body: JSON.stringify(body(question, settings)),
		// 	headers: { 'Content-Type': 'application/json' },
		// 	method: 'POST',
		// 	mode: 'cors', // no-cors, cors, *same-origin
		// 	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// 	credentials: 'same-origin', // include, *same-origin, omit
		// })
		// 	.then(function(response) {
		// 		return response.json();
		// 	})
		// 	.then(function(myJson) {
		// 		console.log(JSON.stringify(myJson));
		// 	});

		console.log(question);
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve('Maybe'), 1000);
		});
	};

	return (
		<div className="App" onKeyPress={handleKeyPress}>
			<h1>ELI5 QA</h1>
			<QuerySelector settings={settings} setSettings={setSettings} />
			<h2>Question:</h2>
			<input id="question" onChange={e => setQuestion(e.target.value)} autoFocus />
			<h2>Answer:</h2>
			{isLoading ? (
				<Loader />
			) : (
				<p id="answer" autoFocus>
					{answer}
				</p>
			)}
		</div>
	);
}

export default App;
