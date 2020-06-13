import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import contactReducer from './contactReducer';

const ContactContext = createContext();

//****************** CUSTOM HOOK TO USE CONTACT CONTEXT ******************
export function useContacts() {
	const { contactState, contactDispatch } = useContext(ContactContext);
	return [ contactState, contactDispatch ];
}

//********************* ACTION CREATORS *********************
//Config header used for adding, updating contacts
const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

//Get Contacts
export async function getContacts(dispatch) {
	try {
		const res = await axios.get('/api/contacts');
		dispatch({ type: 'GET_CONTACTS', payload: res.data });
	} catch (err) {
		dispatch({ type: 'CONTACT_ERROR', payload: err.response.msg });
	}
}

//Add Contact
export async function addContact(dispatch, contact) {
	try {
		const res = await axios.post('/api/contacts', contact, config);
		dispatch({ type: 'ADD_CONTACT', payload: res.data });
	} catch (err) {
		dispatch({ type: 'CONTACT_ERROR', payload: err.response.msg });
	}
}
//Delete Contact
export async function deleteContact(dispatch, id) {
	try {
		await axios.delete(`/api/contacts/${id}`);
		dispatch({ type: 'DELETE_CONTACT', payload: id });
	} catch (err) {
		dispatch({ type: 'CONTACT_ERROR', payload: err.response.msg });
	}
}
//Update Contact
export async function updateContact(dispatch, updatedContact) {
	try {
		const res = await axios.put(`/api/contacts/${updatedContact._id}`, updatedContact, config);
		dispatch({ type: 'UPDATE_CONTACT', payload: res.data });
	} catch (err) {
		dispatch({ type: 'CONTACT_ERROR', payload: err.response.msg });
	}
}
//Set Current Contact
export function setCurrent(dispatch, contact) {
	dispatch({ type: 'SET_CURRENT', payload: contact });
}
//Clear Current Contact
export function clearCurrent(dispatch) {
	dispatch({ type: 'SET_CURRENT', payload: null });
}
//Filter Contacts
export function filterContacts(dispatch, query) {
	dispatch({ type: 'FILTER_CONTACTS', payload: query });
}
//Clear Contacts
export function clearContacts(dispatch) {
	dispatch({ type: 'CLEAR_CONTACTS' });
}
//Clear Filter
export function clearFilter(dispatch) {
	dispatch({ type: 'CLEAR_FILTER' });
}

//********************* CONTEXT PROVIDER *********************
const initialState = {
	contacts: null,
	current: null,
	filtered: null,
	error: null
};

function ContactContextProvider(props) {
	const [ contactState, contactDispatch ] = useReducer(contactReducer, initialState);

	return (
		<ContactContext.Provider value={{ contactState, contactDispatch }}>{props.children}</ContactContext.Provider>
	);
}

export default ContactContextProvider;
