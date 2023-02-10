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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
var jwt_1 = require("../jwt");
var http_error_1 = require("../http.error");
var MemberController = /** @class */ (function () {
    function MemberController(memberService, myShopService) {
        var _this = this;
        this.memberService = memberService;
        this.myShopService = myShopService;
        this.postMembersList = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var input, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        input = req.body.input;
                        // console.log("data from controller", input);
                        if (!input) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no userID received from member controller",
                                })];
                        }
                        return [4 /*yield*/, this.memberService.getMyshopService(input)];
                    case 1:
                        rows = _a.sent();
                        // console.log("rows to controller", rows);
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", rows: rows })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: error_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAddMemberData = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var input, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        input = req.body.input;
                        // console.log("data from controller", input);
                        if (!input) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no userID received from member controller",
                                })];
                        }
                        return [4 /*yield*/, this.memberService.getAddMemberData(input)];
                    case 1:
                        rows = _a.sent();
                        // console.log("rows to controller", rows);
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", rows: rows })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: error_2 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addMember = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, shop_id, member_id, rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user_id = (0, jwt_1.getJWTPayload)(req).id;
                        return [4 /*yield*/, this.myShopService.getShopID(user_id)];
                    case 1:
                        shop_id = _a.sent();
                        member_id = req.body.member;
                        console.log(user_id, shop_id, member_id);
                        if (!member_id || !user_id)
                            throw new http_error_1.HttpError(400, "Invalid Action");
                        return [4 /*yield*/, this.memberService.addMember(shop_id, member_id)];
                    case 2:
                        rows = _a.sent();
                        // console.log("rows to controller", rows);
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", rows: rows })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: String(error_3) })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getMemberDetail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, shop_id, member_id, json, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user_id = (0, jwt_1.getJWTPayload)(req).id;
                        return [4 /*yield*/, this.myShopService.getShopID(user_id)];
                    case 1:
                        shop_id = _a.sent();
                        member_id = +req.params.id;
                        // console.log(member_id);
                        if (!member_id)
                            throw new http_error_1.HttpError(400, "invalid member_id");
                        return [4 /*yield*/, this.memberService.getMemberDetail({
                                shop_id: shop_id,
                                member_id: member_id,
                            })];
                    case 2:
                        json = _a.sent();
                        res.json(json);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getValidMemberPlan = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, rows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.query.id;
                        // console.log("data from controller123", { id });
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no userID received from member controller",
                                })];
                        }
                        return [4 /*yield*/, this.memberService.getValidMemberPlan(+id)];
                    case 1:
                        rows = _a.sent();
                        //   console.log("rows to controller", rows);
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", result: rows })];
                    case 2:
                        error_5 = _a.sent();
                        // console.log(error);
                        return [2 /*return*/, res.status(400).json({ message: error_5 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getInvalidMemberPlan = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, rows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.query.id;
                        // console.log("data from controller123", { id });
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no userID received from member controller",
                                })];
                        }
                        return [4 /*yield*/, this.memberService.getInvalidMemberPlan(+id)];
                    case 1:
                        rows = _a.sent();
                        // console.log("rows to controller Invalid", rows);
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", result: rows })];
                    case 2:
                        error_6 = _a.sent();
                        // console.log(error);
                        return [2 /*return*/, res.status(400).json({ message: error_6 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getShopPlanDetail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, rows, cancelPeriod, duePeriod, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.query.id;
                        // console.log("data from controller", { id });
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no userID received from member controller",
                                })];
                        }
                        return [4 /*yield*/, this.memberService.getShopPlanDetail(+id)];
                    case 1:
                        rows = _a.sent();
                        cancelPeriod = rows.shop_plan_cancel_period / (1000 * 60 * 60 * 24);
                        duePeriod = Math.floor(rows.shop_plan_due_period / (1000 * 60 * 60 * 24));
                        rows = __assign(__assign({}, rows), { cancelPeriod: cancelPeriod, duePeriod: duePeriod });
                        // console.log("rows to controller getShopPlan", rows);
                        return [2 /*return*/, res.status(200).json({
                                status: true,
                                message: "able to fetch",
                                result: rows,
                            })];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: error_7 })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postMemberSearch = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, rows, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!data) {
                            return [2 /*return*/, res.status(400).json({
                                    status: false,
                                    message: "no data to search",
                                })];
                        }
                        return [4 /*yield*/, this.memberService.postMemberSearch(data)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, res
                                .status(200)
                                .json({ status: true, message: "able to fetch", rows: rows })];
                    case 3:
                        error_8 = _a.sent();
                        // console.log(error);
                        return [2 /*return*/, res.status(400).json({ status: false, message: "get nothing" })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return MemberController;
}());
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map