const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mealPlan: [{
		name: {
			type: String,
    	required: true
		},
		recipes: [{
			type: mongoose.Schema.Types.ObjectId,
    	ref: 'Recipes'
		}]
    
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  });

const Planner = mongoose.model("Planner", plannerSchema);

module.exports = Planner;
