import React, { useEffect, useRef } from 'react';
import { useContacts, filterContacts, clearFilter } from '../../context/contact/ContactContext';

function ContactFilter() {
	const [ contactState, contactDispatch ] = useContacts();
	const { filtered } = contactState;
	const text = useRef('');

	useEffect(() => {
		if (!filtered) {
			text.current.value = '';
		}
	});

	function handleChange(event) {
		const { value } = event.target;
		if (text.current.value) {
			filterContacts(contactDispatch, value);
		} else {
			clearFilter(contactDispatch);
		}
	}

	return (
		<form>
			<input ref={text} type="text" placeholder="Filter Contacts" onChange={handleChange} />
		</form>
	);
}

export default ContactFilter;
