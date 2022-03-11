"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//example of how a student schema could look like
const StudentSchema = new mongoose_1.default.Schema({
    name: String,
    studentID: Number,
    courses: [{
            courseName: String,
            grade: Number,
            assignments: [{
                    assignmentName: String,
                    description: String,
                    grade: Number,
                }],
        }]
});
module.exports = mongoose_1.default.model('Student', StudentSchema);
