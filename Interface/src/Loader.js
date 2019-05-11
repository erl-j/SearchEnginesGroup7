import * as React from 'react';
import { useState } from 'react';
import './App.css';

const Loader = () => {
	const [count, setCount] = useState(0);


	// [1,2,3,4,5,6,7,8,9].forEach(t=>setTimeout(() => setCount(count < 500 ? count + 1 : 0), 150*t));

	return <p id="answer">{'Loading' + '.'.repeat(count)}</p>;
};

export default Loader;
