"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// child
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    post_code: { type: String, required: true },
    name: { type: String, required: true }
});
// child
const orderSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    img: { type: String, required: true },
    value: { type: Number, required: true },
    title: { type: String, required: true },
});
// child
const othersSchema = new mongoose_1.Schema({
    track: { type: Number, required: true },
    status: { type: String, required: true }
});
// parent
const userOrdersSchema = new mongoose_1.Schema({
    user: { type: userSchema, required: true },
    orders: { type: [orderSchema], required: true },
    others: { type: othersSchema, required: true }
}, { timestamps: true });
const Order = (0, mongoose_1.model)('Order', userOrdersSchema);
exports.default = Order;
