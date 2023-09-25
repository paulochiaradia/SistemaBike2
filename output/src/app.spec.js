"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
const crypto_1 = __importDefault(require("crypto"));
const bike_not_found_error_1 = require("../Error/bike-not-found-error");
const bike_not_registred_erro_1 = require("../Error/bike-not-registred-erro");
const user_already_registred_Error_1 = require("../Error/user-already-registred-Error");
const incorrect_password_error_1 = require("../Error/incorrect-password-error");
const user_not_found_error_1 = require("../Error/user-not-found-error");
const bike_already_registred_Error_1 = require("../Error/bike-already-registred-Error");
const rent_not_found_error_1 = require("../Error/rent-not-found-error");
describe('App', () => {
    it('should correctly calculate the rent amount', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const bike1 = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        yield app.registerBike(bike1, "12120075");
        const clock = sinon_1.default.useFakeTimers();
        app.rentBike(bike1.id, user1.email);
        const hour = 1000 * 60 * 60;
        clock.tick(2 * hour);
        const rentAmount = yield app.returnBike(bike1.id, user1.email, "12120075");
        expect(rentAmount).toEqual(200.0);
    }));
    it('should be able to move a bike to a specific location', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const app = new app_1.App();
        const bike1 = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield app.registerBike(bike1, "12120075");
        yield app.moveBikeTo(bike1.id, "12211902");
        expect((_a = bike1.location) === null || _a === void 0 ? void 0 : _a.cep).toEqual("12211-902");
        expect((_b = bike1.location) === null || _b === void 0 ? void 0 : _b.cidade).toEqual("São José dos Campos");
    }));
    it('should throw an exception when trying to move an unregistered bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const bikeIdTeste = crypto_1.default.randomUUID();
        const cepTeste = "12211902";
        yield expect(app.moveBikeTo(bikeIdTeste, cepTeste)).rejects.toThrow(bike_not_found_error_1.BikeNotFoundError);
    }));
    it('should throw an exception when trying to acess an unregistered bike', () => {
        const app = new app_1.App();
        const bikeIdTeste = crypto_1.default.randomUUID();
        expect(() => app.bikeCadastrada(bikeIdTeste)).toThrow(bike_not_registred_erro_1.BikeNotRegistredError);
    });
    it('should correct get user', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        expect(app.getUserByEmail(user1.email)).toEqual(user1);
    }));
    it('should throw an execption when trying to register a duplicate user', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        const user2 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield expect(app.registerUser(user2)).rejects.toThrow(user_already_registred_Error_1.UserAlreadyRegisteredError);
    }));
    it('should correct get bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const bike1 = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield app.registerBike(bike1, "12120075");
        expect(app.getBikeById(bike1.id)).toEqual(bike1);
    }));
    it('should correct register user', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        expect(app.getUserByEmail(user1.email)).toEqual(user1);
    }));
    it('should correct authenticate user', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        expect(yield app.atenticateUser(user1.email, 'teste1')).toEqual(true);
    }));
    it('should throw an exception when trying to authenticate a user with wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        yield expect(app.atenticateUser(user1.email, 'teste2')).rejects.toThrow(incorrect_password_error_1.IncorrectPasswordError);
    }));
    it('should throw an exception when trying to authenticate a non-existent user', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        yield expect(app.atenticateUser('Vinicius', 'teste1')).rejects.toThrow(user_not_found_error_1.UserNotFoundError);
    }));
    it('should correct register bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const bike1 = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield app.registerBike(bike1, "12120075");
        expect(app.getBikeById(bike1.id)).toEqual(bike1);
    }));
    it('should throw an exception when trying to register a duplicate bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const bike1 = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        yield app.registerBike(bike1, "12120075");
        yield expect(app.registerBike(bike1, "12120075")).rejects.toThrow(bike_already_registred_Error_1.BikeAlreadyRegisteredError);
    }));
    it('should correct remove user', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        app.removeUser(user1.email);
        expect(app.users).toEqual([]);
    }));
    it('should correct rent bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const bike1 = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        const user1 = user_1.User.create("Paulo", "paulo.chiaradia@gmail.com", "teste1");
        yield app.registerUser(user1);
        yield app.registerBike(bike1, "12120075");
        app.rentBike(bike1.id, user1.email);
        expect(app.rents.length).toBeGreaterThan(0);
        expect(app.rents[0].bike).toEqual(bike1);
        expect(app.rents[0].user).toEqual(user1);
    }));
    it('should throw an exception when trying to return a not rented bike', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new app_1.App();
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        expect(app.returnBike("1234", user1.email, "12120091")).rejects.toThrow(rent_not_found_error_1.RentNotFoundError);
    }));
    it("shuold correct return bike", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const app = new app_1.App();
        const bike1 = new bike_1.Bike('caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, []);
        const user1 = user_1.User.create("Paulo", "paulo.chiaradia@gmail.com", "teste1");
        yield app.registerUser(user1);
        yield app.registerBike(bike1, "12120075");
        app.rentBike(bike1.id, user1.email);
        yield app.returnBike(bike1.id, user1.email, "12120091");
        expect((_c = app.bikes[0].location) === null || _c === void 0 ? void 0 : _c.cep).toEqual("12120-091");
        expect(app.bikes[0].available).toEqual(true);
    }));
});
