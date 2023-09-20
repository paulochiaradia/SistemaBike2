export class UserAlreadyRegisteredError extends Error {
    public readonly name = "UserAlreadyRegisteredError"
    constructor() {
        super("User already registered.");
    }
}