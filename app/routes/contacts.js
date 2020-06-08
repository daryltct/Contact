const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const authenticateToken = require('../middleware/auth');
const User = require('../models/Contact');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all user's contacts (READ)
// @access  Private
router.get('/', (req, res) => {});

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
router.put('/:id', (req, res) => {
	res.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete a particular contact (DELETE)
// @access  Private
router.delete('/:id', (req, res) => {
	res.send('Delete contact');
});

module.exports = router;
