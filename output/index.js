"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const user_1 = require("./user");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        app.getAllUsers();
        console.log(app.atenticateUser(user1.email, "teste1"));
        app.getAllUsers();
    });
}
/*
const app = new App()
const bike1 = new Bike("Caloi", "Normal", 29, 150, 10, "teste", 40, []);
const user1 = User.create("Paulo", "paulo@gmail.com", "teste1")
const user2 = User.create("Teste", "teste@gmail.com", "teste12121")





try{
    app.rentBike(bike1, new Date("2021-10-10"), new Date("2021-10-20"), user1)
    app.rentBike(bike1, new Date("2021-10-15"), new Date("2021-10-20"), user2)
}catch(err){
    console.log("An error occurred: ", err)
}
app.returnDateBike(bike1.id, new Date("2021-10-30"))
app.getBikes()
app.getAllRents()*/
