"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        select: false,
    },
    seller: {
        type: Boolean,
        default: false,
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        zip: Number,
    },
    created: { type: Date, default: Date.now },
});
exports.UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=user.schema.js.map