const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    email: String,
    first_name: String,
    last_name: String,
    full_name: String,
    phone_number: Number,
    phone_code: Number,
    bio: String,
    profile_photo: String,
    background_photo: String,
    rating: Number,
    rating_n: Number,
    time_zone: String,
    is_active: String,
    is_admin: String,
    verification_n: String,
    objects: String,
    blocked_by: [this],
});

module.exports = mongoose.model('User', userSchema);