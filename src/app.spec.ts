import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import crypto from "crypto";
import { BikeNotFoundError } from "../Error/bike-not-found-error";
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
        expect(() => app.bikeCadastrada(bikeIdTeste)).toThrow("Bike não cadastrada")
    })
    it('should correct get user', async() => {
        const app = new App()
        const user1  = User.create("Paulo", "paulo@gmail.com", "teste1")
        await app.registerUser(user1)
        expect(app.getUserByEmail(user1.email)).toEqual(user1)
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

    it('should correct register bike', async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike1, "12120075")
        expect(app.getBikeById(bike1.id)).toEqual(bike1)
    });

    it('should correct rent bike', async() => {
        const app = new App()
        const bike1 = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const user1  = User.create("Paulo", "paulo.chiaradia@gmail.com", "teste1")
        await app.registerUser(user1)

    });

});
