"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
var bcryptjs_1 = require("bcryptjs");
var ROUND = 12;
function hashPassword(password) {
    return (0, bcryptjs_1.hash)(password, ROUND);
}
exports.hashPassword = hashPassword;
function comparePassword(options) {
    return (0, bcryptjs_1.compare)(options.password, options.hash_password);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=hash.js.map