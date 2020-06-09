import React, { useState } from 'react';

function ContactForm() {
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

	return (
		<form action="">
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
