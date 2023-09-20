export class UserAlreadyRegistered extends Error {
    public readonly name = "UserAlreadyRegistered"
    constructor() {
        super("User already registered.");
    }
}