"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myshopplanRouter = void 0;
var express_1 = __importDefault(require("express"));
var knex_1 = require("../knex");
var services_1 = require("../services");
var uploads_1 = require("../uploads");
var myshopplan_controller_1 = require("./myshopplan.controller");
var myshopplan_service_1 = require("./myshopplan.service");
exports.myshopplanRouter = express_1.default.Router();
var myshopplanService = new myshopplan_service_1.MyShopPlanService(knex_1.knex);
var myshopplanController = new myshopplan_controller_1.MyShopPlanController(myshopplanService, uploads_1.form, services_1.myShopService);
exports.myshopplanRouter.get("/my-shop/plans", myshopplanController.getMyShopPlanList);
exports.myshopplanRouter.post("/shops/editshopplan", myshopplanController.postEditShopPlan);
exports.myshopplanRouter.post("/inactive", myshopplanController.patchEditShopPlan);
//# sourceMappingURL=myshopplan.routes.js.map