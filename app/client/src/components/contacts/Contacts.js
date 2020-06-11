import React, { useEffect, Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContactContext } from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

function Contacts() {
	const { contacts, filtered, getContacts, loading } = useContext(ContactContext);

	useEffect(() => {
		getContacts();
	}, []);

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
