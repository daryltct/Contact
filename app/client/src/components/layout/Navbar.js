import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { useContacts, clearContacts } from '../../context/contact/ContactContext';

function Navbar() {
	const contactDispatch = useContacts()[1]; //just retrieve index 1 (dispatch), without contactState
	const { isLoggedIn, user, logout } = useContext(AuthContext);

	function handleClick() {
		logout();
		clearContacts(contactDispatch);
	}

	const authLinks = (
		<Fragment>
			<li>Hello, {user && user.name}</li>
			<li>
				<a href="#" onClick={handleClick}>
					<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
				</a>
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
