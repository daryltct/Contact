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
	],
	current: null,
	filtered: null
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
	function setCurrent(contact) {
		dispatch({ type: 'SET_CURRENT', payload: contact });
	}
	//Clear Current Contact
	function clearCurrent() {
		dispatch({ type: 'SET_CURRENT', payload: null });
	}
	//Update Contact
	function updateContact(updatedContact) {
		const currentContacts = contactState.contacts;
		const updatedContacts = currentContacts.map((contact) => {
			if (contact.id === updatedContact.id) {
				return updatedContact;
			}
			return contact;
		});
		dispatch({ type: 'UPDATE_CONTACT', payload: updatedContacts });
	}
	//Filter Contacts
	function filterContacts(query) {
		const currentContacts = contactState.contacts;
		const filteredContacts = currentContacts.filter((contact) => {
			const regex = new RegExp(`${query}`, 'gi');
			return contact.name.match(regex) || contact.email.match(regex);
		});
		dispatch({ type: 'FILTER_CONTACTS', payload: filteredContacts });
	}
	//Clear Filter
	function clearFilter() {
		dispatch({ type: 'CLEAR_FILTER' });
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: contactState.contacts,
				current: contactState.current,
				filtered: contactState.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
}

export { ContactContextProvider, ContactContext };
