"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var token = jwt_simple_1.default.encode({ id: 1, is_admin: true }, 'secret');
console.log(token);
//# sourceMappingURL=user.test.js.map