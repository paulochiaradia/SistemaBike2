"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
const app = new app_1.App();
const bike1 = new bike_1.Bike("Caloi", "Normal", 29, 150, 10, "teste", 40, []);
const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
const user2 = user_1.User.create("Teste", "teste@gmail.com", "teste12121");
//const user3 = User.create("Paulo121423", "paulo@gmail.com", "teste1")
app.registerUser(user1);
app.registerUser(user2);
//app.registerUser(user3)
app.registerBike(bike1);
app.removeUser(user1.email);
app.getAllUsers();
app.rentBike(bike1, new Date("2021-10-10"), new Date("2021-10-20"), user1);
//app.rentBike(bike1, new Date("2021-10-10"), new Date("2021-10-20"), user1)
app.returnDateBike(bike1.id, new Date("2021-10-30"));
app.getBikes();
app.getAllRents();
