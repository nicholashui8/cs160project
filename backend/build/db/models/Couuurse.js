"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CouurseSchema = new mongoose_1.default.Schema({
    courseName: String,
    courseNum: Number
});
module.exports = mongoose_1.default.model('coourse', CouurseSchema);
