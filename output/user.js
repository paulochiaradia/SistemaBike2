import crypto from "crypto";
export class User {
    nome;
    email;
    password;
    id;
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
        return new User(nome, email, password, crypto.randomUUID());
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
