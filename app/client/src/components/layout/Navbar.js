import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

function Navbar() {
	const { isLoggedIn, user, logout } = useContext(AuthContext);

	const authLinks = (
		<Fragment>
			<li>Hello, {user && user.name}</li>
			<li>
				<a href="#" />
				<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<Link to="/">
				<h1>
					<i className="fas fa-id-card-alt" /> Contacts Manager
				</h1>
			</Link>
			<ul>{isLoggedIn ? authLinks : guestLinks}</ul>
		</div>
	);
}

export default Navbar;
