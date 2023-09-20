export class UserNotFindError extends Error {
    public readonly name = "UserNotFindError"
    constructor() {
        super("User not Found.");
    }
}