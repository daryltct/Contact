import React, { useState, useEffect, useContext } from 'react';
import { ContactContext } from '../../context/contact/ContactContext';

function ContactForm() {
	const { addContact, current, clearCurrent } = useContext(ContactContext);

	const [ contact, setContact ] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	useEffect(
		() => {
			if (current) {
				setContact(current);
			} else {
				setContact({
					name: '',
					email: '',
					phone: '',
					type: 'personal'
				});
			}
		},
		[ current ]
	);

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
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal'
		});
	}

	function clearAll() {
		clearCurrent();
	}

	return (
		<form action="" onSubmit={handleSubmit}>
			<h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
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
				<input
					type="submit"
					value={current ? 'Update Contact' : 'Add Contact'}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
}

export default ContactForm;
