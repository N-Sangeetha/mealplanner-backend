const express = require('express');
const Planner = require('../model/planner');
const router = new express.Router();

//add planner
router.post('/add-planner', async (req, res) => {
	const planner = new Planner(req.body);
	try {
		if (planner) {
			await planner.save();
			res.status(200).send({ success: true, response: { code: 200, planner } });
		}
	} catch (e) {
		res
			.status(400)
			.send({ success: false, response: { code: 400, message: e.name } });
	}
});

//get planners
router.get('/get-planners', async (req, res) => {
	try {
		const planners = await Planner.find({ isDeleted: false }, null, {sort:{
			createdAt: -1 //Sort by Date Added DESC
	}})
			.populate('Recipes')
			.exec();
		res
			.status(200)
			.send({ success: true, response: { code: 200, planners } });
	} catch (e) {
		res
		.status(400)
		.send({ success: false, response: { code: 400, message: e.name } });
	}
});

//get planner
router.get('/get-planner/:id', async (req, res) => {
	try {
		const planner = await Planner.findById(req.params.id)
			.populate('Recipes')
			.exec();

		if (!planner) {
			return res.status(404).send({
				success: false,
				response: { code: 404, message: 'planner not found' },
			});
		}
		res.status(200).send({ success: true, response: { code: 200, planner } });
	} catch (e) {
		res
		.status(400)
		.send({ success: false, response: { code: 400, message: e.name } });
	}
});


//update planner
router.patch('/update-planner/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'mealPlan'];
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
		const planner = await Planner.findById(req.params.id);

		updates.forEach((update) => (planner[update] = req.body[update]));

		await planner.save();

		if (!planner) {
			return res.send({
				success: false,
				response: { code: 404, message: 'Planner not Found' },
			});
		}
		res.status(200).send({
			success: true,
			response: { code: 200, message: 'Planner updated successfully' },
		});
	} catch (e) {
		res
			.status(400)
			.send({ success: false, response: { code: 400, message: e.name } });
	}
});


//delete planner
router.patch('/delete-planner/:id', async (req, res) => {
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
		const planner = await Planner.findById(req.params.id);

		if (!planner) {
			return res.send({
				success: false,
				response: { code: 404, message: 'Planner not Found' },
			});
		}

		updates.forEach((update) => (planner[update] = req.body[update]));
		await planner.save();
		res.status(200).send({
			success: true,
			response: { code: 200, message: 'Planner deleted successfully' },
		});

	} catch (e) {
		res
			.status(400)
			.send({ success: false, response: { code: 404, message: e.name } });
	}
});

module.exports = router;
