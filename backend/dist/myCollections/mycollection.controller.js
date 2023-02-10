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
exports.MycollectionController = void 0;
var http_controller_1 = require("../http.controller");
var jwt_1 = require("../jwt");
var MycollectionController = /** @class */ (function (_super) {
    __extends(MycollectionController, _super);
    function MycollectionController(myCollectionService) {
        var _this = _super.call(this) || this;
        _this.myCollectionService = myCollectionService;
        _this.getMyBookMarkArticle = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myCollectionService.getMyBookMarkArticle(jwt.id);
        };
        _this.getMyBookMarkShop = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myCollectionService.getMyBookMarkShop(jwt.id);
        };
        _this.getMyBookMarkNail = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            return _this.myCollectionService.getMyBookMarkNail(jwt.id);
        };
        _this.router.get("/bookmarkArticle", _this.wrapMethod(_this.getMyBookMarkArticle));
        _this.router.get("/bookmarkShop", _this.wrapMethod(_this.getMyBookMarkShop));
        _this.router.get("/bookmarkNail", _this.wrapMethod(_this.getMyBookMarkNail));
        return _this;
    }
    return MycollectionController;
}(http_controller_1.HttpController));
exports.MycollectionController = MycollectionController;
//# sourceMappingURL=mycollection.controller.js.map