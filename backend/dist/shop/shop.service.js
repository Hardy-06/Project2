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
exports.ShopService = void 0;
var ShopService = /** @class */ (function () {
    function ShopService(knex) {
        this.knex = knex;
    }
    ShopService.prototype.getShopList = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var query, shopList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.knex("shop")
                            .select("shop.id as id", "shop.name as name", "shop.address as address", "shop.image as image")
                            .where("shop_status", "=", "active");
                        if (filter.area) {
                            query = query.andWhere("area", "=", filter.area);
                        }
                        if (filter.type) {
                            if (filter.type == "精品店舖") {
                                query = query
                                    .leftJoin("like", "shop_id", "=", "shop.id")
                                    .count("shop_id as like_qty")
                                    .groupBy("shop.id", "like.id")
                                    .orderBy("like_qty", "desc");
                            }
                            if (filter.type == "人氣店舖") {
                                query = query
                                    .leftJoin("shop_plan", "shop_id", "=", "shop.id")
                                    .leftJoin("booking", "shop_plan_id", "=", "shop_plan.id")
                                    .count("booking.finish_time as booking_qty")
                                    .groupBy("shop.id", "booking.id", "shop_plan.id")
                                    .orderBy("booking_qty", "desc");
                            }
                            if (filter.type == "最新店舖") {
                                query = query.orderBy("shop.created_at", "desc");
                            }
                        }
                        if (filter.offset) {
                            query = query.offset(filter.offset);
                        }
                        if (filter.searchText) {
                            query = query
                                .whereILike("name", "%" + filter.searchText + "%")
                                .orWhereILike("intro", "%" + filter.searchText + "%")
                                .orWhereILike("address", "%" + filter.searchText + "%");
                        }
                        return [4 /*yield*/, query.limit(10)];
                    case 1:
                        shopList = _a.sent();
                        // console.log(shopList);
                        return [2 /*return*/, { shopList: shopList }];
                }
            });
        });
    };
    ShopService.prototype.getShopBooking = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(input.dateValue);
                        return [4 /*yield*/, this.knex("booking")
                                .select("booking.id as booking_id", "shop.id as shop_id", "shop.name as shop_name", "shop.owner as shop_owner", "shop.shop_tel as shop_tel", "booking.users_id", "users.nick_name as users_nick_name", "users.phone_number as phone_number", "shop_plan.plan_name", "shop_plan.intro as shop_plan_intro", "shop_plan.types as types", "price", "booking_status", "schedule", "address", "cancel_period")
                                .join("shop_plan", "shop_plan.id", "booking.shop_plan_id")
                                .join("shop", "shop.id", "shop_plan.shop_id")
                                .join("users", "users.id", "booking.users_id")
                                .where("shop.owner", input.userID)
                                .whereBetween("schedule", [
                                input.dateValue,
                                input.dateValue + " 23:59:59",
                            ])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return ShopService;
}());
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service.js.map