import crypto from "crypto";
export class Bike {
    name;
    type;
    bodySize;
    MaxLoad;
    rate;
    description;
    rating;
    imgUrls;
    id;
    constructor(name, type, bodySize, MaxLoad, rate, description, rating, imgUrls, id = crypto.randomUUID()) {
        this.name = name;
        this.type = type;
        this.bodySize = bodySize;
        this.MaxLoad = MaxLoad;
        this.rate = rate;
        this.description = description;
        this.rating = rating;
        this.imgUrls = imgUrls;
        this.id = id;
    }
}
