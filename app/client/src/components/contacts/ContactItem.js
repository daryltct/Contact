import React, { useContext } from 'react';
import { ContactContext } from '../../context/contact/ContactContext';

function ContactItem({ contact: { id, name, email, phone, type } }) {
	const { deleteContact } = useContext(ContactContext);

	function handleDelete() {
		deleteContact(id);
	}

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{`${name} `}
				<span className={`float-right badge ${type === 'professional' ? 'badge-success' : 'badge-primary'}`}>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope-open" />
						{` ${email}`}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone" />
						{` ${phone}`}
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-dark btn-sm">Edit</button>
				<button className="btn btn-danger btn-sm" onClick={handleDelete}>
					Delete
				</button>
			</p>
		</div>
	);
}

export default ContactItem;
