import React, { useState } from 'react';

function Register() {
	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: '',
		passwordCfm: ''
	});
	const { name, email, password, passwordCfm } = user;

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
				Account <span className="text-primary">Registration</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input name="name" type="text" value={name} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input name="email" type="email" value={email} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input name="password" type="password" value={password} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="passwordCfm">Confirm Password</label>
					<input name="passwordCfm" type="password" value={passwordCfm} onChange={handleChange} />
				</div>
				<input type="submit" className="btn btn-primary btn-block" value="Register" />
			</form>
		</div>
	);
}

export default Register;
