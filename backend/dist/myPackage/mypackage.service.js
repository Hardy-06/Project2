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
exports.MypackageService = void 0;
var MypackageService = /** @class */ (function () {
    function MypackageService(knex) {
        this.knex = knex;
    }
    MypackageService.prototype.getMyValidPackage = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var validPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw(/*sql */ "\n            select users_package.id as package_id,\n                users_package.due_time,\n                shop_plan.id as plan_id,\n                shop_plan.package_qty,\n                plan_name,\n                shop.name,\n                shop.id,\n                due_period,\n                shop.address,\n                shop_plan.intro,\n                shop_plan.image,\n                price,\n                buy_time,\n                (shop_plan.package_qty - count(booking.id)) as remain\n            from users_package\n        inner join shop_plan on shop_plan.id = users_package.shop_plan_id\n        join  shop on shop_id = shop.id\n        left join booking on booking.package_id = users_package.id\n    where users_package.users_id = ?\n        and booking.reject_time is null\n        and booking.cancel_time is null\n        and users_package.due_time > CURRENT_TIMESTAMP\n\n    group by users_package.id,shop.id,\n            shop_plan.id\n    having (shop_plan.package_qty - count(booking.id)) > 0\n        ", [userID])];
                    case 1:
                        validPackage = _a.sent();
                        return [2 /*return*/, { validPackage: validPackage.rows }];
                }
            });
        });
    };
    MypackageService.prototype.getMyInvalidPackage = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var invalidPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.raw(/*sql */ "\n            select users_package.id as package_id,\n                users_package.due_time,\n                shop_plan.id as plan_id,\n                shop_plan.package_qty,\n                plan_name,\n                shop.name,\n                shop.id,\n                due_period,\n                shop.address,\n                shop_plan.intro,\n                shop_plan.image,\n                price,\n                buy_time,\n                (shop_plan.package_qty - count(booking.id)) as remain\n            from users_package\n        inner join shop_plan on shop_plan.id = users_package.shop_plan_id\n        join  shop on shop_id = shop.id\n        left join booking on booking.package_id = users_package.id\n    where users_package.users_id = ?\n        and booking.reject_time is null\n        and booking.cancel_time is null\n    group by users_package.id,shop.id,\n            shop_plan.id\n     having (shop_plan.package_qty - count(booking.id)) <= 0\n     or users_package.due_time < CURRENT_TIMESTAMP\n    ", [userID])];
                    case 1:
                        invalidPackage = _a.sent();
                        return [2 /*return*/, { invalidPackage: invalidPackage.rows }];
                }
            });
        });
    };
    return MypackageService;
}());
exports.MypackageService = MypackageService;
//         let result1 = await this.knex.raw(/* sql */ `
//             with count_package as
//              (select package_id, count(package_id,) 
//              as used,package_qty from booking join users_package 
//              on booking.package_id=users_package.id join shop_plan 
//              on users_package.shop_plan_id=shop_plan.id
//              and reject_time is null
//              and cancel_time is null
//              and booking.users_id=62
//             group by package_id,package_qty) 
//              select package_id,package_qty,(package_qty-used) 
//              as remain,used from count_package
//             `)
//         let resutl2 = await this.knex.raw(/* sql */ `
//            select 
// users_package.id as package_id,
// package_qty,
// package_qty as remain,
// 0 as used
// from users_package
// join shop_plan on users_package.shop_plan_id = shop_plan.id
// where users_id = 62
// and users_package.id not in (
//     select package_id as id from booking
// ) 
//# sourceMappingURL=mypackage.service.js.map