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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MybookingController = void 0;
var http_controller_1 = require("../http.controller");
var jwt_1 = require("../jwt");
var http_error_1 = require("../http.error");
var MybookingController = /** @class */ (function (_super) {
    __extends(MybookingController, _super);
    function MybookingController(myBookingService) {
        var _this = _super.call(this) || this;
        _this.myBookingService = myBookingService;
        _this.getMyBookingConfirm = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myBookingService.getMyBookingConfirm(jwt.id);
        };
        _this.getMyBookingTbc = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myBookingService.getMyBookingTbc(jwt.id);
        };
        _this.getMyBookingReject = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myBookingService.getMyBookingReject(jwt.id);
        };
        _this.getMyBookingCancel = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myBookingService.getMyBookingCancel(jwt.id);
        };
        _this.getMyBookingFinish = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myBookingService.getMyBookingFinish(jwt.id);
        };
        _this.getMyBookingHistory = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myBookingService.getMyBookingHistory(jwt.id);
        };
        _this.bookingDetail = function (req) {
            var booking_id = req.params.id;
            var jwt = (0, jwt_1.getJWTPayload)(req);
            // console.log(booking_id);
            // console.log(jwt.id)
            if (!booking_id) {
                throw new http_error_1.HttpError(400, "invalid booking id");
            }
            return _this.myBookingService.getBookingDetail(booking_id, jwt.id);
        };
        _this.updateBookingStatus = function (req) {
            var _a = req.body, action = _a.action, booking_id = _a.booking_id;
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var users_id = jwt.id;
            if (!jwt) {
                throw new http_error_1.HttpError(403, "Pls login first");
            }
            return _this.myBookingService.updateBookingStatus(action, booking_id, users_id);
        };
        _this.newBooking = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var users_id = jwt.id;
            var _a = req.body, plan_id = _a.plan_id, package_id = _a.package_id, booker = _a.booker, schedule = _a.schedule;
            var query = { plan_id: plan_id, booker: booker, users_id: users_id, schedule: schedule };
            // console.log(query);
            if (package_id) {
                query = __assign(__assign({}, query), package_id);
            }
            if (!jwt) {
                throw new http_error_1.HttpError(403, "Pls login first");
            }
            return _this.myBookingService.newBooking(query);
        };
        _this.router.get("/mybookingConfirm", _this.wrapMethod(_this.getMyBookingConfirm));
        _this.router.get("/mybookingTbc", _this.wrapMethod(_this.getMyBookingTbc));
        _this.router.get("/mybookingReject", _this.wrapMethod(_this.getMyBookingReject));
        _this.router.get("/mybookingCancel", _this.wrapMethod(_this.getMyBookingCancel));
        _this.router.get("/mybookingFinish", _this.wrapMethod(_this.getMyBookingFinish));
        _this.router.get("/mybookingHistory", _this.wrapMethod(_this.getMyBookingHistory));
        _this.router.get("/bookingDetail/:id", _this.wrapMethod(_this.bookingDetail));
        _this.router.post("/updatebookingstatus", _this.wrapMethod(_this.updateBookingStatus));
        _this.router.post("/newbooking", _this.wrapMethod(_this.newBooking));
        return _this;
        // this.router.delete("/booking", this.wrapMethod, (this.cancelBooking));
        // this.router.post("/booking", this.wrapMethod, (this.book));
    }
    return MybookingController;
}(http_controller_1.HttpController));
exports.MybookingController = MybookingController;
//# sourceMappingURL=mybooking.controller.js.map