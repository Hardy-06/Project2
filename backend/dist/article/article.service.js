"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_error_1 = require("../http.error");
var ArticleService = /** @class */ (function () {
    function ArticleService(knex) {
        this.knex = knex;
    }
    ArticleService.prototype.getArticle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.knex();
                return [2 /*return*/];
            });
        });
    };
    ArticleService.prototype.getUsersArticles = function (users_id) {
        return __awaiter(this, void 0, void 0, function () {
            var usersArticles, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex
                                .select("article.id", "title", "main_img", "views", "article_status", "created_at")
                                .from("article")
                                .where("users_id", users_id)
                                .andWhere("article_status", "active")];
                    case 1:
                        usersArticles = _a.sent();
                        if (!usersArticles)
                            throw new http_error_1.HttpError(404, "Articles not found");
                        return [2 /*return*/, { usersArticles: usersArticles }];
                    case 2:
                        error_1 = _a.sent();
                        // console.log(error);
                        throw new http_error_1.HttpError(503, "error");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.getArticleList = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var query, articleList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.knex("article")
                            .select("article.id as id", "title", "main_img")
                            .leftJoin("like", "article_id", "=", "article.id")
                            .count("article_id as like_qty")
                            .groupBy("article.id", "like.id")
                            .where("article_status", "=", "active");
                        if (filter.users_id) {
                            query = query
                                .andWhere("article.users_id", "=", filter.users_id)
                                .orderBy("article.created_at", "desc");
                        }
                        // console.log(filter.users_id);
                        // console.log(filter)
                        if (filter.articleType) {
                            if (filter.articleType == "精品文章") {
                                query = query.orderBy("like_qty", "desc");
                            }
                            if (filter.articleType == "人氣文章") {
                                query = query.orderBy("views", "desc");
                            }
                            if (filter.articleType == "最新文章") {
                                query = query.orderBy("article.created_at", "desc");
                            }
                        }
                        if (filter.offset) {
                            query = query.offset(filter.offset);
                        }
                        if (filter.searchText) {
                            // console.log(filter)
                            query = query
                                .whereILike("title", "%" + filter.searchText + "%")
                                .orWhereILike("html_content", "%" + filter.searchText + "%");
                        }
                        return [4 /*yield*/, query.limit(16)];
                    case 1:
                        articleList = _a.sent();
                        // console.log(articleList);
                        return [2 /*return*/, { articleList: articleList }];
                }
            });
        });
    };
    ArticleService.prototype.getArticleDetail = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var articleAndUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex("article")
                                .select("users.id as author_id", "users.nick_name as author", "title", "main_img", "html_content", "views", "article.created_at")
                                .leftJoin("users", "users.id", "=", "article.users_id")
                                .where("article.id", "=", id)
                                .andWhere("article_status", "=", "active")
                                .leftJoin("like", "article_id", "=", "article.id")
                                .count("like.id as like_qty")
                                .groupBy("users.id", "article.title", "article.main_img", "article.html_content", "article.views", "article.created_at")
                                .first()];
                    case 1:
                        articleAndUser = _a.sent();
                        return [2 /*return*/, articleAndUser];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.addViews = function (article_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex("article")
                                .increment("views", 1)
                                .where("id", "=", article_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.newArticle = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var users_id, title, main_img, html_content, article_id, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users_id = data.users_id, title = data.title, main_img = data.main_img, html_content = data.html_content;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.knex("article")
                                .insert({
                                users_id: users_id,
                                title: title,
                                main_img: main_img,
                                html_content: html_content,
                                views: 0,
                            })
                                .returning("id")];
                    case 2:
                        article_id = _a.sent();
                        return [2 /*return*/, article_id[0]];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.getPerformance = function (users_id, article_id) {
        return __awaiter(this, void 0, void 0, function () {
            var liked, collected, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.knex("like")
                                .select("id as like_id")
                                .where("users_id", "=", users_id)
                                .andWhere("article_id", "=", article_id)
                                .first()];
                    case 1:
                        liked = _a.sent();
                        return [4 /*yield*/, this.knex("collection")
                                .select("id as collection_id")
                                .where("collection_owner_id", "=", users_id)
                                .andWhere("article_id", "=", article_id)
                                .first()];
                    case 2:
                        collected = _a.sent();
                        result = __assign(__assign({}, liked), collected);
                        return [2 /*return*/, result];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.addLikeArticle = function (users_id, article_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex("like").insert({ users_id: users_id, article_id: article_id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, error_6];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.removeLikeArticle = function (users_id, article_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex("like")
                                .delete()
                                .where("users_id", "=", users_id)
                                .andWhere("article_id", "=", article_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_7 = _a.sent();
                        // console.log(error);
                        return [2 /*return*/, error_7];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.addArticleCollection = function (users_id, article_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex("collection").insert({
                                collection_owner_id: users_id,
                                article_id: article_id,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, error_8];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArticleService.prototype.removeArticleCollection = function (users_id, article_id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex("collection")
                                .delete()
                                .where("collection_owner_id", "=", users_id)
                                .andWhere("article_id", "=", article_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_9 = _a.sent();
                        // console.log(error);
                        return [2 /*return*/, error_9];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ArticleService;
}());
exports.default = ArticleService;
//# sourceMappingURL=article.service.js.map