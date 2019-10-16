"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    image: String,
    description: String,
    price: Number,
    created: {
        type: Date,
        default: Date.now,
    },
});
//# sourceMappingURL=product.schema.js.map