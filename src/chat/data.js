const mongoose = require('mongoose');
const User = require('../user/data')

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    name: String,
    participants: {type: [String]}
});

module.exports = mongoose.model('Chat', orderSchema);