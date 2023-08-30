import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const user1= User.create("Paulo","teste@gmail.com", "1", "14725839926" );
const bike1=new Bike("Caloi","Rua", 29, 150, 4, "", 20, [],1)
console.log(user1)