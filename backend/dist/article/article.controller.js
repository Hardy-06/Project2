"use strict";
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
var formidable_1 = require("../utils/formidable");
var jwt_1 = require("../jwt");
var cast_ts_1 = require("cast.ts");
var ArticleController = /** @class */ (function () {
    function ArticleController(articleService) {
        var _this = this;
        this.articleService = articleService;
        this.uploadContextImg = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                //@ts-ignore
                formidable_1.contextImgForm.parse(req, function (err, fields, file) { return __awaiter(_this, void 0, void 0, function () {
                    var name_1, size, url;
                    return __generator(this, function (_a) {
                        try {
                            if (!file)
                                return [2 /*return*/];
                            size = void 0;
                            if (file.image && Array.isArray(file.image)) {
                                name_1 = String(file.image[0]);
                                size = Number(file.image[0].size);
                            }
                            else {
                                name_1 = file.image.newFilename;
                                size = Number(file.image.size);
                            }
                            url = "https://gelnailbackend.hardy06.me/uploads/context" + name_1;
                            return [2 /*return*/, res.json({ url: url, name: name_1, size: size })];
                        }
                        catch (err) {
                            res.json(err);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.getArticle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.articleService.getArticle()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.json(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getArticleList = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, articleList, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = (0, cast_ts_1.object)({
                            query: (0, cast_ts_1.object)({
                                articleType: (0, cast_ts_1.optional)((0, cast_ts_1.string)({ trim: true })),
                                offset: (0, cast_ts_1.optional)((0, cast_ts_1.int)({ min: 0 })),
                                searchText: (0, cast_ts_1.optional)((0, cast_ts_1.string)({ trim: true })),
                                users_id: (0, cast_ts_1.optional)((0, cast_ts_1.string)({ trim: true })),
                            }),
                        }).parse(req).query;
                        return [4 /*yield*/, this.articleService.getArticleList(query)];
                    case 1:
                        articleList = _a.sent();
                        return [2 /*return*/, res.status(200).json(articleList)];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.json(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUsersArticles = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users_id, usersArticles, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users_id = String(req.params.id);
                        if (!users_id) {
                            return [2 /*return*/, res.json({ error: "error", message: "no articles" })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.getUsersArticles(users_id)];
                    case 2:
                        usersArticles = _a.sent();
                        res.json(usersArticles);
                        return [2 /*return*/];
                    case 3:
                        err_3 = _a.sent();
                        res.json(err_3);
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getArticleDetail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.getArticleDetail(id)];
                    case 2:
                        result = _a.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        res.json(err_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addViews = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var article_id, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        article_id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.addViews(article_id)];
                    case 2:
                        _a.sent();
                        res.json({});
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.json({});
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.newArticle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, users_id, title, main_img, html_content, result, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, users_id = _a.users_id, title = _a.title, main_img = _a.main_img, html_content = _a.html_content;
                        return [4 /*yield*/, this.articleService.newArticle({
                                users_id: users_id,
                                title: title,
                                main_img: main_img,
                                html_content: html_content,
                            })];
                    case 1:
                        result = _b.sent();
                        res.json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _b.sent();
                        console.log(err_5);
                        res.json(err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPerformance = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, users_id, article_id, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        users_id = jwt.id;
                        article_id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.getPerformance(users_id, article_id)];
                    case 2:
                        result = _a.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        res.json(err_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addLikeArticle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, _a, users_id, id, article_id, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        _a = req.body, users_id = _a.users_id, id = _a.id;
                        article_id = id;
                        if (!jwt.id || jwt.id != users_id) {
                            return [2 /*return*/, res.status(401).json({ error: "Unauthorized" })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.addLikeArticle(users_id, article_id)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: "Liked" })];
                    case 3:
                        err_7 = _b.sent();
                        return [2 /*return*/, res.status(500).json(err_7)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.removeLikeArticle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, _a, users_id, id, article_id, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        _a = req.body, users_id = _a.users_id, id = _a.id;
                        article_id = id;
                        if (!jwt.id || jwt.id != users_id) {
                            return [2 /*return*/, res.status(401).json({ error: "Unauthorized" })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.removeLikeArticle(users_id, article_id)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: "unLiked" })];
                    case 3:
                        err_8 = _b.sent();
                        return [2 /*return*/, res.status(500).json(err_8)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addArticleCollection = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, _a, users_id, id, article_id, err_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        _a = req.body, users_id = _a.users_id, id = _a.id;
                        article_id = id;
                        if (!jwt.id || jwt.id != users_id) {
                            return [2 /*return*/, res.status(401).json({ error: "Unauthorized" })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.addArticleCollection(users_id, article_id)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: "Liked" })];
                    case 3:
                        err_9 = _b.sent();
                        return [2 /*return*/, res.status(500).json(err_9)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.removeArticleCollection = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var jwt, _a, users_id, id, article_id, err_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jwt = (0, jwt_1.getJWTPayload)(req);
                        _a = req.body, users_id = _a.users_id, id = _a.id;
                        article_id = id;
                        if (!jwt.id || jwt.id != users_id) {
                            return [2 /*return*/, res.status(401).json({ error: "Unauthorized" })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.articleService.removeArticleCollection(users_id, article_id)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: "unLiked" })];
                    case 3:
                        err_10 = _b.sent();
                        return [2 /*return*/, res.status(500).json(err_10)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return ArticleController;
}());
exports.default = ArticleController;
//# sourceMappingURL=article.controller.js.map