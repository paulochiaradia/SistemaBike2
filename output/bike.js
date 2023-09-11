"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Bike {
    constructor(name, type, bodySize, MaxLoad, rate, description, rating, imgUrls, id = crypto_1.default.randomUUID()) {
        this.name = name;
        this.type = type;
        this.bodySize = bodySize;
        this.MaxLoad = MaxLoad;
        this.rate = rate;
        this.description = description;
        this.rating = rating;
        this.imgUrls = imgUrls;
        this.id = id;
    }
}
exports.Bike = Bike;
