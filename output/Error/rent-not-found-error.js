"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentNotFindError = void 0;
class RentNotFindError extends Error {
    constructor() {
        super("Rent not find Error.");
        this.name = "RentNotFindError";
    }
}
exports.RentNotFindError = RentNotFindError;
