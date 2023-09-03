import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App{
    public rents:Rent[] = []
    public users:User[] = []
    public bikes:Bike[] = []
   // registerbike
    //removeuser
    //rentbike
    //ruturnbike
    //getallrents

    registerUser(user:User): string {
        for(const rUser of this.users) {
            if(rUser.id === user.id) {throw new Error("User already exists")}
        }
        this.users.push(user);
        return user.id
    }

    registerBike(bike:Bike): string {
        for(const rBike of this.bikes) {
            if(rBike.id === bike.id) {throw new Error("Bike already exists")}
        }
        this.bikes.push(bike);
        return bike.id
    }

    addRent(bikeid:string, startDate:Date, endDate:Date, userid:string): void {
        const bike:Bike = this.findBikeById(bikeid)
        const user:User = this.findUserById(userid)
        const rentBike:Rent[]=this.rents.filter(rent =>rent.bike===bike)
        Rent.create(rentBike,bike,user,startDate,endDate)
    }

    
    deleteUser(user:User):void{
        const userIndex = this.users.indexOf(user);
        if(userIndex !== -1){
            this.users.splice(userIndex, 1);
        }
    }

    deleteUserByEmail(email:string):void{
        const userIndex = this.users.findIndex(user => user.email === email);
        if(userIndex !== -1){
            this.users.splice(userIndex, 1);
        }
    }

    deleteBike(bike:Bike):void{
        const bikeIndex = this.bikes.indexOf(bike);
        if(bikeIndex !== -1){
            this.bikes.splice(bikeIndex, 1);
        }
    }

    deleteBikeById(bike:Bike):void{
        const bikeIndex = this.bikes.findIndex(bike=>bike.id === bike.id);
        if(bikeIndex !== -1){
            this.bikes.splice(bikeIndex, 1);
        }
    }

    deleteRent(rent:Rent):void{
        const rentIndex = this.rents.indexOf(rent)
        if(rentIndex !== -1){
            this.rents.splice(rentIndex, 1);
        }
    }

    findUserByEmail(email:string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    findUserById(id:string): User | undefined {
        return this.users.find(user => user.id === id)
    }

    findBikeById(id:string): Bike | undefined {
        return this.bikes.find(bike => bike.id === id)
    }
 
    findRentByStartDate(startDate:Date): Rent | undefined {
        return this.rents.find(rent =>rent.dateFrom === startDate)
    }
    findRentByBikeId(bikeId:string): Rent|undefined {
        return this.rents.find(rent =>rent.bike.id === bikeId)
    }

    getActiveRents(): Rent[] {
        const currentDate = new Date();
        return this.rents.filter(rent => rent.dateFrom <= currentDate && currentDate <= rent.dateTo);
    }

    getBikesRents(bike:Bike): Rent[]{
        return this.rents.filter(rent =>rent.bike === bike)
    }
    
    getUsersRents(user:User):Rent[]{
        return this.rents.filter(rent => rent.user===user)
    }

    getAllUsers(): User[] {
        return this.users
    }

    getAllBikes(): Bike[] {
        return this.bikes
    }

    getAllRents():Rent[] {
        return this.rents


 
       
}

