"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserController = void 0;
var http_controller_1 = require("../http.controller");
var cast_ts_1 = require("cast.ts");
var http_error_1 = require("../http.error");
var jwt_1 = require("../jwt");
var formidable_1 = require("../utils/formidable");
var usernamePasswordParserL = (0, cast_ts_1.object)({
    username: (0, cast_ts_1.string)({ nonEmpty: true, minLength: 3, maxLength: 32 }),
    password: (0, cast_ts_1.string)({ nonEmpty: true, minLength: 6 }),
});
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController(userService) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.uploadProfilePic = function (req) {
            var user = (0, jwt_1.getJWTPayload)(req);
            // console.log('user:', user)
            var body = (0, cast_ts_1.object)({
                image: (0, cast_ts_1.object)({
                    newFilename: (0, cast_ts_1.string)({ nonEmpty: true }),
                }),
            }).parse(req.body);
            return _this.userService.uploadProfilePic(user.id, body.image.newFilename);
        };
        _this.login = function (req) {
            var user = (0, cast_ts_1.object)({
                body: usernamePasswordParserL,
            }).parse(req).body;
            return _this.userService.login(user);
            // console.log("sucess:", user);
        };
        _this.signup = function (req) {
            var user = req.body;
            if (!user.username)
                throw new http_error_1.HttpError(400, "Error:Missing username");
            if (typeof user.username !== "string" || user.username.length < 4) {
                throw new http_error_1.HttpError(400, "Error:invalid username, should have at least 4 characters");
            }
            if (!user.password)
                throw new http_error_1.HttpError(400, "Missing password");
            if (!user.email)
                throw new http_error_1.HttpError(400, "Error:Missing email");
            if (typeof user.password !== "string" || user.password.length < 8) {
                throw new http_error_1.HttpError(400, "Error:invalid password,should have at least 8 characters ");
            }
            // object({
            //     body: usernamePasswordParserS,
            // }).parse(req).body
            // console.log("user:", user);
            return _this.userService.signup(user);
        };
        _this.userinfo = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.userService.getProfile(jwt.id);
        };
        _this.usersProfile = function (req) {
            var users_id = req.params.id;
            if (!users_id) {
                throw new http_error_1.HttpError(400, "invalid users id");
            }
            return _this.userService.getUsersProfile(users_id);
        };
        _this.getPerformance = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, users_id, id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        users_id = jwt.id;
                        id = req.params.id;
                        return [4 /*yield*/, this.userService.getPerformance(users_id, id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        _this.addUsersCollection = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, users_id, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        users_id = jwt.id;
                        id = req.body.id;
                        // console.log(users_id, article_id);
                        if (!jwt.id) {
                            throw new http_error_1.HttpError(400, "Unauthorized");
                        }
                        return [4 /*yield*/, this.userService.addUsersCollection(users_id, id)];
                    case 1:
                        _a.sent();
                        // console.log(users_id)
                        return [2 /*return*/, { success: "Liked" }];
                }
            });
        }); };
        _this.removeUsersCollection = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, users_id, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        users_id = jwt.id;
                        id = req.body.id;
                        // console.log(users_id, article_id);
                        // console.log(users_id, article_id);
                        if (!jwt.id) {
                            throw new http_error_1.HttpError(400, "Unauthorized");
                        }
                        return [4 /*yield*/, this.userService.removeUsersCollection(users_id, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { success: "UnLiked" }];
                }
            });
        }); };
        _this.router.post("/login", _this.wrapMethod(_this.login));
        _this.router.post("/signup", _this.wrapMethod(_this.signup));
        _this.router.get("/userinfo", _this.wrapMethod(_this.userinfo));
        _this.router.get("/usersprofile/:id", _this.wrapMethod(_this.usersProfile));
        _this.router.get("/performanceUsers/:id", _this.wrapMethod(_this.getPerformance));
        _this.router.post("/collectusers", _this.wrapMethod(_this.addUsersCollection));
        _this.router.delete("/collectusers", _this.wrapMethod(_this.removeUsersCollection));
        _this.router.post("/profilePic", function (req, res, next) {
            formidable_1.userProfilePicForm.parse(req, function (err, fields, files) {
                if (err) {
                    next(err);
                    return;
                }
                req.body = __assign(__assign({}, fields), files);
                next();
            });
        }, _this.wrapMethod(_this.uploadProfilePic));
        return _this;
    }
    return UserController;
}(http_controller_1.HttpController));
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map