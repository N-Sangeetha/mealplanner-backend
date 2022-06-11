const express = require('express');
require('./src/db/mongoose');
const plannerRouter = require('./src/routers/planner');
const recipesRouter = require('./src/routers/recipes');
const app = express();
const port = process.env.PORT || 5000;

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

app.use(plannerRouter);
app.use(recipesRouter);

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
