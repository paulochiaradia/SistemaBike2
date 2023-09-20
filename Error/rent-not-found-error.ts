export class RentNotFindError extends Error {
    public readonly name = "RentNotFindError"
    constructor() {
        super("Rent not find Error.");
    }
}