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
exports.MyShopPlanController = void 0;
var jwt_1 = require("../jwt");
var http_error_1 = require("../http.error");
var uploads_1 = require("../uploads");
var MyShopPlanController = /** @class */ (function () {
    function MyShopPlanController(myShopPlanService, form, myShopService) {
        var _this = this;
        this.myShopPlanService = myShopPlanService;
        this.form = form;
        this.myShopService = myShopService;
        this.getMyShopPlanList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, shop_id, json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user_id = (0, jwt_1.getJWTPayload)(req).id;
                        return [4 /*yield*/, this.myShopService.getShopID(user_id)];
                    case 1:
                        shop_id = _a.sent();
                        return [4 /*yield*/, this.myShopPlanService.getMyShopPlanList(shop_id)];
                    case 2:
                        json = _a.sent();
                        res.status(200).json(json);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postEditShopPlan = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.form.parse(req, function (error, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                    var image, user_id, shop_id, plan_name, intro, cancel_period, price, types, due_period, buy_period, package_qty, period, error_2;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 4, , 5]);
                                if (error)
                                    throw error;
                                image = (_a = (0, uploads_1.toArray)(files.image)[0]) === null || _a === void 0 ? void 0 : _a.newFilename;
                                if (!image)
                                    throw new http_error_1.HttpError(400, "missing image");
                                user_id = (0, jwt_1.getJWTPayload)(req).id;
                                return [4 /*yield*/, this.myShopService.getShopID(user_id)];
                            case 1:
                                shop_id = _b.sent();
                                plan_name = fields.plan_name;
                                intro = fields.intro;
                                cancel_period = +fields.cancel_period;
                                price = +fields.price;
                                types = fields.types + "";
                                due_period = +fields.due_period;
                                buy_period = fields.buy_period + "";
                                package_qty = +fields.package_qty;
                                period = +fields.period;
                                if (!package_qty) {
                                    package_qty = 0;
                                }
                                // console.log("fields:", fields);
                                // console.log("files:", files);
                                return [4 /*yield*/, this.myShopService.checkShopOwner({ user_id: user_id, shop_id: shop_id })];
                            case 2:
                                // console.log("fields:", fields);
                                // console.log("files:", files);
                                _b.sent();
                                return [4 /*yield*/, this.myShopPlanService.postEditShopPlan({
                                        plan_name: plan_name,
                                        intro: intro,
                                        image: image,
                                        shop_id: shop_id,
                                        cancel_period: cancel_period,
                                        price: price,
                                        types: types,
                                        due_period: due_period,
                                        buy_period: buy_period,
                                        package_qty: package_qty,
                                        period: period,
                                    })];
                            case 3:
                                _b.sent();
                                res.status(200).json({ message: "success" });
                                return [3 /*break*/, 5];
                            case 4:
                                error_2 = _b.sent();
                                next(error_2);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.patchEditShopPlan = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.body.id;
                        // console.log("id:ookokokokokokokoko", id);
                        if (!id)
                            throw new http_error_1.HttpError(400, "invalid product id");
                        return [4 /*yield*/, this.myShopPlanService.patchEditShopPlan(id)];
                    case 1:
                        _a.sent();
                        res.status(200).json({ message: "success" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return MyShopPlanController;
}());
exports.MyShopPlanController = MyShopPlanController;
//# sourceMappingURL=myshopplan.controller.js.map