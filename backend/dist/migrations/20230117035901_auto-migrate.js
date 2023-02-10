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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.hasTable("users")];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, knex.schema.createTable("users", function (table) {
                            table.increments("id");
                            table.string("username", 60).notNullable().unique();
                            table.string("hash_password", 60).notNullable();
                            table.string("nick_name", 50).notNullable();
                            table.integer("phone_number");
                            table.string("email", 64).notNullable();
                            table
                                .enum("identity", ["admin", "shop_owner", "member"])
                                .defaultTo("member")
                                .notNullable();
                            table
                                .enum("users_status", ["active", "inactive"])
                                .defaultTo("active")
                                .notNullable();
                            table.string("image", 1000).nullable();
                            table.timestamps(false, true);
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, knex.schema.hasTable("article")];
                case 4:
                    if (!!(_a.sent())) return [3 /*break*/, 6];
                    return [4 /*yield*/, knex.schema.createTable("article", function (table) {
                            table.increments("id");
                            table.integer("users_id").unsigned().notNullable().references("users.id");
                            table.string("title", 255).notNullable();
                            table.string("main_img", 1000).notNullable();
                            table.text("html_content").notNullable();
                            table.integer("views");
                            table
                                .enum("article_status", ["active", "inactive"])
                                .defaultTo("active")
                                .notNullable();
                            table.timestamps(false, true);
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, knex.schema.hasTable("shop")];
                case 7:
                    if (!!(_a.sent())) return [3 /*break*/, 9];
                    return [4 /*yield*/, knex.schema.createTable("shop", function (table) {
                            table.increments("id");
                            table.integer("owner").unsigned().notNullable().references("users.id");
                            table.string("name", 255).notNullable();
                            table.string("area", 20).notNullable();
                            table.string("address", 255).notNullable();
                            table.time("open_time").notNullable();
                            table.time("close_time").notNullable();
                            table.text("intro").notNullable();
                            table.string("image", 1000).notNullable();
                            table
                                .enum("shop_status", ["applying", "active", "inactive"])
                                .defaultTo("applying")
                                .notNullable();
                            table.integer("shop_tel").notNullable();
                            table.timestamps(false, true);
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, knex.schema.hasTable("message")];
                case 10:
                    if (!!(_a.sent())) return [3 /*break*/, 12];
                    return [4 /*yield*/, knex.schema.createTable("message", function (table) {
                            table.increments("id");
                            table.integer("sender").unsigned().references("users.id");
                            table.integer("receiver").unsigned().references("users.id");
                            table.integer("sender_shop").unsigned().references("shop.id");
                            table.integer("receiver_shop").unsigned().references("shop.id");
                            table.text("content").notNullable();
                            table.timestamps(false, true);
                        })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [4 /*yield*/, knex.schema.hasTable("shop_products_photo")];
                case 13:
                    if (!!(_a.sent())) return [3 /*break*/, 15];
                    return [4 /*yield*/, knex.schema.createTable("shop_products_photo", function (table) {
                            table.increments("id");
                            table.string("images", 1000).notNullable();
                            table.text("intro");
                            table.integer("shop_id").unsigned().notNullable().references("shop.id");
                            table.timestamps(false, true);
                        })];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: return [4 /*yield*/, knex.schema.hasTable("like")];
                case 16:
                    if (!!(_a.sent())) return [3 /*break*/, 18];
                    return [4 /*yield*/, knex.schema.createTable("like", function (table) {
                            table.increments("id");
                            table.integer("users_id").unsigned().references("users.id");
                            table.integer("shop_id").unsigned().references("shop.id");
                            table.integer("article_id").unsigned().references("article.id");
                            table
                                .integer("products_id")
                                .unsigned()
                                .references("shop_products_photo.id");
                            table.timestamps(false, true);
                        })];
                case 17:
                    _a.sent();
                    _a.label = 18;
                case 18: return [4 /*yield*/, knex.schema.hasTable("collection")];
                case 19:
                    if (!!(_a.sent())) return [3 /*break*/, 21];
                    return [4 /*yield*/, knex.schema.createTable("collection", function (table) {
                            table.increments("id");
                            table
                                .integer("collection_owner_id")
                                .unsigned()
                                .notNullable()
                                .references("users.id");
                            table.integer("shop_id").unsigned().references("shop.id");
                            table.integer("article_id").unsigned().references("article.id");
                            table.integer("follow_id").unsigned().references("users.id");
                            table
                                .integer("products_id")
                                .unsigned()
                                .references("shop_products_photo.id");
                            table.timestamps(false, true);
                        })];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21: return [4 /*yield*/, knex.schema.hasTable("shop_intro_photos")];
                case 22:
                    if (!!(_a.sent())) return [3 /*break*/, 24];
                    return [4 /*yield*/, knex.schema.createTable("shop_intro_photos", function (table) {
                            table.increments("id");
                            table.string("images", 1000).notNullable();
                            table.integer("shop_id").unsigned().notNullable().references("shop.id");
                            table.timestamps(false, true);
                        })];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24: return [4 /*yield*/, knex.schema.hasTable("shop_plan")];
                case 25:
                    if (!!(_a.sent())) return [3 /*break*/, 27];
                    return [4 /*yield*/, knex.schema.createTable("shop_plan", function (table) {
                            table.increments("id");
                            table.string("plan_name", 255).notNullable();
                            table.text("intro").notNullable();
                            table.string("image", 1000).notNullable();
                            table.integer("shop_id").unsigned().notNullable().references("shop.id");
                            table.integer("cancel_period");
                            table.integer("price").notNullable();
                            table.enum("types", ["limit", "package"]).notNullable();
                            table.timestamp("buy_period").notNullable();
                            table.integer("due_period");
                            table.integer("package_qty");
                            table
                                .enum("plan_status", ["active", "inactive"])
                                .defaultTo("active")
                                .notNullable();
                            table.timestamps(false, true);
                        })];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27: return [4 /*yield*/, knex.schema.hasTable("shop_members")];
                case 28:
                    if (!!(_a.sent())) return [3 /*break*/, 30];
                    return [4 /*yield*/, knex.schema.createTable("shop_members", function (table) {
                            table.increments("id");
                            table.integer("users_id").unsigned().notNullable().references("users.id");
                            table.integer("shop_id").unsigned().notNullable().references("shop.id");
                            table.timestamps(false, true);
                        })];
                case 29:
                    _a.sent();
                    _a.label = 30;
                case 30: return [4 /*yield*/, knex.schema.hasTable("booking")];
                case 31:
                    if (!!(_a.sent())) return [3 /*break*/, 33];
                    return [4 /*yield*/, knex.schema.createTable("booking", function (table) {
                            table.increments("id");
                            table
                                .integer("shop_plan_id")
                                .unsigned()
                                .notNullable()
                                .references("shop_plan.id");
                            table.integer("users_id").unsigned().notNullable().references("users.id");
                            table.timestamp("schedule").notNullable();
                            table
                                .enum("booking_status", [
                                "apply",
                                "confirm",
                                "reject",
                                "cancel",
                                "finish",
                            ])
                                .defaultTo("apply")
                                .notNullable();
                            table.timestamps(false, true);
                        })];
                case 32:
                    _a.sent();
                    _a.label = 33;
                case 33: return [4 /*yield*/, knex.schema.hasTable("notification")];
                case 34:
                    if (!!(_a.sent())) return [3 /*break*/, 36];
                    return [4 /*yield*/, knex.schema.createTable("notification", function (table) {
                            table.increments("id");
                            table.integer("users_id").unsigned().notNullable().references("users.id");
                            table.string("link", 255).notNullable();
                            table.text("content").notNullable();
                            table.timestamps(false, true);
                        })];
                case 35:
                    _a.sent();
                    _a.label = 36;
                case 36: return [4 /*yield*/, knex.schema.hasTable("users_package")];
                case 37:
                    if (!!(_a.sent())) return [3 /*break*/, 39];
                    return [4 /*yield*/, knex.schema.createTable("users_package", function (table) {
                            table.increments("id");
                            table.integer("users_id").unsigned().notNullable().references("users.id");
                            table
                                .integer("shop_plan_id")
                                .unsigned()
                                .notNullable()
                                .references("shop_plan.id");
                            table.integer("original_qty").notNullable();
                            table.integer("remain_qty").notNullable();
                            table.integer("buy_price").notNullable();
                            table.timestamp("due_time").notNullable();
                            table.timestamps(false, true);
                        })];
                case 38:
                    _a.sent();
                    _a.label = 39;
                case 39: return [2 /*return*/];
            }
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.dropTableIfExists("users_package")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("notification")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("booking")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("shop_members")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("shop_plan")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("shop_intro_photos")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("collection")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("like")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("shop_products_photo")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("message")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("shop")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("article")];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists("users")];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.down = down;
//# sourceMappingURL=20230117035901_auto-migrate.js.map