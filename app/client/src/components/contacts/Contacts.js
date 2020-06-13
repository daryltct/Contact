import React, { useEffect, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import { useContacts, getContacts } from '../../context/contact/ContactContext';

function Contacts() {
	const [ contactState, contactDispatch ] = useContacts();
	const { contacts, filtered, loading } = contactState;

	useEffect(
		() => {
			getContacts(contactDispatch);
		},
		[ contactDispatch ]
	);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>;
	}

	let contactsComponents;
	if (filtered === null && contacts !== null) {
		contactsComponents = contacts.map((contact) => (
			<CSSTransition key={contact._id} timeout={500} classNames="item">
				<ContactItem contact={contact} />
			</CSSTransition>
		));
	} else if (contacts !== null) {
		contactsComponents = filtered.map((contact) => (
			<CSSTransition key={contact._id} timeout={500} classNames="item">
				<ContactItem contact={contact} />
			</CSSTransition>
		));
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? <TransitionGroup>{contactsComponents}</TransitionGroup> : <Spinner />}
		</Fragment>
	);
}

export default Contacts;
