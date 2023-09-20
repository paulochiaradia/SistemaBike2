"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyRegisteredError = void 0;
class UserAlreadyRegisteredError extends Error {
    constructor() {
        super("User already registered.");
        this.name = "UserAlreadyRegisteredError";
    }
}
exports.UserAlreadyRegisteredError = UserAlreadyRegisteredError;
