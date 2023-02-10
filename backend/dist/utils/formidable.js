"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopImageForm = exports.userProfilePicForm = exports.contextImgForm = exports.form = void 0;
var formidable_1 = __importDefault(require("formidable"));
var fs_1 = __importDefault(require("fs"));
var uploadDir = "uploads/";
fs_1.default.mkdirSync(uploadDir, { recursive: true });
exports.form = (0, formidable_1.default)({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 10000 * Math.pow(1024, 2),
    filter: function (part) { var _a; return ((_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.startsWith("image/")) || false; },
    filename: function (originalName, originalExt, part, form) {
        var _a;
        var fieldName = part.name;
        var timestamp = Date.now();
        var ext = (_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.split("/").pop();
        return "".concat(fieldName, "-").concat(timestamp, ".").concat(ext);
    },
});
exports.contextImgForm = (0, formidable_1.default)({
    uploadDir: uploadDir + "context/",
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * Math.pow(1024, 2),
    filter: function (part) { var _a; return ((_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.startsWith("image/")) || false; },
    filename: function (originalName, originalExt, part, form) {
        var _a;
        var fieldName = part.name;
        var timestamp = Date.now();
        var ext = (_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.split("/").pop();
        return "".concat(fieldName, "-").concat(timestamp, ".").concat(ext);
    },
});
exports.userProfilePicForm = (0, formidable_1.default)({
    uploadDir: uploadDir + "profilePic/",
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 500 * Math.pow(500, 2),
    filter: function (part) { var _a; return ((_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.startsWith("image/")) || false; },
    filename: function (originalName, originalExt, part, form) {
        var _a;
        var fieldName = part.name;
        var timestamp = Date.now();
        var ext = (_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.split("/").pop();
        return "".concat(fieldName, "-").concat(timestamp, ".").concat(ext);
    },
});
exports.shopImageForm = (0, formidable_1.default)({
    uploadDir: uploadDir + "shopPic/",
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 5000 * Math.pow(1024, 2),
    filter: function (part) { var _a; return ((_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.startsWith("image/")) || false; },
    filename: function (originalName, originalExt, part, form) {
        var _a;
        var fieldName = part.name;
        var timestamp = Date.now();
        var ext = (_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.split("/").pop();
        return "".concat(fieldName, "-").concat(timestamp, ".").concat(ext);
    },
});
//# sourceMappingURL=formidable.js.map