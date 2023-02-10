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
exports.MybookingService = void 0;
var http_error_1 = require("../http.error");
var MybookingService = /** @class */ (function () {
    function MybookingService(knex) {
        this.knex = knex;
    }
    MybookingService.prototype.bookingTable = function () {
        return this.knex("booking");
    };
    MybookingService.prototype.getMyBookingConfirm = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var myBookingConfirm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("booking.id", "plan_name", "shop_plan.intro", "shop_plan.image", "name", "address", "schedule", "price", "booking_status", "apply_time", "confirm_time", "reject_time", "cancel_time", "finish_time")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "shop_plan.id")
                            .join("shop", "shop.id", "shop_id")
                            .where("users_id", "=", userID)
                            .andWhere("booking_status", "=", "confirm")];
                    case 1:
                        myBookingConfirm = _a.sent();
                        // .andWhere("finish_time", null)
                        // .andWhere("reject_time", null)
                        // .andWhere("cancel_time", null)
                        // .orderBy("booking.schedule", "desc")
                        // console.log(myBookingConfirm);
                        if (!myBookingConfirm)
                            throw new http_error_1.HttpError(404, "Confirmed Booking not found");
                        // console.log({ myBookingConfirm });
                        return [2 /*return*/, { myBookingConfirm: myBookingConfirm }];
                }
            });
        });
    };
    MybookingService.prototype.getMyBookingTbc = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var myBookingTbc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("booking.id", "plan_name", "shop_plan.intro", "shop_plan.image", "shop.name", "address", "schedule", "price", "booking_status", "apply_time", "confirm_time", "reject_time", "cancel_time", "finish_time")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "=", "shop_plan.id")
                            .join("shop", "shop.id", "=", "shop_id")
                            .where("users_id", "=", userID)
                            .andWhere("booking_status", "=", "apply")
                            .orderBy("booking.schedule", "desc")];
                    case 1:
                        myBookingTbc = _a.sent();
                        if (!myBookingTbc)
                            throw new http_error_1.HttpError(404, "Booking not found");
                        // console.log({ myBookingTbc });
                        return [2 /*return*/, { myBookingTbc: myBookingTbc }];
                }
            });
        });
    };
    MybookingService.prototype.getMyBookingHistory = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var myBookingHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("booking.id", "plan_name", "shop_plan.intro", "shop_plan.image", "shop.name", "address", "schedule", "price", "booking_status", "apply_time", "confirm_time", "reject_time", "cancel_time", "finish_time")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "=", "shop_plan.id")
                            .join("shop", "shop.id", "=", "shop_id")
                            .where("booking_status", "cancel")
                            .orWhere("booking_status", "finish")
                            .orWhere("booking_status", "reject")
                            .andWhere("users_id", userID)
                            // .andWhere("cancel_time", "!=", null)
                            .orderBy("booking.schedule", "desc")];
                    case 1:
                        myBookingHistory = _a.sent();
                        if (!myBookingHistory)
                            throw new http_error_1.HttpError(404, "Canceled booking not found");
                        return [2 /*return*/, { myBookingHistory: myBookingHistory }];
                }
            });
        });
    };
    MybookingService.prototype.getMyBookingCancel = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var myBookingCancel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("booking.id", "plan_name", "shop_plan.intro", "shop_plan.image", "shop.name", "address", "schedule", "price", "booking_status", "apply_time", "confirm_time", "reject_time", "cancel_time", "finish_time")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "=", "shop_plan.id")
                            .join("shop", "shop.id", "=", "shop_id")
                            .where("booking_status", "cancel")
                            .andWhere("users_id", userID)
                            // .andWhere("cancel_time", "!=", null)
                            .orderBy("booking.schedule", "desc")];
                    case 1:
                        myBookingCancel = _a.sent();
                        if (!myBookingCancel)
                            throw new http_error_1.HttpError(404, "Canceled booking not found");
                        return [2 /*return*/, { myBookingCancel: myBookingCancel }];
                }
            });
        });
    };
    MybookingService.prototype.getMyBookingReject = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var myBookingReject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("booking.id", "plan_name", "shop_plan.intro", "shop_plan.image", "shop.name", "address", "schedule", "price", "booking_status", "apply_time", "confirm_time", "reject_time", "cancel_time", "finish_time")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "=", "shop_plan.id")
                            .join("shop", "shop.id", "=", "shop_id")
                            .where("users_id", "=", userID)
                            .andWhere("booking_status", "=", "reject")
                            .whereNotNull("reject_time")
                            .orderBy("booking.schedule", "desc")];
                    case 1:
                        myBookingReject = _a.sent();
                        if (!myBookingReject)
                            throw new http_error_1.HttpError(404, "Rejected Booking not found");
                        return [2 /*return*/, { myBookingReject: myBookingReject }];
                }
            });
        });
    };
    MybookingService.prototype.getMyBookingFinish = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var myBookingFinish;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("booking.id", "plan_name", "shop_plan.intro", "shop_plan.image", "shop.name", "address", "schedule", "price", "booking_status", "apply_time", "confirm_time", "reject_time", "cancel_time", "finish_time")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "=", "shop_plan.id")
                            .join("shop", "shop.id", "=", "shop_id")
                            .where("users_id", "=", userID)
                            .andWhere("booking_status", "=", "finish")
                            .whereNotNull("finish_time")
                            .orderBy("booking.schedule", "desc")];
                    case 1:
                        myBookingFinish = _a.sent();
                        if (!myBookingFinish)
                            throw new http_error_1.HttpError(404, "Finished_booking not found");
                        return [2 /*return*/, { myBookingFinish: myBookingFinish }];
                }
            });
        });
    };
    MybookingService.prototype.getBookingDetail = function (booking_id, userID) {
        return __awaiter(this, void 0, void 0, function () {
            var bookingDetail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex()
                            .select("booking.id as booking_id", "shop.id as shop_id", "shop.name as shop_name", "shop.owner as shop_owner", "shop.shop_tel as shop_tel", "booking.users_id", "users.nick_name as users_nick_name", "users.phone_number as phone_number", "shop_plan.plan_name", "shop_plan.intro as shop_plan_intro", "shop_plan.types as types", "price", "booking_status", "schedule", "address", "cancel_period")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "shop_plan.id")
                            .join("shop", "shop_id", "shop.id")
                            .join("users", "users.id", "booking.users_id")
                            .where("booking.id", booking_id)
                            .first()];
                    case 1:
                        bookingDetail = _a.sent();
                        if (!bookingDetail)
                            throw new http_error_1.HttpError(404, "booking not found");
                        if (bookingDetail.users_id != userID &&
                            bookingDetail.shop_owner != userID) {
                            throw new http_error_1.HttpError(403, "Unauthorized");
                        }
                        // console.log(bookingDetail);
                        return [2 /*return*/, {
                                bookingDetail: bookingDetail,
                            }];
                }
            });
        });
    };
    MybookingService.prototype.updateBookingStatus = function (action, booking_id, users_id) {
        return __awaiter(this, void 0, void 0, function () {
            var bookingDetail, thisTable, notification, now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex()
                            .select("booking.id as booking_id", "shop.id as shop_id", "shop.name as shop_name", "shop.owner as shop_owner", "shop.shop_tel as shop_tel", "users_id", "plan_name", "shop_plan.intro as shop_plan_intro", "price", "booking_status", "schedule", "address", "cancel_period")
                            .from("booking")
                            .join("shop_plan", "shop_plan_id", "shop_plan.id")
                            .join("shop", "shop_id", "shop.id")
                            .where("booking.id", booking_id)
                            .first()];
                    case 1:
                        bookingDetail = _a.sent();
                        if (bookingDetail.users_id != users_id &&
                            bookingDetail.shop_owner != users_id) {
                            throw new http_error_1.HttpError(403, "Unauthorized");
                        }
                        thisTable = this.bookingTable().where({ id: booking_id });
                        notification = {
                            users_id: users_id,
                            link: "/booking/" + bookingDetail.booking_id,
                            content: "",
                        };
                        now = new Date();
                        if (action == "cancel") {
                            bookingDetail.cancel_before = new Date(Number(bookingDetail.schedule) - bookingDetail.cancel_period);
                            if (bookingDetail.cancel_before < now &&
                                bookingDetail.shop_owner != users_id) {
                                throw new http_error_1.HttpError(400, "Unable to cancel booking");
                            }
                            thisTable = thisTable.update({
                                booking_status: "cancel",
                                cancel_time: now,
                            });
                            if (bookingDetail.shop_owner == users_id) {
                                notification.content = "Your booking has been canceled by ".concat(bookingDetail.shop_name);
                            }
                            else {
                                notification.users_id = bookingDetail.shop_owner;
                                notification.content = "Booking: ".concat(new Date(bookingDetail.schedule).toLocaleString(), " has been canceled by User");
                            }
                        }
                        if (action == "confirm") {
                            if (bookingDetail.booking_status != "apply" ||
                                bookingDetail.shop_owner != users_id) {
                                throw new http_error_1.HttpError(403, "Unauthorized / Booking status is not Applying, can't reconfirm booking");
                            }
                            thisTable = thisTable.update({
                                booking_status: "confirm",
                                confirm_time: now,
                            });
                            notification.content = "Your Booking: ".concat(new Date(bookingDetail.schedule).toLocaleString(), " has been confirmed by ").concat(bookingDetail.shop_name);
                        }
                        if (action == "reject") {
                            if (bookingDetail.booking_status != "apply" ||
                                bookingDetail.shop_owner != users_id) {
                                throw new http_error_1.HttpError(403, "Unauthorized / Booking status is not Applying, can't reconfirm booking");
                            }
                            thisTable = thisTable.update({
                                booking_status: "reject",
                                reject_time: now,
                            });
                            notification.content = "Your Booking: ".concat(new Date(bookingDetail.schedule).toLocaleString(), " has been rejected by ").concat(bookingDetail.shop_name);
                        }
                        if (action == "finish") {
                            if (bookingDetail.booking_status != "confirm" ||
                                bookingDetail.shop_owner != users_id) {
                                throw new http_error_1.HttpError(403, "Unauthorized / Booking status is not confirmed schedule, can't update booking");
                            }
                            thisTable = thisTable.update({
                                booking_status: "finish",
                                reject_time: now,
                            });
                            notification.content = "Your Booking: ".concat(new Date(bookingDetail.schedule).toLocaleString(), " has been finished by ").concat(bookingDetail.shop_name);
                        }
                        return [4 /*yield*/, thisTable];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.knex("notification").insert(notification)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "update successful" }];
                }
            });
        });
    };
    MybookingService.prototype.newBooking = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var message, data, notification, validPackage, shopOwner, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            shop_plan_id: filter.plan_id,
                            users_id: filter.booker,
                            schedule: filter.schedule,
                            apply_time: new Date(),
                            booking_status: "apply",
                        };
                        notification = {
                            link: "/booking/",
                            content: new Date(filter.schedule).toLocaleString(),
                        };
                        if (!filter.package_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.knex.raw(
                            /*sql */ "\n        select users_package.id as package_id,\n            users_package.due_time,\n            shop_plan.id as plan_id,\n            shop_plan.package_qty,\n            plan_name,\n            shop.name,\n            shop.id,\n            due_period,\n            shop.address,\n            shop_plan.intro,\n            shop_plan.image,\n            shop.owner,\n            price,\n            buy_time,\n            (shop_plan.package_qty - count(booking.id)) as remain\n        from users_package\n    inner join shop_plan on shop_plan.id = users_package.shop_plan_id\n    join  shop on shop_id = shop.id\n    left join booking on booking.package_id = users_package.id\n    where users_package.users_id = 29 and users_package.id = 13\n    and booking.reject_time is null\n    and booking.cancel_time is null\n    and users_package.due_time > CURRENT_TIMESTAMP\n\ngroup by users_package.id,shop.id,\n        shop_plan.id\nhaving (shop_plan.package_qty - count(booking.id)) > 0\n    ", [filter.booker, filter.package_id])];
                    case 1:
                        validPackage = _a.sent();
                        if (!validPackage) {
                            throw new http_error_1.HttpError(403, "Package remaining not enough for booking");
                        }
                        //   let package_id= filter.package_id
                        data["package_id"] = filter.package_id;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.knex("shop_plan")
                            .select("owner", "name")
                            .where("shop_plan.id", "=", filter.plan_id)
                            .rightJoin("shop", "shop.id", "shop_plan.shop_id")
                            .first()];
                    case 3:
                        shopOwner = _a.sent();
                        if (filter.booker == filter.users_id) {
                            notification["users_id"] = shopOwner.owner;
                            if (shopOwner.owner != filter.users_id) {
                                notification["content"] =
                                    "你的顧客已提交預約" + notification.content + "請進行確認";
                                message = "你的預約已提交，正待店舖確認，你亦可到'我的預約'查看狀態";
                            }
                        }
                        if (shopOwner.owner == filter.users_id) {
                            data["booking_status"] = "confirm";
                            data["confirm_time"] = data.apply_time;
                            notification["users_id"] = filter.booker;
                            notification["content"] = "".concat(shopOwner.name, " \u5DF2\u70BA\u4F60\u9810\u7D04\u884C\u7A0B\uFF1A ").concat(notification.content);
                            message = "成功為顧客安排行程";
                        }
                        return [4 /*yield*/, this.bookingTable().insert(data).returning("id")];
                    case 4:
                        id = _a.sent();
                        if (id) {
                            notification["link"] = notification.link + id[0].id;
                        }
                        return [4 /*yield*/, this.knex("notification").insert(notification)];
                    case 5:
                        _a.sent();
                        // let id = "aaa";
                        return [2 /*return*/, { message: message }];
                }
            });
        });
    };
    return MybookingService;
}());
exports.MybookingService = MybookingService;
//# sourceMappingURL=mybooking.service.js.map