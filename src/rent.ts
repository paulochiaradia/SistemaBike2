import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    public constructor(
        public bike: Bike,
        public user: User,
        public dateFrom: Date,
        public dateTo: Date,
        public dateReturned: Date
    ) { }
    static create(rents: Rent[], bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
        const canCreate = Rent.carRent(rents, startDate, endDate, bike.id)
        if (canCreate) return new Rent(bike, user, startDate, endDate, new Date(0))
        throw new Error("Overlapping")
    }

    static carRent(rents: Rent[], startDate: Date, endDate: Date, id: string): boolean {
        for (const rent of rents) {
            if (rent.bike.id === id && startDate <= rent.dateTo && endDate >= rent.dateFrom) {
                return false
            }
        }
        return true
    }

}