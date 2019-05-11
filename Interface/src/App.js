import React from 'react';
import './App.css';
import Loader from "./Loader";

function App() {
	const [question, setQuestion] = React.useState('Can dogs look up?');
	const [answer, setAnswer] = React.useState('Yes but they have to sit down');
	const [isLoading, setIsLoading] = React.useState(false);

	const handleKeyPress = e => {
		if (e.key == 'Enter') {
			console.log('enter pressed');
			setIsLoading(true);
			fetchAnswer(question).then(a => {
				setAnswer(a);
				setIsLoading(false);
			});
		}
	};

	const fetchAnswer = async question => {
		console.log(question);
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve('Maybe'), 1000);
		});
	};

	return (
		<div className="App" onKeyPress={handleKeyPress}>
			<h1>ELI5 QA</h1>
			<h2>Question:</h2>
			<input id="question" onChange={e => setQuestion(e.target.value)} autoFocus />
			<h2>Answer:</h2>
      {isLoading?<Loader></Loader>:
			<p id="answer" autoFocus>
      {answer}
			</p>}
		</div>
	);
}

export default App;
