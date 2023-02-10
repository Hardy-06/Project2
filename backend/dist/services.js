"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPicService = exports.myShopService = exports.memberService = void 0;
var knex_1 = require("./knex");
var member_service_1 = require("./myshop/member.service");
var myshop_service_1 = require("./myshop/myshop.service");
var productPic_service_1 = require("./myshop/productPic.service");
exports.memberService = new member_service_1.MemberService(knex_1.knex);
exports.myShopService = new myshop_service_1.MyShopService(knex_1.knex);
exports.productPicService = new productPic_service_1.ProductPicService(knex_1.knex);
//# sourceMappingURL=services.js.map