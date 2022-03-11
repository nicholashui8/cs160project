"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = 'mongodb+srv://adminUser:cs160admin@cluster0.kagsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connectDB = () => {
    mongoose_1.default.connect(connectionString).then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log(err);
    });
};
module.exports = connectDB;
