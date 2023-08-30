export class User {
    private constructor(
        public nome: string,
        public email: string,
        public password: string,
        public id: string
    ) {}
    static create(nome: string, email: string, password: string, id: string) {
        if(!User.isValidEmail(email)){
            throw new Error("Email must be a valid email")
        }
        if(!User.isValidPassword(password)){
            throw new Error("Password must be a valid password")
        }
        if(!User.isValidId(id)){
            throw new Error("Id must be a valid id")
        }
        return new User(nome, email, password, id)
    }

    static isValidEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email)
    }
    static isValidPassword(password: string): boolean {
        if (password.length < 4) return false;
        const constainsNumber = /\d/.test(password);
        return constainsNumber;
    }

    static isValidId(id: string): boolean {
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