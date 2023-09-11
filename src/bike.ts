import crypto from "crypto";
export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public MaxLoad: number,
        public rate: number,
        public description: string,
        public rating: number,
        public imgUrls: string[],
        public id: string = crypto.randomUUID(),
        public available: boolean = true
    ) { }
}