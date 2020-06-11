import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { AlertContext } from '../../context/alert/AlertContext';

function Login() {
	let history = useHistory();
	const { login, error, clearErrors, isLoggedIn } = useContext(AuthContext);
	const { setAlert } = useContext(AlertContext);

	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});
	const { email, password } = user;

	useEffect(
		() => {
			//if user already logged in, redirect to home page
			if (isLoggedIn) {
				history.push('/');
			}

			if (error) {
				setAlert(error, 'danger');
				clearErrors();
			}
		},
		[ error, isLoggedIn, history ]
	);

	function handleChange(event) {
		const { name, value } = event.target;
		setUser({
			...user,
			[name]: value
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		login({
			email,
			password
		});
	}

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input name="email" type="email" value={email} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input name="password" type="password" value={password} onChange={handleChange} required />
				</div>
				<input type="submit" className="btn btn-primary btn-block" value="Login" />
			</form>
		</div>
	);
}

export default Login;
