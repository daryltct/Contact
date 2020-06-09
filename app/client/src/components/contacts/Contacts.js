import React, { useContext } from 'react';
import { ContactContext } from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

function Contacts() {
	const { contacts } = useContext(ContactContext);

	const contactsComponents = contacts.map((contact) => (
		<ContactItem key={contact.id} contact={contact} /> //
	));

	return <div>{contactsComponents}</div>;
}

export default Contacts;
