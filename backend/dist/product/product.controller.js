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
exports.ProductController = void 0;
var http_controller_1 = require("../http.controller");
var cast_ts_1 = require("cast.ts");
var jwt_1 = require("../jwt");
var ProductController = /** @class */ (function (_super) {
    __extends(ProductController, _super);
    function ProductController(productService) {
        var _this = _super.call(this) || this;
        _this.productService = productService;
        _this.getProductsList = function (req) {
            // let productType = req.query.productType || "";
            // let offset = req.query.offset || "";
            // let searchText = req.query.searchText || "";
            var query = (0, cast_ts_1.object)({
                query: (0, cast_ts_1.object)({
                    productType: (0, cast_ts_1.optional)((0, cast_ts_1.string)({ trim: true })),
                    offset: (0, cast_ts_1.optional)((0, cast_ts_1.int)({ min: 0 })),
                    searchText: (0, cast_ts_1.optional)((0, cast_ts_1.string)({ trim: true })),
                    shop_id: (0, cast_ts_1.optional)((0, cast_ts_1.number)({ min: 1 })),
                    collecter_id: (0, cast_ts_1.optional)((0, cast_ts_1.number)({ min: 1 })),
                }),
            }).parse(req).query;
            // let jwt = getJWTPayload(req);
            return _this.productService.getProductsList(query);
        };
        _this.getPerformance = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var users_id = jwt.id;
            var products_id = req.params.id;
            if (!jwt.id || jwt.id != users_id) {
                throw new Error("Unauthorized");
            }
            return _this.productService.getPerformance(users_id, products_id);
        };
        _this.addLikeProduct = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var _a = req.body, users_id = _a.users_id, id = _a.id;
            var products_id = id;
            if (!jwt.id || jwt.id != users_id) {
                throw new Error("Unauthorized");
            }
            return _this.productService.addLikeProduct(users_id, products_id);
        };
        _this.removeLikeProduct = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var _a = req.body, users_id = _a.users_id, id = _a.id;
            var products_id = id;
            if (!jwt.id || jwt.id != users_id) {
                throw new Error("Unauthorized");
            }
            return _this.productService.removeLikeProduct(users_id, products_id);
        };
        _this.addProductCollection = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var _a = req.body, users_id = _a.users_id, id = _a.id;
            var products_id = id;
            // console.log(users_id, product_id);
            if (!jwt.id || jwt.id != users_id) {
                throw new Error("Unauthorized");
            }
            return _this.productService.addProductCollection(users_id, products_id);
        };
        _this.removeProductCollection = function (req) {
            var jwt = (0, jwt_1.getJWTPayload)(req);
            var _a = req.body, users_id = _a.users_id, id = _a.id;
            var products_id = id;
            // console.log(users_id, product_id);
            // console.log(users_id, product_id);
            if (!jwt.id || jwt.id != users_id) {
                throw new Error("Unauthorized");
            }
            return _this.productService.removeProductCollection(users_id, products_id);
        };
        _this.router.get("/productsList", _this.wrapMethod(_this.getProductsList));
        _this.router.get("/performanceProduct/:id", _this.wrapMethod(_this.getPerformance));
        _this.router.post("/likeProduct", _this.wrapMethod(_this.addLikeProduct));
        _this.router.delete("/likeProduct", _this.wrapMethod(_this.removeLikeProduct));
        _this.router.post("/collectProduct", _this.wrapMethod(_this.addProductCollection));
        _this.router.delete("/collectProduct", _this.wrapMethod(_this.removeProductCollection));
        return _this;
    }
    return ProductController;
}(http_controller_1.HttpController));
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map