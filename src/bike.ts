import crypto from "crypto";
import { Location } from "./location";

export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public rating: number,
        public imgUrls: string[],
        public id: string = crypto.randomUUID(),
        public available: boolean = true,
        public location?: Location
    ) { }
}