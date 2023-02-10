"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoute = void 0;
var express_1 = __importDefault(require("express"));
var knex_1 = require("../knex");
var article_controller_1 = __importDefault(require("./article.controller"));
var article_service_1 = __importDefault(require("./article.service"));
// import {}
exports.articleRoute = express_1.default.Router();
var articleService = new article_service_1.default(knex_1.knex);
var articleController = new article_controller_1.default(articleService);
exports.articleRoute.post("/contextImg", articleController.uploadContextImg);
exports.articleRoute.post("/newArticle", articleController.newArticle);
exports.articleRoute.get("/articleList", articleController.getArticleList);
exports.articleRoute.get("/ArticleDetail/:id", articleController.getArticleDetail);
exports.articleRoute.get("/usersArticles/:id", articleController.getUsersArticles);
exports.articleRoute.get("/performanceArticle/:id", articleController.getPerformance);
exports.articleRoute.post("/likeArticle", articleController.addLikeArticle);
exports.articleRoute.delete("/likeArticle", articleController.removeLikeArticle);
exports.articleRoute.post("/collectArticle", articleController.addArticleCollection);
exports.articleRoute.delete("/collectArticle", articleController.removeArticleCollection);
exports.articleRoute.post("/addViews/:id", articleController.addViews);
//# sourceMappingURL=article.js.map