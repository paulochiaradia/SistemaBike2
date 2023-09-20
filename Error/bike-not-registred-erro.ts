export class BikeNotRegistredError extends Error {
    public readonly name = "BikeNotRegistredError"
    constructor() {
        super("Bike not registred.");
    }
}