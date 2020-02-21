"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ProjectSchema = new mongoose.Schema({
    businessId: String,
    businessName: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    flow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flow',
    },
    id: String,
    name: String,
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source',
    },
    status: String,
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
//# sourceMappingURL=project.schema.js.map