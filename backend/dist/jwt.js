"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeJWT = exports.getJWTPayload = void 0;
var permit_1 = require("permit");
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var http_error_1 = require("./http.error");
var env_1 = require("./env");
var permit = new permit_1.Bearer({
    query: "access_token",
});
function getJWTPayload(req) {
    var token;
    try {
        token = permit.check(req);
        console.log(token);
    }
    catch (error) {
        console.log(error);
        throw new http_error_1.HttpError(401, "missing jwt token");
    }
    if (!token) {
        throw new http_error_1.HttpError(401, "empty jwt token");
    }
    var payload;
    try {
        payload = jwt_simple_1.default.decode(token, env_1.env.JWT_SECRET);
    }
    catch (error) {
        throw new http_error_1.HttpError(403, "invalid jwt token");
    }
    return payload;
}
exports.getJWTPayload = getJWTPayload;
function encodeJWT(payload) {
    return jwt_simple_1.default.encode(payload, env_1.env.JWT_SECRET);
}
exports.encodeJWT = encodeJWT;
//# sourceMappingURL=jwt.js.map