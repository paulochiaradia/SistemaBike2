export class BikeNotAvailableError extends Error {
    public readonly name = "BikeNotAvailableError"
    constructor() {
        super("Bike not Available.");
    }
}