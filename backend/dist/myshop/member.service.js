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
exports.MemberService = void 0;
var MemberService = /** @class */ (function () {
    function MemberService(knex) {
        this.knex = knex;
    }
    MemberService.prototype.memberTable = function () {
        return this.knex("shop_members");
    };
    MemberService.prototype.shopTable = function () {
        return this.knex("shop");
    };
    MemberService.prototype.getMyshopService = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.shopTable()
                            .select("users.id as id", "users.nick_name as name", "users.phone_number as tel", "users.image as icon", "users.email as email")
                            .where("shop.owner", "=", input.userID)
                            .join("shop_members", "shop_members.shop_id", "shop.id")
                            .join("users", "users.id", "=", "shop_members.users_id");
                        // console.log("shopID", shopID.id)
                        if (input.searchState) {
                            query = query
                                .whereILike("users.nick_name", "%".concat(input.searchState, "%"))
                                .orWhereILike("users.email", "%".concat(input.searchState, "%"));
                            // .orWhereILike(
                            //   "number(users.phone_number as TEXT)",
                            //   `%${input.searchState}%`
                            // );
                        }
                        return [4 /*yield*/, query];
                    case 1:
                        rows = _a.sent();
                        // console.log("data from myShop service", query);
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    MemberService.prototype.getAddMemberData = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(input);
                        query = this.knex("users")
                            .select("users.id as id", "users.nick_name as name", "users.phone_number as tel", "users.image as icon", "users.email as email")
                            .whereNotIn("users.id", function () {
                            this.select("shop_members.users_id")
                                .from("shop_members")
                                .join("shop", "shop_members.shop_id", "shop.id")
                                .where("shop.owner", input.userID);
                        });
                        // console.log("shopID", shopID.id)
                        if (input.addMemberSearchState) {
                            query = query
                                .andWhereILike("users.nick_name", "%".concat(input.addMemberSearchState, "%"))
                                .orWhereILike("users.email", "%".concat(input.addMemberSearchState, "%"));
                            // .orWhereILike(
                            //   "number(users.phone_number as TEXT)",
                            //   `%${input.searchState}%`
                            // );
                        }
                        return [4 /*yield*/, query];
                    case 1:
                        rows = _a.sent();
                        // console.log("data from myShop service", query);
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    MemberService.prototype.addMember = function (shop_id, member_id) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(shop_id, member_id);
                        return [4 /*yield*/, this.knex("shop_members")
                                .insert({ shop_id: shop_id, users_id: member_id })
                                .returning("id")];
                    case 1:
                        id = _a.sent();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    MemberService.prototype.getMemberDetail = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var memberInfo, result, plans;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .where("id", "=", +input.member_id)
                            .select("users.id as id", "nick_name as name", "phone_number as tel", "image as icon", "email as email")
                            .from("users")
                            .first()];
                    case 1:
                        memberInfo = _a.sent();
                        return [4 /*yield*/, this.knex.raw(
                            /* sql */ "\nSELECT users_package.id,\n    (shop_plan.package_qty > count(booking.id))\n    and (users_package.due_time > CURRENT_TIMESTAMP) as is_valid,\n    shop_plan.package_qty,\n    (shop_plan.package_qty - count(booking.id)) as remain,\n    users_package.due_time,\n    shop_plan.due_period,\n    shop_plan.id as plan_id,\n    shop_plan.intro,\n    shop_plan.price,\n    shop_plan.image\nfrom users_package\n    inner join shop_plan on shop_plan.id = users_package.shop_plan_id\n    left join booking on booking.package_id = users_package.id\nwhere shop_plan.shop_id = ?\n    and users_package.users_id = ?\n    and booking.reject_time is null\n    and booking.cancel_time is null\ngroup by users_package.id,\n    shop_plan.id\n", [input.shop_id, input.member_id])];
                    case 2:
                        result = _a.sent();
                        plans = result.rows;
                        return [2 /*return*/, { memberInfo: memberInfo, plans: plans }];
                }
            });
        });
    };
    // Plan A: x10 (used 5)
    // Plan B: x5 (used 2)
    // Plan A: x10
    MemberService.prototype.getValidMemberPlanSql = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw(
                        /*sql */ "\n            select users_package.id as package_id,\n                users_package.due_time,\n                shop_plan.id as plan_id,\n                shop_plan.package_qty,\n                plan_name,\n                shop.name,\n                shop.id,\n                due_period,\n                shop.address,\n                shop_plan.intro,\n                shop_plan.price,\n                shop_plan.image,\n                (shop_plan.package_qty - count(booking.id)) as remain\n            from users_package\n        inner join shop_plan on shop_plan.id = users_package.shop_plan_id\n        join  shop on shop_id = shop.id\n        left join booking on booking.package_id = users_package.id\n    where users_package.users_id = ?\n        and booking.reject_time is null\n        and booking.cancel_time is null\n        and users_package.due_time > CURRENT_TIMESTAMP\n\n    group by users_package.id,shop.id,\n            shop_plan.id\n    having (shop_plan.package_qty - count(booking.id)) > 0\n        ", [user_id])];
                    case 1: return [2 /*return*/, (_a.sent()).rows];
                }
            });
        });
    };
    MemberService.prototype.getValidMemberPlan = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var validPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getValidMemberPlanSql(user_id)];
                    case 1:
                        validPackage = _a.sent();
                        // console.log("validPackage", validPackage);
                        // console.log("validPackage to service", validPackage.rows);
                        return [2 /*return*/, { validPackage: validPackage }];
                }
            });
        });
    };
    MemberService.prototype.getInvalidMemberPlan = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var validPackage, validPackageIdList, invalidPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getValidMemberPlanSql(user_id)];
                    case 1:
                        validPackage = _a.sent();
                        validPackageIdList = validPackage.map(function (v) { return v.package_id; });
                        return [4 /*yield*/, this.knex.raw(
                            /*sql */ "\n    select users_package.id as package_id,\n        users_package.due_time,\n        shop_plan.id as plan_id,\n        shop_plan.package_qty,\n        plan_name,\n        shop.name,\n        shop.id,\n        due_period,\n        shop.address,\n        shop_plan.price,\n        shop_plan.intro,\n        shop_plan.image,\n        (shop_plan.package_qty - count(booking.id)) as remain\n    from users_package\ninner join shop_plan on shop_plan.id = users_package.shop_plan_id\njoin  shop on shop_id = shop.id\nleft join booking on booking.package_id = users_package.id\nwhere users_package.id NOT IN(?)\ngroup by users_package.id,shop.id,\n    shop_plan.id\n", ["".concat(validPackageIdList.join(","))])];
                    case 2:
                        invalidPackage = _a.sent();
                        // console.log("invalidPackage", invalidPackage);
                        return [2 /*return*/, { invalidPackage: invalidPackage.rows }];
                }
            });
        });
    };
    MemberService.prototype.getShopPlanDetail = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var shopPlan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("shop_plan")
                            .select("shop.id as shop_id", "shop_plan.id as shop_plan_id", "shop_plan.image as shop_plan_image", "shop_plan.plan_name as shop_plan_name", "shop_plan.price as shop_plan_price", "shop_plan.intro as shop_plan_intro", "shop_plan.cancel_period as shop_plan_cancel_period", "shop_plan.types as shop_plan_types", "shop_plan.due_period as shop_plan_due_period", "shop_plan.package_qty as shop_plan_package_qty", "shop_plan.plan_status as shop_plan_status", this.knex.raw("TO_CHAR(shop_plan.buy_period,'YYYY-MM-DD')as shop_plan_buy_period"))
                            // .select("*")
                            .where("shop_plan.id", "=", id)
                            .join("shop", "shop.id", "=", "shop_plan.shop_id")
                            .first()];
                    case 1:
                        shopPlan = _a.sent();
                        // console.log("data of Shop Plan", shopPlan);
                        return [2 /*return*/, shopPlan];
                }
            });
        });
    };
    MemberService.prototype.postMemberSearch = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var search;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("users.id as id", "nick_name as name", "phone_number as tel", "image as icon", "email as email")
                            .whereILike("nick_name", "%".concat(data.data, "%"))
                            .from("users")];
                    case 1:
                        search = _a.sent();
                        // console.log(search);
                        return [2 /*return*/, search];
                }
            });
        });
    };
    return MemberService;
}());
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map