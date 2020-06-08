const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Server initalized');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is listening...');
});
