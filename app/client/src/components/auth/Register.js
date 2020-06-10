import React, { useState, useContext } from 'react';
import { AlertContext } from '../../context/alert/AlertContext';

function Register() {
	const { setAlert } = useContext(AlertContext);

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
		if (password !== passwordCfm) {
			setAlert('Passwords do not match', 'danger');
		} else {
			console.log('Success');
		}
	}

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Registration</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input name="name" type="text" value={name} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input name="email" type="email" value={email} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						value={password}
						onChange={handleChange}
						required
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="passwordCfm">Confirm Password</label>
					<input
						name="passwordCfm"
						type="password"
						value={passwordCfm}
						onChange={handleChange}
						required
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary btn-block" value="Register" />
			</form>
		</div>
	);
}

export default Register;
