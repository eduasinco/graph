const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const foodPostSchema = new Schema({
    ownerId: String,
    plate_name: String,
    formatted_address: String,
    place_id: String,
    lat: Number,
    lng: Number,
    street_n: String,
    route: String,
    administrative_area_level_2: String,
    administrative_area_level_1: String,
    country: String,
    postal_code: Number,
    max_dinners: Number,
    dinners_left: Number,
    start_time: Date,
    end_time: Date,
    price: Number,
    food_type: String,
    description: String,
    rating: Number,
    rating_n: Number,
    reviewed: String,
    deleted: String,
    visible: String,
    created_at: String,
});

module.exports = mongoose.model('FoodPost', foodPostSchema);