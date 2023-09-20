"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeAlreadyRegisteredError = void 0;
class BikeAlreadyRegisteredError extends Error {
    constructor() {
        super("Bike already registered.");
        this.name = "BikeAlreadyRegisteredError";
    }
}
exports.BikeAlreadyRegisteredError = BikeAlreadyRegisteredError;
