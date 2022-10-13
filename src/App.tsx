import './App.css'
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import { useEffect } from 'react';
import { applyTheme } from "./utils";
import Color from "./Colors";

function App() {
	let baseUrl = window.location.href;
	useEffect(() => {
		applyTheme(new Color());
	}, []);
	return (
		<div className="App">
			<nav className="sticky top-0 text-light">
				<div className="menu">
					<a href='#Profile'>Profile</a>
					<a href='#Skills/Languages'>Skills</a>
				</div>
			</nav>
			<Route path="/" component={Home}></Route>
		</div>
	)
}

export default App