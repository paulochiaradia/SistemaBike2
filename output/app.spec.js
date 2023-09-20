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
        yield expect(app.moveBikeTo(bikeIdTeste, cepTeste)).rejects.toThrow("Bike não encontrada");
    }));
    it('should throw an exception when trying to acess invalid bike(unregistered bike)', () => {
        const app = new app_1.App();
        const bikeIdTeste = crypto_1.default.randomUUID();
        expect(app.getBikeById(bikeIdTeste)).rejects.toThrow("Bike não encontrada");
    });
});
