import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import contactReducer from './contactReducer';

const ContactContext = createContext();

const initialState = {
	contacts: [
		{
			id: 1,
			name: 'Ted Mosby',
			email: 'tedmos@gmail.com',
			phone: '12345678',
			type: 'personal'
		},
		{
			id: 2,
			name: 'Robin Scherbatsky',
			email: 'robinshb@gmail.com',
			phone: '12341234',
			type: 'personal'
		},
		{
			id: 3,
			name: 'Marshall Eriksen',
			email: 'marshmallow@gmail.com',
			phone: '87654321',
			type: 'professional'
		}
	]
};

function ContactContextProvider(props) {
	const [ contactState, dispatch ] = useReducer(contactReducer, initialState);

	//Add Contact
	function addContact(contact) {
		contact.id = uuidv4();
		dispatch({ type: 'ADD_CONTACT', payload: contact });
	}
	//Delete Contact
	function deleteContact(id) {
		const currentContacts = contactState.contacts;
		const updatedContacts = currentContacts.filter((contact) => contact.id !== id);
		dispatch({ type: 'DELETE_CONTACT', payload: updatedContacts });
	}
	//Set Current Contact
	//Clear Current Contact
	//Update Contact
	//Filter Contacts
	//Clear Filter

	return (
		<ContactContext.Provider value={{ contacts: contactState.contacts, addContact, deleteContact }}>
			{props.children}
		</ContactContext.Provider>
	);
}

export { ContactContextProvider, ContactContext };
