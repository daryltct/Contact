const jwt = require('jsonwebtoken');
const config = require('config');

const checkToken = (req, res, next) => {
	//get token from header
	const token = req.header('x-auth-token');

	//check if token exists
	if (!token) {
		return res.status(401).json({ msg: 'You have no permission to access this page' });
	}

	try {
		//verify token: when we login/register we create a token with a payload of the user id
		//              decode the payload with .verify() and assign it to 'decoded'
		//              'decoded' now has user key which we assign to req.user which tracks the current user
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};

module.exports = checkToken;
