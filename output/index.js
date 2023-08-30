"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bike_1 = require("./bike");
const user_1 = require("./user");
const user1 = user_1.User.create("Paulo", "teste@gmail.com", "1", "14725839926");
const bike1 = new bike_1.Bike("Caloi", "Rua", 29, 150, 4, "", 20, [], 1);
console.log(user1);
