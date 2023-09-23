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
    await app.registerBike(bike1, "12120075")
    app.rentBike(bike1.id, user1.email)
    console.log("-----------Alugado------------")
    console.log(app.rents[0].bike)
    console.log(await app.returnBike(bike1.id, user1.email, "12120091"))
    console.log("-----------Retornado------------")
    console.log(app.rents[0].bike)
   }


main()
