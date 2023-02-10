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
exports.MyShopPlanService = void 0;
var http_error_1 = require("../http.error");
var MyShopPlanService = /** @class */ (function () {
    function MyShopPlanService(knex) {
        this.knex = knex;
    }
    MyShopPlanService.prototype.getMyShopPlanList = function (shop_id) {
        return __awaiter(this, void 0, void 0, function () {
            var planList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .from("shop_plan")
                            .where("shop_id", "=", shop_id)
                            .select("id as id", "plan_name as plan_name", "intro as intro", "image as image", "shop_id as shop_id", "price as price", "types as types", "buy_period as buy_period", "due_period as due_period", "package_qty as package_qty", "plan_status as plan_status")];
                    case 1:
                        planList = _a.sent();
                        // .where("plan_status", "=", "active");
                        return [2 /*return*/, { planList: planList }];
                }
            });
        });
    };
    MyShopPlanService.prototype.postEditShopPlan = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log("input to service", input);
                    return [4 /*yield*/, this.knex
                            .insert({
                            plan_name: input.plan_name,
                            intro: input.intro,
                            image: input.image,
                            shop_id: input.shop_id,
                            cancel_period: input.cancel_period * (1000 * 60 * 60 * 24),
                            price: input.price,
                            types: input.types,
                            buy_period: input.buy_period,
                            due_period: input.due_period * (1000 * 60 * 60 * 24 * input.period),
                            package_qty: input.package_qty,
                        })
                            .into("shop_plan")];
                    case 1:
                        // console.log("input to service", input);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyShopPlanService.prototype.checkShopOwner = function (user_id) {
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
                        if (row.id) {
                            throw new http_error_1.HttpError(403, "You have already applying on created shop / own a shop.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyShopPlanService.prototype.patchEditShopPlan = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex("shop_plan")
                            .update({
                            plan_status: "inactive",
                        })
                            .where("id", "=", id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyShopPlanService;
}());
exports.MyShopPlanService = MyShopPlanService;
// }
//# sourceMappingURL=myshopplan.service.js.map