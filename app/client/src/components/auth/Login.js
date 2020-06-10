import React, { useState } from 'react';

function Login() {
	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});
	const { email, password } = user;

	function handleChange(event) {
		const { name, value } = event.target;
		setUser({
			...user,
			[name]: value
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input name="email" type="email" value={email} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input name="password" type="password" value={password} onChange={handleChange} />
				</div>
				<input type="submit" className="btn btn-primary btn-block" value="Login" />
			</form>
		</div>
	);
}

export default Login;
