"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.app = `http://localhost:${process.env.PORT}/api`;
exports.database = process.env.MONGO_URI;
//# sourceMappingURL=constants.js.map