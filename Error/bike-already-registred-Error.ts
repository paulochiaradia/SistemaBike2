export class BikeAlreadyRegistered extends Error {
    public readonly name = "BikeAlreadyRegistered"
    constructor() {
        super("Bike already registered.");
    }
}