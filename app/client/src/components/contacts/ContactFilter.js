import React, { useEffect, useContext, useRef } from 'react';
import { ContactContext } from '../../context/contact/ContactContext';

function ContactFilter() {
	const { filtered, filterContacts, clearFilter } = useContext(ContactContext);
	const text = useRef('');

	useEffect(() => {
		if (!filtered) {
			text.current.value = '';
		}
	});

	function handleChange(event) {
		const { value } = event.target;
		if (text.current.value) {
			filterContacts(value);
		} else {
			clearFilter();
		}
	}

	return (
		<form>
			<input ref={text} type="text" placeholder="Filter Contacts" onChange={handleChange} />
		</form>
	);
}

export default ContactFilter;
