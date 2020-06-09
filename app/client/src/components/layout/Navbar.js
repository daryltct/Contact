import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<div className="navbar bg-primary">
			<Link to="/">
				<h1>
					<i className="fas fa-id-card-alt" /> Contacts Manager
				</h1>
			</Link>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
