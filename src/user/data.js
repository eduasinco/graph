const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: Object.values(ROLE)},
    isActive: {type: Boolean, required: true, default: false},
    verification_n: {type: Number},
});

module.exports = {
    User: mongoose.model('User', userSchema),
    ROLE: ROLE
}
