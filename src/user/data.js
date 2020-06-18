const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}
const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profile_image: {type: String},
    background_image: {type: String},

    role: {type: String, required: true, enum: Object.values(ROLE)},
    is_active: {type: Boolean, required: true, default: false},
    verification_n: {type: Number},
});

module.exports = {
    User: mongoose.model('User', userSchema),
    ROLE: ROLE
}
