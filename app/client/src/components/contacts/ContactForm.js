import React, { useState, useContext } from 'react';
import { ContactContext } from '../../context/contact/ContactContext';

function ContactForm() {
	const { addContact } = useContext(ContactContext);

	const [ contact, setContact ] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setContact({
			...contact,
			[name]: value
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		addContact(contact);
		//dispatch({ type: 'ADD_CONTACT', payload: contact });
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal'
		});
	}

	return (
		<form action="" onSubmit={handleSubmit}>
			<h2 className="text-primary">Add Contact</h2>
			<input name="name" type="text" placeholder="Name" value={contact.name} onChange={handleChange} />
			<input name="email" type="text" placeholder="Email" value={contact.email} onChange={handleChange} />
			<input name="phone" type="text" placeholder="Phone" value={contact.phone} onChange={handleChange} />
			<h4>Contact Type</h4>
			<label>
				<input
					name="type"
					type="radio"
					value="personal"
					checked={contact.type === 'personal'}
					onChange={handleChange}
				/>{' '}
				Personal {' '}
			</label>
			<label>
				<input
					name="type"
					type="radio"
					value="professional"
					checked={contact.type === 'professional'}
					onChange={handleChange}
				/>{' '}
				Professional
			</label>
			<div>
				<input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
			</div>
		</form>
	);
}

export default ContactForm;
