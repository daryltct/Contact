const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const authenticateToken = require('../middleware/auth');
const User = require('../models/Contact');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all user's contacts (READ)
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); //sort by most recent
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/contacts
// @desc    Add new contact for particular user (CREATE)
// @access  Private
router.post('/', authenticateToken, [ check('name', 'Please enter a name').not().isEmpty() ], async (req, res) => {
	//check if user input passes validation
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, phone, type } = req.body;
	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id
		});
		const contact = await newContact.save();
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/contacts/:id
// @desc    Update a particular contact (UPDATE)
// @access  Private
router.put('/:id', authenticateToken, async (req, res) => {
	const { name, email, phone, type } = req.body;

	const updatedFields = {};
	if (name) updatedFields.name = name;
	if (email) updatedFields.email = email;
	if (phone) updatedFields.phone = phone;
	if (type) updatedFields.type = type;

	try {
		//check if contact exists
		let contact = await Contact.findById(req.params.id);
		if (!contact) {
			return res.status(404).json({ msg: 'Contact not found' });
		}

		//ensure users owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'You have no permission to do that' });
		}

		//update contact and save to database
		contact = await Contact.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true }); //if contact field does not exist, then create it

		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/contacts/:id
// @desc    Delete a particular contact (DELETE)
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
	try {
		//check if contact exists
		let contact = await Contact.findById(req.params.id);
		if (!contact) {
			return res.status(404).json({ msg: 'Contact not found' });
		}

		//ensure users owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'You have no permission to do that' });
		}

		//remove contact from database
		contact = await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Successfully deleted contact' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
