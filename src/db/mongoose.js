const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/mealplanner-api', {
mongoose.connect('mongodb+srv://vercel-admin-user:Bokko@456@cluster0.fz8tz.mongodb.net/?retryWrites=true&w=majority', {
	useUnifiedTopology: true,
	useCreateIndex: true,
	useNewUrlParser: true,
});
