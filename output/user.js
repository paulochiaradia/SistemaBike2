"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(nome, email, password, id) {
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.id = id;
    }
    static create(nome, email, password, id) {
        if (!User.isValidEmail(email)) {
            throw new Error("Email must be a valid email");
        }
        if (!User.isValidPassword(password)) {
            throw new Error("Password must be a valid password");
        }
        if (!User.isValidId(id)) {
            throw new Error("Id must be a valid id");
        }
        return new User(nome, email, password, id);
    }
    static isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }
    static isValidPassword(password) {
        if (password.length < 4)
            return false;
        const constainsNumber = /\d/.test(password);
        return constainsNumber;
    }
    static isValidId(id) {
        id = id.replace(/\D/g, '');
        if (id.length !== 11) {
            return false;
        }
        if (/^(\d)\1+$/.test(id)) {
            return false;
        }
        return true;
    }
}
exports.User = User;
