"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeNotFoundError = void 0;
class BikeNotFoundError extends Error {
    constructor() {
        super("Bike not Found.");
        this.name = "BikeNotFoundError";
    }
}
exports.BikeNotFoundError = BikeNotFoundError;
