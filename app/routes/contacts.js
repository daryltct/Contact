const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all user's contacts (READ)
// @access  Private
router.get('/', (req, res) => {
	res.send('Get all user contacts');
});

// @route   POST api/contacts
// @desc    Add new contact for particular user (CREATE)
// @access  Private
router.post('/', (req, res) => {
	res.send('Add contact');
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
