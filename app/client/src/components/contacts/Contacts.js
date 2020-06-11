import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContactContext } from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

function Contacts() {
	const { contacts, filtered } = useContext(ContactContext);

	let contactsComponents;
	if (filtered === null) {
		contactsComponents = contacts.map((contact) => (
			<CSSTransition key={contact._id} timeout={500} classNames="item">
				<ContactItem contact={contact} />
			</CSSTransition>
		));
	} else {
		contactsComponents = filtered.map((contact) => (
			<CSSTransition key={contact._id} timeout={500} classNames="item">
				<ContactItem contact={contact} />
			</CSSTransition>
		));
	}

	return (
		<Fragment>
			{contactsComponents.length > 0 ? (
				<TransitionGroup>{contactsComponents}</TransitionGroup>
			) : (
				<h4>Add your first contact!</h4>
			)}
		</Fragment>
	);
}

export default Contacts;
