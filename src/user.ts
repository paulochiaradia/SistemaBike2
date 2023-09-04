import crypto from "crypto";

export class User {
    private constructor(
        public nome: string,
        public email: string,
        public password: string,
        public id: string
    ) { }

    static create(nome: string, email: string, password: string) {
        if (!User.isValidEmail(email)) {
            throw new Error("Email must be a valid email");
        }
        if (!User.isValidPassword(password)) {
            throw new Error("Password must be a valid password");
        }

        return new User(nome, email, password, crypto.randomUUID());
    }

    static isValidEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    static isValidPassword(password: string): boolean {
        if (password.length < 4) return false;
        const containsNumber = /\d/.test(password);
        return containsNumber;
    }

}
