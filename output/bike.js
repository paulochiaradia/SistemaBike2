"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
class Bike {
    constructor(name, type, bodySize, MaxLoad, rate, description, rating, imgUrls, id) {
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
