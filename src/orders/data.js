const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    owner_id: String,
    post_id: String,
    order_status: {type: String, enum: ["PENDING", "CONFIRMED", "CANCELED", "REJECTED", "FINISHED"]},
    seen: {type: Boolean, default: false},
    slightly_seen: {type: Boolean, default: false},
    reviewed_post: {type: Boolean, default: false},
    reviewed_guest: {type: Boolean, default: false},
    additional_guests: Number,
    order_price: Number,
});

module.exports = mongoose.model('Order', orderSchema);