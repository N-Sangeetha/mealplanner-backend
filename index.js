const express = require('express');
const connectDB = require('./src/db/mongoose');
const plannerRouter = require('./src/routers/planner');
const recipesRouter = require('./src/routers/recipes');
const app = express();
const port = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	next();
});

//Routes
app.use('/api', plannerRouter);
app.use('/api', recipesRouter);

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
