"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myShopRouter = void 0;
var express_1 = __importDefault(require("express"));
var services_1 = require("../services");
var myshop_controller_1 = require("./myshop.controller");
exports.myShopRouter = express_1.default.Router();
var myShopController = new myshop_controller_1.MyShopController(services_1.myShopService);
exports.myShopRouter.get("/myshopid", myShopController.getshopID);
exports.myShopRouter.get("/checkapplyshop", myShopController.checkApplyShop);
exports.myShopRouter.get("/shopinfo", myShopController.getshopinfo);
exports.myShopRouter.post("/createshop", myShopController.createShop);
exports.myShopRouter.post("/updateshopstatus", myShopController.updateShopStatus);
//# sourceMappingURL=myshop.routes.js.map