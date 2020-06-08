const mongoose = require('mongoose');
const config = require('config'); //allow us to access global variables defined in /config/default.json
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		mongoose.set('useUnifiedTopology', true);
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('Database Connected');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
