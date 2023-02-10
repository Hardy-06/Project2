"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRouter = void 0;
var express_1 = __importDefault(require("express"));
var knex_1 = require("../knex");
var shop_controller_1 = require("./shop.controller");
var shop_service_1 = require("./shop.service");
exports.shopRouter = express_1.default.Router();
var shopService = new shop_service_1.ShopService(knex_1.knex);
var shopController = new shop_controller_1.ShopController(shopService);
exports.shopRouter.get("/shopList", shopController.getShopList);
exports.shopRouter.get("/shopbooking", shopController.getShopBooking);
//# sourceMappingURL=shop.routes.js.map