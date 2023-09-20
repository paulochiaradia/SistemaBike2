"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFindError = void 0;
class UserNotFindError extends Error {
    constructor() {
        super("User not Found.");
        this.name = "UserNotFindError";
    }
}
exports.UserNotFindError = UserNotFindError;
