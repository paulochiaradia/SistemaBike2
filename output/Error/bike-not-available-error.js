"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeNotAvailableError = void 0;
class BikeNotAvailableError extends Error {
    constructor() {
        super("Bike not Available.");
        this.name = "BikeNotAvailableError";
    }
}
exports.BikeNotAvailableError = BikeNotAvailableError;
