const express = require('express');
const Tweets = require('../model/tweets');
const router = new express.Router();

router.post('/tweets', async (req, res) => {
	const tweets = new Tweets(req.body);

	try {
		await tweets.save();
		res.status(201).send(tweets);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get('/tweets', async (req, res) => {
	try {
		const tweets = await Tweets.find({});
		res.send(tweets);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/tweets/:id', async (req, res) => {
	try {
		const tweets = await Tweets.findById(req.params.id);

		if (!tweets) {
			return res.status(404).send();
		}

		res.send(tweets);
	} catch (e) {
		res.status(500).send();
	}
});

router.patch('/tweets/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		'userName', 'tweets'
	];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const tweets = await Tweets.findById(req.params.id);

		if (!tweets) {
			return res.status(404).send();
		}

		updates.forEach((update) => (tweets[update] = req.body[update]));
		await tweets.save();
		res.send(tweets);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/tweets/:id', async (req, res) => {
	try {
		const tweets = await Tweets.findByIdAndDelete(req.params.id);

		if (!tweets) {
			return res.status(404).send();
		}

		res.send(tweets);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;