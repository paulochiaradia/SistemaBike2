"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentNotFoundError = void 0;
class RentNotFoundError extends Error {
    constructor() {
        super("Rent not found Error.");
        this.name = "RentNotFoundError";
    }
}
exports.RentNotFoundError = RentNotFoundError;
