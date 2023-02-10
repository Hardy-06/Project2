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
exports.MyShopController = void 0;
var jwt_1 = require("../jwt");
var cast_ts_1 = require("cast.ts");
var http_error_1 = require("../http.error");
var formidable_1 = require("../utils/formidable");
var MyShopController = /** @class */ (function () {
    function MyShopController(myShopService) {
        var _this = this;
        this.myShopService = myShopService;
        this.getshopID = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userID, shopID, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userID = (0, jwt_1.getJWTPayload)(req).id;
                        if (!userID) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no userID received from myShopProductPic controller",
                                })];
                        }
                        return [4 /*yield*/, this.myShopService.getShopID(userID)];
                    case 1:
                        shopID = _a.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", result: shopID })];
                    case 2:
                        error_1 = _a.sent();
                        // console.log(error);
                        return [2 /*return*/, res.status(400).json({ message: error_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getshopinfo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.query.id;
                        // console.log("data from controller456", id);
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no shopID received from myshopcontroller",
                                })];
                        }
                        return [4 /*yield*/, this.myShopService.getshopinfo(+id)];
                    case 1:
                        rows = _a.sent();
                        // console.log("rows to controller", rows);
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", result: rows })];
                    case 2:
                        error_2 = _a.sent();
                        // console.log(error);
                        return [2 /*return*/, res.status(400).json({ message: error_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.checkApplyShop = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, user_id, identity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        user_id = jwt.id;
                        identity = jwt.identity;
                        if (identity == "shop_owner") {
                            throw new http_error_1.HttpError(403, "You have already applying on created shop / own a shop.");
                        }
                        return [4 /*yield*/, this.myShopService.checkApplyShop(user_id)];
                    case 1:
                        _a.sent();
                        // console.log(result);
                        return [2 /*return*/, res.json({})];
                }
            });
        }); };
        this.updateShopStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, _a, status, id, message, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(req.headers);
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        if (jwt.identity != "admin") {
                            throw new http_error_1.HttpError(400, "Unauthorized");
                        }
                        console.log("body", req.body);
                        _a = req.body, status = _a.status, id = _a.id;
                        console.log(status, id);
                        if (!id) {
                            throw new http_error_1.HttpError(403, "Invalid shop id");
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.myShopService.updateShopStatus(status, id)];
                    case 2:
                        message = _b.sent();
                        res.status(200).json(message);
                        return [2 /*return*/];
                    case 3:
                        error_3 = _b.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.status(400).json({ message: String(error_3) })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createShop = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                formidable_1.shopImageForm.parse(req, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                    var jwt, user, body, error_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                jwt = (0, jwt_1.getJWTPayload)(req);
                                user = jwt.id;
                                if (!user) {
                                    throw new http_error_1.HttpError(400, "invalid users id");
                                }
                                // let owner = 9;
                                return [4 /*yield*/, this.myShopService.checkApplyShop(user)];
                            case 1:
                                // let owner = 9;
                                _a.sent();
                                body = (0, cast_ts_1.object)({
                                    name: (0, cast_ts_1.string)({}),
                                    area: (0, cast_ts_1.string)({}),
                                    address: (0, cast_ts_1.string)({}),
                                    open_time: (0, cast_ts_1.string)({}),
                                    close_time: (0, cast_ts_1.string)({}),
                                    intro: (0, cast_ts_1.string)({}),
                                    shop_tel: (0, cast_ts_1.string)({}),
                                }).parse(fields);
                                // let owner: number = Number(req.session["user_id"]);
                                if (!fields.name ||
                                    !fields.area ||
                                    !fields.address ||
                                    !fields.open_time ||
                                    !fields.close_time ||
                                    !fields.intro ||
                                    !fields.shop_tel) {
                                    return [2 /*return*/, res.json({
                                            status: false,
                                            message: "Missing form information",
                                        })];
                                }
                                if (body.shop_tel.length != 8) {
                                    return [2 /*return*/, res.json({
                                            status: false,
                                            message: "Telephone number must be 8 characters",
                                        })];
                                }
                                // console.log(shopPreCrop);
                                // console.log(nameOfFile);
                                // console.log(files);
                                this.myShopService.createShop({
                                    owner: user,
                                    name: fields.name + "",
                                    image: files.image.newFilename + "",
                                    area: fields.area + "",
                                    address: fields.address + "",
                                    open_time: fields.open_time + "",
                                    close_time: fields.close_time + "",
                                    intro: fields.intro + "",
                                    shop_tel: fields.shop_tel + "",
                                });
                                return [2 /*return*/, res.status(200).json({})];
                            case 2:
                                error_4 = _a.sent();
                                // console.log(error);
                                return [2 /*return*/, res.status(503).json(error_4)];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
    }
    return MyShopController;
}());
exports.MyShopController = MyShopController;
//# sourceMappingURL=myshop.controller.js.map