"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
class User {
    constructor(nome, email, password, id) {
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.id = id;
    }
    static create(nome, email, password) {
        if (!User.isValidEmail(email)) {
            throw new Error("Email must be a valid email");
        }
        if (!User.isValidPassword(password)) {
            throw new Error("Password must be a valid password");
        }
        return new User(nome, email, password, crypto_1.default.randomUUID());
    }
    static isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }
    static isValidPassword(password) {
        if (password.length < 4)
            return false;
        const containsNumber = /\d/.test(password);
        return containsNumber;
    }
}
exports.User = User;
