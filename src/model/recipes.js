const mongoose = require('mongoose');

const recipesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
    totalTime: {
			type: String,
		},
    ingredients: [
      {
        measurement: {
          type: String,
        },
        name: {
          type: String,
          required: true
        }
      }
    ],
    steps: [
      {
        step: {
          type: Number,
          required: true
        },
        description: {
          type: String,
          required: true
        }
      }
    ],
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Recipes = mongoose.model('Recipes', recipesSchema);

module.exports = Recipes;
