"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const rent_1 = require("./rent");
class App {
    constructor() {
        this.rents = [];
        this.users = [];
        this.bikes = [];
    }
    // registerbike
    //removeuser
    //rentbike
    //ruturnbike
    registerUser(user) {
        for (const rUser of this.users) {
            if (rUser.id === user.id) {
                throw new Error("User already exists");
            }
        }
        this.users.push(user);
        return user.id;
    }
    registerBike(bike) {
        for (const rBike of this.bikes) {
            if (rBike.id === bike.id) {
                throw new Error("Bike already exists");
            }
        }
        this.bikes.push(bike);
        return bike.id;
    }
    addRent(bikeid, startDate, endDate, userid) {
        const bike = this.findBikeById(bikeid);
        const user = this.findUserById(userid);
        const rentBike = this.rents.filter(rent => rent.bike === bike);
        rent_1.Rent.create(rentBike, bike, user, startDate, endDate);
    }
    deleteUser(user) {
        const userIndex = this.users.indexOf(user);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }
    deleteUserByEmail(email) {
        const userIndex = this.users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }
    deleteBike(bike) {
        const bikeIndex = this.bikes.indexOf(bike);
        if (bikeIndex !== -1) {
            this.bikes.splice(bikeIndex, 1);
        }
    }
    deleteBikeById(bike) {
        const bikeIndex = this.bikes.findIndex(bike => bike.id === bike.id);
        if (bikeIndex !== -1) {
            this.bikes.splice(bikeIndex, 1);
        }
    }
    deleteRent(rent) {
        const rentIndex = this.rents.indexOf(rent);
        if (rentIndex !== -1) {
            this.rents.splice(rentIndex, 1);
        }
    }
    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    findUserById(id) {
        return this.users.find(user => user.id === id);
    }
    findBikeById(id) {
        return this.bikes.find(bike => bike.id === id);
    }
    findRentByStartDate(startDate) {
        return this.rents.find(rent => rent.dateFrom === startDate);
    }
    findRentByBikeId(bikeId) {
        return this.rents.find(rent => rent.bike.id === bikeId);
    }
    getActiveRents() {
        const currentDate = new Date();
        return this.rents.filter(rent => rent.dateFrom <= currentDate && currentDate <= rent.dateTo);
    }
    getBikesRents(bike) {
        return this.rents.filter(rent => rent.bike === bike);
    }
    getUsersRents(user) {
        return this.rents.filter(rent => rent.user === user);
    }
    getAllUsers() {
        return this.users;
    }
    getAllBikes() {
        return this.bikes;
    }
    getAllRents() {
        return this.rents;
    }
    returnBike(bike, date) {
        for (const rent of this.rents) {
            if (rent.bike === bike) {
                rent.dateReturned = date;
            }
        }
    }
}
exports.App = App;
