import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";

const app = new App()
const bike1 = new Bike("Caloi", "Normal", 29, 150, 10, "teste", 40, []);
const user1 = User.create("Paulo", "paulo@gmail.com", "teste1")
const user2 = User.create("Teste", "teste@gmail.com", "teste12121")
//const user3 = User.create("Paulo121423", "paulo@gmail.com", "teste1")
app.registerUser(user1)
app.registerUser(user2)
//app.registerUser(user3)
app.registerBike(bike1)
app.removeUser(user1.email)
app.getAllUsers()
app.rentBike(bike1, new Date("2021-10-10"), new Date("2021-10-20"), user1)
//app.rentBike(bike1, new Date("2021-10-10"), new Date("2021-10-20"), user1)
app.returnDateBike(bike1.id, new Date("2021-10-30"))
app.getBikes()
app.getAllRents()