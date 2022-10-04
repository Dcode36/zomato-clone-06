const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const mealTypeSchema = new Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  meal_type : { type :String}
});

// create model (collection)
const MealTypeModel = mongoose.model('mealtype', mealTypeSchema);

// export model
module.exports = MealTypeModel;
