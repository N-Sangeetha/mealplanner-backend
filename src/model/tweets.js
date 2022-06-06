const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TweetSchema = new Schema({
	userName: {
		type: String,
	},
	tweets: [
		{
			text: {
				type: String,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],

});

module.exports = mongoose.model('Tweets', TweetSchema);
