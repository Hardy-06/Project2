"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyShopService = void 0;
var http_error_1 = require("../http.error");
var MyShopService = /** @class */ (function () {
    function MyShopService(knex) {
        this.knex = knex;
    }
    MyShopService.prototype.shopTable = function () {
        return this.knex("shop");
    };
    MyShopService.prototype.getShopID = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var shop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("id")
                            .from("shop")
                            .where("owner", "=", userID)
                            .first()];
                    case 1:
                        shop = _a.sent();
                        if (!shop)
                            throw new http_error_1.HttpError(403, "not a shop owner");
                        return [2 /*return*/, shop.id];
                }
            });
        });
    };
    MyShopService.prototype.updateShopStatus = function (status, shop_id) {
        return __awaiter(this, void 0, void 0, function () {
            var shop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(status, shop_id);
                        return [4 /*yield*/, this.knex("shop")
                                .update("shop_status", status)
                                .where("shop.id", shop_id)
                                .returning("shop.owner")];
                    case 1:
                        shop = _a.sent();
                        if (!(status == "active")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.knex("notification").insert({
                                users_id: shop[0].owner,
                                link: "/shop/" + shop_id,
                                content: "你的開店申請已批准",
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(status == "inactive")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.knex("notification").insert({
                                users_id: shop[0].owner,
                                link: "/shop/" + shop_id,
                                content: "你的開店申請已被拒絕",
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, { message: "success" }];
                }
            });
        });
    };
    MyShopService.prototype.createShop = function (shop) {
        return __awaiter(this, void 0, void 0, function () {
            var id, admins, notifications, _i, admins_1, admin, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.shopTable().insert(shop).returning("id")];
                    case 1:
                        id = _a.sent();
                        return [4 /*yield*/, this.knex("users")
                                .select("id")
                                .where("users.identity", "=", "admin")];
                    case 2:
                        admins = _a.sent();
                        notifications = [];
                        for (_i = 0, admins_1 = admins; _i < admins_1.length; _i++) {
                            admin = admins_1[_i];
                            notifications.push({
                                users_id: admin,
                                link: "/shop/" + id,
                                content: "\u65B0\u5E97\u92EA\u7533\u8ACB ".concat(shop.name),
                            });
                        }
                        return [4 /*yield*/, this.knex("notification").insert(notifications)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { id: id }];
                    case 4:
                        error_1 = _a.sent();
                        // console.log(error);
                        throw new Error(String(error_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MyShopService.prototype.checkApplyShop = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("id")
                            .from("shop")
                            .where({ owner: user_id })
                            .andWhere("shop_status", "!=", "inactive")
                            .first()];
                    case 1:
                        row = _a.sent();
                        if (row) {
                            throw new http_error_1.HttpError(403, "You have already applying shop / own a shop");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyShopService.prototype.checkShopOwner = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("id")
                            .from("shop")
                            .where({ id: input.shop_id, owner: input.user_id })
                            .first()];
                    case 1:
                        row = _a.sent();
                        if (!row) {
                            throw new http_error_1.HttpError(403, "not shop owner");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyShopService.prototype.getshopinfo = function (shop_id) {
        return __awaiter(this, void 0, void 0, function () {
            var shopInfo, shop_intro_photos, shop_plan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .from("shop")
                            .where("id", "=", shop_id)
                            .select("owner as owner", "name as name", "area as area", "address as address", "open_time as open_time", "close_time as close_time", "intro as intro", "image as image", "shop_status as shop_status", "shop_tel as shop_tel")
                            .first()];
                    case 1:
                        shopInfo = _a.sent();
                        return [4 /*yield*/, this.knex("shop_intro_photos").where("shop_id", shop_id)];
                    case 2:
                        shop_intro_photos = _a.sent();
                        if (!(shopInfo.shop_status == "active")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.knex("shop_plan")
                                .select("id", "plan_name", "intro", "price", "types")
                                .where("shop_id", shop_id)
                                .andWhere("plan_status", "active")];
                    case 3:
                        shop_plan = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (shop_intro_photos) {
                            shopInfo = __assign(__assign({}, shopInfo), { shop_intro_photos: __spreadArray([], shop_intro_photos, true) });
                        }
                        if (shop_plan) {
                            shopInfo = __assign(__assign({}, shopInfo), { shop_plan: __spreadArray([], shop_plan, true) });
                        }
                        return [2 /*return*/, shopInfo];
                }
            });
        });
    };
    return MyShopService;
}());
exports.MyShopService = MyShopService;
//# sourceMappingURL=myshop.service.js.map