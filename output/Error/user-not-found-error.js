"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor() {
        super("User not Found.");
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
