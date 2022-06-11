const express = require('express');
const Recipes = require('../model/recipes');
const router = new express.Router();

//add recipe
router.post('/add-recipe', async (req, res) => {
	const recipe = new Recipes(req.body);
	try {
		if (recipe) {
			await recipe.save();
			res.status(200).send({ success: true, response: { code: 200, recipe } });
		}
	} catch (e) {
		res
			.status(400)
			.send({ success: false, response: { code: 400, message: e.name } });
	}
});

//get recipes
router.get('/get-recipes', async (req, res) => {
	try {
		const recipes = await Recipes.find({ isDeleted: false })
		res
			.status(200)
			.send({ success: true, response: { code: 200, recipes } });
	} catch (e) {
		res
		.status(400)
		.send({ success: false, response: { code: 400, message: e.name } });
	}
});

//get recipe
router.get('/get-recipe/:id', async (req, res) => {
	try {
		const recipe = await Recipes.findById(req.params.id)
			.populate('Recipes')
			.exec();

		if (!recipe) {
			return res.status(404).send({
				success: false,
				response: { code: 404, message: 'Recipe not found' },
			});
		}
		res.status(200).send({ success: true, response: { code: 200, recipe } });
	} catch (e) {
		res
		.status(400)
		.send({ success: false, response: { code: 400, message: e.name } });
	}
});

//update recipe
router.patch('/update-recipe/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'image', 'totalTime', 'ingredients', 'steps'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.send({
			success: false,
			response: { code: 400, message: 'Invalid updates!' },
		});
	}

	try {
		const recipe = await Recipes.findById(req.params.id);

		updates.forEach((update) => (recipe[update] = req.body[update]));

		await recipe.save();

		if (!recipe) {
			return res.send({
				success: false,
				response: { code: 404, message: 'Recipe not Found' },
			});
		}
		res.status(200).send({
			success: true,
			response: { code: 200, message: 'Recipe updated successfully' },
		});
	} catch (e) {
		res
			.status(400)
			.send({ success: false, response: { code: 400, message: e.name } });
	}
});

//delete recipe
router.patch('/delete-recipe/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['isDeleted'];

	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({
			success: false,
			response: { code: 400, error: 'Invalid updates!' },
		});
	}

	try {
		const recipe = await Recipes.findById(req.params.id);

		if (!recipe) {
			return res.send({
				success: false,
				response: { code: 404, message: 'Recipe not Found' },
			});
		}

		updates.forEach((update) => (recipe[update] = req.body[update]));
		await recipe.save();
		res.status(200).send({
			success: true,
			response: { code: 200, message: 'Recipe deleted successfully' },
		});

	} catch (e) {
		res
			.status(400)
			.send({ success: false, response: { code: 404, message: e.name } });
	}
});

module.exports = router;
