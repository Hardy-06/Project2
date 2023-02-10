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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MypackageController = void 0;
var http_controller_1 = require("../http.controller");
var jwt_1 = require("../jwt");
var http_error_1 = require("../http.error");
var MypackageController = /** @class */ (function (_super) {
    __extends(MypackageController, _super);
    function MypackageController(myPackageService) {
        var _this = _super.call(this) || this;
        _this.myPackageService = myPackageService;
        _this.getMyValidPackage = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myPackageService.getMyValidPackage(jwt.id);
        };
        _this.getMyInvalidPackage = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myPackageService.getMyInvalidPackage(jwt.id);
        };
        _this.getMyValidPackageDetail = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var userPackageID = req.params.id;
            if (!jwt.id) {
                throw new http_error_1.HttpError(400, "invalid booking id");
            }
            if (!userPackageID) {
                throw new http_error_1.HttpError(400, "invalid booking id");
            }
            return _this.myPackageService.getMyValidPackage(jwt.id);
        };
        _this.router.get("/myValidPackage", _this.wrapMethod(_this.getMyValidPackage));
        _this.router.get('/myInvalidPackage', _this.wrapMethod(_this.getMyInvalidPackage));
        _this.router.get('/myValidPackageDetail', _this.wrapMethod(_this.getMyValidPackageDetail));
        return _this;
    }
    return MypackageController;
}(http_controller_1.HttpController));
exports.MypackageController = MypackageController;
//# sourceMappingURL=mypackage.controller.js.map