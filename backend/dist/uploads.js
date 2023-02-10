"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.form = exports.uploadDir = void 0;
var fs_1 = __importDefault(require("fs"));
var formidable_1 = __importDefault(require("formidable"));
exports.uploadDir = "uploads";
fs_1.default.mkdirSync(exports.uploadDir, { recursive: true });
exports.form = (0, formidable_1.default)({
    uploadDir: exports.uploadDir,
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
function toArray(fields) {
    if (Array.isArray(fields)) {
        return fields;
    }
    if (!fields) {
        return [];
    }
    return [fields];
}
exports.toArray = toArray;
//# sourceMappingURL=uploads.js.map