export class IncorrectPasswordError extends Error {
    public readonly name = "IncorrectPasswordError"
    constructor() {
        super("Incorrect Password.");
    }
}