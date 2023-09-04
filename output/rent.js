"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rent = void 0;
class Rent {
    constructor(bike, user, dateFrom, dateTo, dateReturned) {
        this.bike = bike;
        this.user = user;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.dateReturned = dateReturned;
    }
    static create(rents, bike, user, startDate, endDate) {
        const canCreate = Rent.carRent(rents, startDate, endDate, bike.id);
        if (canCreate)
            return new Rent(bike, user, startDate, endDate, null);
        throw new Error("Overlapping");
    }
    static carRent(rents, startDate, endDate, id) {
        for (const rent of rents) {
            if (rent.bike.id === id && startDate <= rent.dateTo && endDate >= rent.dateFrom) {
                return false;
            }
        }
        return true;
    }
}
exports.Rent = Rent;
