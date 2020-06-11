import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import contactReducer from './contactReducer';

const ContactContext = createContext();

const initialState = {
	contacts: [],
	current: null,
	filtered: null,
	error: null
};

function ContactContextProvider(props) {
	const [ contactState, dispatch ] = useReducer(contactReducer, initialState);

	//Add Contact
	async function addContact(contact) {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: 'ADD_CONTACT', payload: contact });
		} catch (err) {
			dispatch({ type: 'CONTACT_ERROR', payload: err.response.msg });
		}
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
				error: contactState.error,
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
