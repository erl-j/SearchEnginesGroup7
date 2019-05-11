import * as React from 'react';
import { useState } from 'react';
import './App.css';

const Loader = () => {
	const [count, setCount] = useState(0);

	setInterval(() => setCount(count < 500 ? count + 1 : 0), 150);

	return <p id="answer">{'Loading' + '.'.repeat(count)}</p>;
};

export default Loader;
