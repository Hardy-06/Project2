"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var hash_1 = require("../hash");
var http_error_1 = require("../http.error");
var jwt_1 = require("../jwt");
var UserService = /** @class */ (function () {
    function UserService(knex) {
        this.knex = knex;
    }
    UserService.prototype.table = function () {
        return this.knex("users");
    };
    UserService.prototype.login = function (users) {
        return __awaiter(this, void 0, void 0, function () {
            var row, is_matched, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table()
                            .select("id", "hash_password", "identity")
                            .where("username", users.username)
                            .first()];
                    case 1:
                        row = _a.sent();
                        if (!row)
                            throw new http_error_1.HttpError(404, "user not found");
                        return [4 /*yield*/, (0, hash_1.comparePassword)({
                                password: users.password,
                                hash_password: row.hash_password,
                            })];
                    case 2:
                        is_matched = _a.sent();
                        if (!is_matched)
                            throw new http_error_1.HttpError(401, "username or password not matched");
                        token = (0, jwt_1.encodeJWT)({ id: row.id, identity: row.identity });
                        return [2 /*return*/, { token: token }];
                }
            });
        });
    };
    UserService.prototype.signup = function (users) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = this.table())
                            .insert;
                        _c = {
                            username: users.username
                        };
                        return [4 /*yield*/, (0, hash_1.hashPassword)(users.password)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.hash_password = _d.sent(),
                                _c.nick_name = users.nick_name,
                                _c.email = users.email,
                                _c)])
                            .returning("id")];
                    case 2:
                        id = (_d.sent())[0].id;
                        return [2 /*return*/, id];
                }
            });
        });
    };
    UserService.prototype.getProfile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table()
                            .select("id", "username", "nick_name", "phone_number", "email", "image")
                            .where({ id: id })
                            .first()];
                    case 1:
                        profile = _a.sent();
                        if (!profile)
                            throw new http_error_1.HttpError(404, "user not found");
                        return [2 /*return*/, { profile: profile }];
                }
            });
        });
    };
    UserService.prototype.getUsersProfile = function (users_id) {
        return __awaiter(this, void 0, void 0, function () {
            var usersProfile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("username", "nick_name", "users.image", "identity", "name", "address", "intro", "shop.id as shop_id", "shop.image as shop_image")
                            .from("users")
                            .where("users.id", "=", users_id)
                            .leftJoin("shop", "owner", "=", "users.id")
                            .first()];
                    case 1:
                        usersProfile = _a.sent();
                        // console.log(users_id)
                        if (usersProfile.length == 0) {
                            return [2 /*return*/, { message: "invalid users no." }];
                        }
                        return [2 /*return*/, { usersProfile: usersProfile }];
                }
            });
        });
    };
    UserService.prototype.uploadProfilePic = function (usersID, image) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("users").update({ image: image }).where("id", "=", usersID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getPerformance = function (users_id, id) {
        return __awaiter(this, void 0, void 0, function () {
            var collected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("collection")
                            .select("id as collection_id")
                            .where("collection_owner_id", "=", users_id)
                            .andWhere("follow_id", "=", id)
                            .first()];
                    case 1:
                        collected = _a.sent();
                        return [2 /*return*/, collected];
                }
            });
        });
    };
    UserService.prototype.addUsersCollection = function (users_id, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("collection").insert({
                            collection_owner_id: users_id,
                            follow_id: id,
                        })];
                    case 1:
                        _a.sent();
                        // console.log(users_id)
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.removeUsersCollection = function (users_id, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("collection")
                            .delete()
                            .where("collection_owner_id", "=", users_id)
                            .andWhere("follow_id", "=", id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map