"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeNotRegistredError = void 0;
class BikeNotRegistredError extends Error {
    constructor() {
        super("Bike not registred.");
        this.name = "BikeNotRegistredError";
    }
}
exports.BikeNotRegistredError = BikeNotRegistredError;
