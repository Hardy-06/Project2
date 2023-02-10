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
exports.MycollectionService = void 0;
var http_error_1 = require("../http.error");
var MycollectionService = /** @class */ (function () {
    function MycollectionService(knex) {
        this.knex = knex;
    }
    MycollectionService.prototype.getMyBookMarkArticle = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var articles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("article.id", "title", "main_img", "views", "article.created_at", "nick_name")
                            .from("collection")
                            .join("article", "article.id", "=", "article_id")
                            .join("users", "users.id", "=", "article.users_id")
                            .where("collection_owner_id", "=", userID)
                            .orderBy("article.id", "desc")];
                    case 1:
                        articles = _a.sent();
                        if (!articles)
                            throw new http_error_1.HttpError(404, 'collection not found');
                        return [2 /*return*/, { articles: articles }];
                }
            });
        });
    };
    MycollectionService.prototype.getMyBookMarkShop = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var shops;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("shop.id", "name", "image", "intro")
                            .from("collection")
                            .join("shop", "shop.id", "=", "shop_id")
                            .where("collection_owner_id", "=", userID)
                            .orderBy("shop.id", "desc")];
                    case 1:
                        shops = _a.sent();
                        if (!shops)
                            throw new http_error_1.HttpError(404, 'collection not found');
                        return [2 /*return*/, { shops: shops }];
                }
            });
        });
    };
    MycollectionService.prototype.getMyBookMarkNail = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var nails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex
                            .select("shop_products_photo.id", "images")
                            .from("collection")
                            .join("shop_products_photo", "shop_products_photo.id", "=", "products_id")
                            .where("collection_owner_id", "=", userID)
                            .orderBy("shop_products_photo.id", "desc")];
                    case 1:
                        nails = _a.sent();
                        if (!nails)
                            throw new http_error_1.HttpError(404, 'collection not found');
                        return [2 /*return*/, { nails: nails }];
                }
            });
        });
    };
    return MycollectionService;
}());
exports.MycollectionService = MycollectionService;
//# sourceMappingURL=mycollection.service.js.map