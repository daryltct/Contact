const express = require('express');
const app = express();

//Require Routes
const authRoutes = require('./routes/auth'),
	contactsRoutes = require('./routes/contacts'),
	usersRoutes = require('./routes/users');

//Use Routes: automatically appends url chain infront of respective routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
	res.send('Server initalized');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is listening...');
});
