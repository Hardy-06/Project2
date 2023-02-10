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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
var excel_1 = require("../excel");
var hash_1 = require("../hash");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        function seedRow(table, data) {
            return __awaiter(this, void 0, void 0, function () {
                var hash_password, filter, row, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hash_password = data.hash_password, filter = __rest(data, ["hash_password"]);
                            return [4 /*yield*/, knex(table).select("id").where(filter).first()];
                        case 1:
                            row = _a.sent();
                            if (row) {
                                return [2 /*return*/, [{ id: row.id }]];
                            }
                            return [4 /*yield*/, knex.insert(data).into(table).returning("id")];
                        case 2:
                            id = (_a.sent())[0].id;
                            return [2 /*return*/, [{ id: id }]];
                    }
                });
            });
        }
        function generateRng() {
            var rand = Math.floor(Math.random() * 89) + 1;
            return rand;
        }
        var hash_password, userIDArr, shopIDArr, planIDArr, packageIDArr, i, userID, shopID, i, planID, i, packageID, i, i, i, a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Deletes ALL existing entries
                return [4 /*yield*/, knex("collection").del()];
                case 1:
                    // Deletes ALL existing entries
                    _a.sent();
                    return [4 /*yield*/, knex("like").del()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex("article").del()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex("message").del()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex("notification").del()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex("booking").del()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex("users_package").del()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex("shop_members").del()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, knex("shop_products_photo").del()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, knex("shop_intro_photos").del()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, knex("shop_plan").del()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, knex("shop").del()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, knex("users").del()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, (0, hash_1.hashPassword)("kkkkkkkk")];
                case 14:
                    hash_password = _a.sent();
                    userIDArr = [];
                    shopIDArr = [];
                    planIDArr = [];
                    packageIDArr = [];
                    i = 0;
                    _a.label = 15;
                case 15:
                    if (!(i < excel_1.users.length)) return [3 /*break*/, 19];
                    return [4 /*yield*/, seedRow("users", {
                            username: excel_1.users[i].username,
                            hash_password: hash_password,
                            nick_name: excel_1.users[i].nickname,
                            phone_number: 69993641,
                            email: "Doonygayclub@gmail.com",
                            identity: "shop_owner",
                            image: excel_1.users[i].image,
                        })];
                case 16:
                    userID = _a.sent();
                    console.log("userID", userID);
                    userIDArr.push(userID[0].id);
                    console.log("userIDARR", userIDArr);
                    return [4 /*yield*/, seedRow("shop", {
                            owner: userID[0].id,
                            name: excel_1.shops[i].shopname,
                            area: excel_1.shops[i].area,
                            address: excel_1.shops[i].address,
                            open_time: "13:30",
                            close_time: "23:00",
                            image: excel_1.shops[i].image,
                            intro: excel_1.shops[i].intro,
                            shop_status: "active",
                            shop_tel: 21800000,
                        })];
                case 17:
                    shopID = _a.sent();
                    shopIDArr.push(shopID[0].id);
                    _a.label = 18;
                case 18:
                    i++;
                    return [3 /*break*/, 15];
                case 19:
                    i = 0;
                    _a.label = 20;
                case 20:
                    if (!(i < excel_1.plans.length)) return [3 /*break*/, 23];
                    return [4 /*yield*/, seedRow("shop_plan", {
                            plan_name: excel_1.plans[i].plan_name,
                            intro: excel_1.plans[i].intro,
                            image: excel_1.plans[i].image,
                            shop_id: shopIDArr[0],
                            cancel_period: 172800000,
                            price: 5000,
                            types: "package",
                            buy_period: new Date(),
                            due_period: 31556952000,
                            package_qty: 10,
                            plan_status: "active",
                        })];
                case 21:
                    planID = _a.sent();
                    planIDArr.push(planID[0].id);
                    _a.label = 22;
                case 22:
                    i++;
                    return [3 /*break*/, 20];
                case 23:
                    i = 0;
                    _a.label = 24;
                case 24:
                    if (!(i < planIDArr.length)) return [3 /*break*/, 27];
                    console.log("users_id from users_package loop", userIDArr[0]);
                    return [4 /*yield*/, seedRow("users_package", {
                            users_id: userIDArr[0],
                            shop_plan_id: planIDArr[i],
                            buy_time: new Date("01-02-2023"),
                            due_time: new Date("01-02-2024"),
                        })];
                case 25:
                    packageID = _a.sent();
                    packageIDArr.push(packageID[0].id);
                    _a.label = 26;
                case 26:
                    i++;
                    return [3 /*break*/, 24];
                case 27:
                    i = 0;
                    _a.label = 28;
                case 28:
                    if (!(i < packageIDArr.length)) return [3 /*break*/, 31];
                    return [4 /*yield*/, seedRow("booking", {
                            shop_plan_id: planIDArr[0],
                            users_id: userIDArr[0],
                            package_id: packageIDArr[i],
                            schedule: "2023-03-05",
                            booking_status: "apply",
                            apply_time: "2023-02-09",
                        })];
                case 29:
                    _a.sent();
                    _a.label = 30;
                case 30:
                    i++;
                    return [3 /*break*/, 28];
                case 31:
                    i = 0;
                    _a.label = 32;
                case 32:
                    if (!(i < excel_1.article.length)) return [3 /*break*/, 35];
                    return [4 /*yield*/, seedRow("article", {
                            users_id: userIDArr[0],
                            title: excel_1.article[i].title,
                            main_img: excel_1.article[i].main_img,
                            html_content: excel_1.article[i].html_content,
                            views: excel_1.article[i].views,
                            article_status: excel_1.article[i].article_status,
                        })];
                case 33:
                    _a.sent();
                    _a.label = 34;
                case 34:
                    i++;
                    return [3 /*break*/, 32];
                case 35:
                    i = 0;
                    _a.label = 36;
                case 36:
                    if (!(i < excel_1.shops.length)) return [3 /*break*/, 41];
                    a = 0;
                    _a.label = 37;
                case 37:
                    if (!(a < 10)) return [3 /*break*/, 40];
                    return [4 /*yield*/, seedRow("shop_products_photo", {
                            images: excel_1.productnails[generateRng()].image,
                            shop_id: shopIDArr[0],
                        })];
                case 38:
                    _a.sent();
                    _a.label = 39;
                case 39:
                    a++;
                    return [3 /*break*/, 37];
                case 40:
                    i++;
                    return [3 /*break*/, 36];
                case 41: return [4 /*yield*/, seedRow("users", {
                        username: "admin",
                        hash_password: hash_password,
                        nick_name: "admin",
                        phone_number: 69993641,
                        email: "admin@gmail.com",
                        identity: "admin",
                        image: "https://picsum.photos/seed/admin-2/200/200",
                    })];
                case 42:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
//# sourceMappingURL=sampleData.js.map