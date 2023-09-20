export class BikeNotRegistred extends Error {
    public readonly name = "BikeNotRegistred"
    constructor() {
        super("BikeNotRegistred.");
    }
}