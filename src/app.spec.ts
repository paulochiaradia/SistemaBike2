import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import crypto from "crypto";
import { BikeNotFoundError } from "../Error/bike-not-found-error";
import { BikeNotRegistredError } from "../Error/bike-not-registred-erro";
import { UserAlreadyRegisteredError } from "../Error/user-already-registred-Error";
import { IncorrectPasswordError } from "../Error/incorrect-password-error";
import { UserNotFoundError } from "../Error/user-not-found-error";
import { BikeAlreadyRegisteredError } from "../Error/bike-already-registred-Error";
import { RentNotFoundError } from "../Error/rent-not-found-error";
import exp from "constants";
import { BikeNotAvailableError } from "../Error/bike-not-available-error";
describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        await app.registerBike(bike1, "12120075")
        const clock = sinon.useFakeTimers();
        app.rentBike(bike1.id, user1.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = await app.returnBike(bike1.id, user1.email,"12120075" )
        expect(rentAmount).toEqual(200.0)
    })

    
    it('should be able to move a bike to a specific location', async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike1, "12120075")
        await app.moveBikeTo(bike1.id, "12211902")
        expect(bike1.location?.cep).toEqual("12211-902")
        expect(bike1.location?.cidade).toEqual("São José dos Campos")	
    })

    it('should throw an exception when trying to move an unregistered bike', async() => {
        const app = new App()
        const bikeIdTeste = crypto.randomUUID()
        const cepTeste = "12211902"
        await expect(app.moveBikeTo(bikeIdTeste, cepTeste)).rejects.toThrow(BikeNotFoundError)
    })

    it('should throw an exception when trying to acess an unregistered bike', () => {
        const app = new App()
        const bikeIdTeste = crypto.randomUUID()
        expect(() => app.bikeCadastrada(bikeIdTeste)).toThrow(BikeNotRegistredError)
    })
    it('should correct get user', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        expect(app.getUserByEmail(user1.email)).toEqual(user1)
    });

    it('should throw an execption when trying to register a duplicate user', async() => {	
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        const user2  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await expect(app.registerUser(user2)).rejects.toThrow(UserAlreadyRegisteredError)
    });
    it('should correct get bike', async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike1, "12120075")
        expect(app.getBikeById(bike1.id)).toEqual(bike1)
    });

    it('should correct register user', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        expect(app.getUserByEmail(user1.email)).toEqual(user1)
    });

    it('should correct authenticate user', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        expect(await app.atenticateUser(user1.email, 'teste1')).toEqual(true)
    });

    it('should throw an exception when trying to authenticate a user with wrong password', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        await expect(app.atenticateUser(user1.email, 'teste2')).rejects.toThrow(IncorrectPasswordError)
        });

    it('should throw an exception when trying to authenticate a non-existent user', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        await expect(app.atenticateUser('Vinicius', 'teste1')).rejects.toThrow(UserNotFoundError)	
    });

    it('should correct register bike', async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike1, "12120075")
        expect(app.getBikeById(bike1.id)).toEqual(bike1)
    });

    it('should throw an exception when trying to register a duplicate bike', async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike1, "12120075")
        await expect(app.registerBike(bike1, "12120075")).rejects.toThrow(BikeAlreadyRegisteredError)
    });

    it('should correct remove user', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        app.removeUser(user1.email)
        expect(app.users).toEqual([])
    });

    it('should correct rent bike', async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const user1  = User.create("Paulo", "paulo.chiaradia@gmail.com", "teste1")
        await app.registerUser(user1)
        await app.registerBike(bike1, "12120075")
        app.rentBike(bike1.id, user1.email)
        expect(app.rents.length).toBeGreaterThan(0)
        expect(app.rents[0].bike).toEqual(bike1)
        expect(app.rents[0].user).toEqual(user1)
    });

    it('should throw an exception when trying to return a not rented bike', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        expect(app.returnBike("1234", user1.email, "12120091")).rejects.toThrow(RentNotFoundError)
    });

    it("shuold correct return bike", async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const user1  = User.create("Paulo", "paulo.chiaradia@gmail.com", "teste1")
        await app.registerUser(user1)
        await app.registerBike(bike1, "12120075")
        app.rentBike(bike1.id, user1.email)
        await app.returnBike(bike1.id, user1.email, "12120091")
        expect(app.bikes[0].location?.cep).toEqual("12120-091")
        expect(app.bikes[0].available).toEqual(true)
    });

});
