import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";

async function main() {
    const app = new App()
    const user1 = User.create("Paulo", "paulo@gmail.com", "teste1")
    await app.registerUser(user1)
    app.getAllUsers()
    console.log(app.atenticateUser(user1.email, "teste1"))
    app.getAllUsers()
    const bike1 = new Bike("Caloi", "Normal", 29, 150, 10, "teste", 40, []);
    app.registerBike(bike1)
    app.rentBike(bike1, new Date("2021-10-10"), user1)
    app.returnBike(bike1.id, new Date("2021-10-20"))
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
