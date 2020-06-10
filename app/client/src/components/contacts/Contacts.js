import React, { Fragment, useContext } from 'react';
import { ContactContext } from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

function Contacts() {
	const { contacts, filtered } = useContext(ContactContext);

	let contactsComponents;
	if (filtered === null) {
		contactsComponents = contacts.map((contact) => (
			<ContactItem key={contact.id} contact={contact} /> //
		));
	} else {
		contactsComponents = filtered.map((contact) => (
			<ContactItem key={contact.id} contact={contact} /> //
		));
	}

	return <Fragment>{contactsComponents.length > 0 ? contactsComponents : <h4>Add your first contact!</h4>}</Fragment>;
}

export default Contacts;
