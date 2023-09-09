import { mainModule } from "process";
import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";

const app = new App()
const bike1 = new Bike("Caloi", "Normal", 29, 150, 10, "teste", 40, []);
const user1 = User.create("Paulo", "paulo@gmail.com", "teste1")
const user2 = User.create("Teste", "teste@gmail.com", "teste12121")

try {
    await app.registerUser(user1);
    await app.registerUser(user2);
    app.getAllUsers();
} catch (err) {
    console.log("Ocorreu um erro: ", err);
}

try {
    await app.authenticateUser(user2.email, user1.password);
    await app.authenticateUser(user2.email, user1.password);
} catch (err) {
    console.log("Ocorreu um erro: ", err);
}

/*

try{
    app.rentBike(bike1, new Date("2021-10-10"), new Date("2021-10-20"), user1)
    app.rentBike(bike1, new Date("2021-10-15"), new Date("2021-10-20"), user2)
}catch(err){
    console.log("An error occurred: ", err)
}
app.returnDateBike(bike1.id, new Date("2021-10-30"))
app.getBikes()
app.getAllRents()*/
