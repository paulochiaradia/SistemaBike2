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
const app_1 = require("./app");
const bike_1 = require("./bike");
const user_1 = require("./user");
const sinon_1 = __importDefault(require("sinon"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new app_1.App();
        const clock = sinon_1.default.useFakeTimers(new Date("2021-10-10"));
        const bike1 = new bike_1.Bike("Caloi", "Normal", 29, 150, 90, "teste", 40, []);
        const user1 = user_1.User.create("Paulo", "paulo@gmail.com", "teste1");
        yield app.registerUser(user1);
        yield app.registerBike(bike1, "12120075");
        app.getAllBikes();
        app.rentBike(bike1.id, user1.email);
        console.log(yield app.returnBike(bike1.id, user1.email, "12120091"));
        app.getAllBikes();
        yield app.atualizarEnderecoBike(bike1.id, "12125208");
        console.log("------");
        app.getAllBikes();
    });
}
main();
