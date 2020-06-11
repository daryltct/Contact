import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<Router>
			<Fragment>
				<Navbar />
				<div className="container">
					<Alerts />
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
}

export default App;
