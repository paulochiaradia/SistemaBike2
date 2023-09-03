import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const app= new App()
const bike1 = new Bike("Caloi", "Normal", 29, 150, 10, "teste", 40, []);
const user1 = User.create("Paulo", "paulo@gmail.com", "teste1")
const user2 = User.create("Teste", "teste@gmail.com", "teste12121")
console.log(user1.id)
console.log(bike1.id)
app.registerUser(user1)
app.registerUser(user2)
const usuarios:User[] =app.getAllUsers()
console.log(usuarios)
const find=app.findUserById(user1.id);
console.log(find)
app.deleteUserByEmail(user1.email);
const find1=app.findUserById(user1.id);
console.log(find1)
const usuarios1:User[] =app.getAllUsers()
console.log(usuarios1)

app.returnBike(bike1, Date.now());
console.log(bike1)

