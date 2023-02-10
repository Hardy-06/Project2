"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPicRouter = void 0;
var express_1 = __importDefault(require("express"));
var services_1 = require("../services");
var uploads_1 = require("../uploads");
var productPic_controller_1 = require("./productPic.controller");
exports.productPicRouter = express_1.default.Router();
var productPicController = new productPic_controller_1.ProductPicController(services_1.productPicService, uploads_1.form, services_1.myShopService);
exports.productPicRouter.get("/shops/products", productPicController.getProductPic);
exports.productPicRouter.delete("/products/:id", productPicController.delProductPic);
exports.productPicRouter.post("/shops/products", productPicController.addPhoto);
exports.productPicRouter.use("/uploads", express_1.default.static(uploads_1.uploadDir));
//# sourceMappingURL=productPic.routes.js.map