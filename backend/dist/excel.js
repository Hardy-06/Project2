"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.article = exports.booking = exports.users = exports.shops = exports.plans = exports.productnails = void 0;
var xlsx_1 = __importDefault(require("xlsx"));
var path_1 = __importDefault(require("path"));
var workbook = xlsx_1.default.readFile(path_1.default.join("sampledata.xlsx"));
var Sheet1 = workbook.Sheets.Sheet1;
var Sheet2 = workbook.Sheets.Sheet2;
var Sheet3 = workbook.Sheets.Sheet3;
var Sheet4 = workbook.Sheets.Sheet4;
var Sheet5 = workbook.Sheets.Sheet5;
var Sheet6 = workbook.Sheets.Sheet6;
exports.productnails = xlsx_1.default.utils.sheet_to_json(Sheet1);
exports.plans = xlsx_1.default.utils.sheet_to_json(Sheet2);
exports.shops = xlsx_1.default.utils.sheet_to_json(Sheet3);
exports.users = xlsx_1.default.utils.sheet_to_json(Sheet4);
exports.booking = xlsx_1.default.utils.sheet_to_json(Sheet5);
exports.article = xlsx_1.default.utils.sheet_to_json(Sheet6);
// console.log(productnails);
// console.log(plans);
// console.log(shops);
// console.log(users);
// console.log(booking);
// console.log(article);
//# sourceMappingURL=excel.js.map