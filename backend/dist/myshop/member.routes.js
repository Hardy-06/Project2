"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRouter = void 0;
var express_1 = __importDefault(require("express"));
var services_1 = require("../services");
var member_controller_1 = require("./member.controller");
exports.memberRouter = express_1.default.Router();
var memberController = new member_controller_1.MemberController(services_1.memberService, services_1.myShopService);
exports.memberRouter.post("/memberslist", memberController.postMembersList);
exports.memberRouter.get("/members/:id", memberController.getMemberDetail);
exports.memberRouter.get("/validmemberPlan", memberController.getValidMemberPlan);
exports.memberRouter.get("/InvalidmemberPlan", memberController.getInvalidMemberPlan);
exports.memberRouter.get("/shopPlanDetail", memberController.getShopPlanDetail);
exports.memberRouter.post("/memberSearch", memberController.postMemberSearch);
exports.memberRouter.post("/addmemberslist", memberController.getAddMemberData);
exports.memberRouter.post("/addmember", memberController.addMember);
//# sourceMappingURL=member.routes.js.map