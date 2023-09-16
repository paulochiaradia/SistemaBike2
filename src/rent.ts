import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    public end: Date | undefined
    public constructor(
        public bike: Bike,
        public user: User,
        public start: Date
    ) { }
}