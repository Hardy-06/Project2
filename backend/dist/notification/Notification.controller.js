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
exports.NotificationController = void 0;
var http_controller_1 = require("../http.controller");
var jwt_1 = require("../jwt");
var cast_ts_1 = require("cast.ts");
var NotificationController = /** @class */ (function (_super) {
    __extends(NotificationController, _super);
    function NotificationController(notificationService) {
        var _this = _super.call(this) || this;
        _this.notificationService = notificationService;
        _this.getNotification = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var users_id = jwt.id;
            var query = (0, cast_ts_1.object)({
                query: (0, cast_ts_1.object)({
                    offset: (0, cast_ts_1.optional)((0, cast_ts_1.int)({ min: 0 })),
                }),
            }).parse(req).query;
            var filter = __assign(__assign({}, query), { users_id: users_id });
            // console.log(filter);
            return _this.notificationService.getNotification(filter);
        };
        _this.router.get("/notification", _this.wrapMethod(_this.getNotification));
        return _this;
    }
    return NotificationController;
}(http_controller_1.HttpController));
exports.NotificationController = NotificationController;
//# sourceMappingURL=Notification.controller.js.map