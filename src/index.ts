import { App } from "./app";
import { Bike } from "./bike";
import { User } from "./user";
import sinon from "sinon";

async function main() {
    const app = new App()
    const clock=sinon.useFakeTimers(new Date("2021-10-10"))
    const bike1 = new Bike("Caloi", "Normal", 29, 150, 90, "teste", 40, []);
    const user1 = User.create("Paulo", "paulo@gmail.com", "teste1")
    await app.registerUser(user1)
    app.registerBike(bike1)
    console.log("Biclceta Disponivel?", bike1.available)
    app.rentBike(bike1.id, user1.email)
    console.log("Biclceta Disponivel?", bike1.available)
    clock.tick(1000*60*25)
    console.log(app.returnBike(bike1.id, user1.email))
    console.log("Biclceta Disponivel?", bike1.available)
}


main()
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
