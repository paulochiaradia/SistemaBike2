import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    public end:Date | undefined 
    public constructor(
        public bike: Bike,
        public user: User,
        public start: Date,
        public dateReturned?: Date
    ) { }
    static create(rents: Rent[], bike: Bike, user: User, startDate: Date, dateReturned: Date): Rent {
        const canCreate = Rent.carRent(rents, startDate, bike.id)
        if (canCreate) return new Rent(bike, user, startDate)
        throw new Error("Overlapping")
    }

    static carRent(rents: Rent[], startDate: Date, id: string): boolean {
        for (const rent of rents) {
            if (rent.bike.id === id && startDate <= rent.start ) {
                return false
            }
        }
        return true
    }

}