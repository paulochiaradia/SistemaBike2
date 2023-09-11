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
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const rent_1 = require("./rent");
const crypt_1 = require("./crypt");
class App {
    constructor() {
        this.rents = [];
        this.users = [];
        this.bikes = [];
        this.crypt = new crypt_1.Crypt();
    }
    //getUserByEmail  buscar um usuário pelo id
    getUserByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    //getBikeById  buscar uma bike pelo id
    getBikeById(id) {
        return this.bikes.find((bike) => bike.id === id);
    }
    //registerUser  cadastrar um usuário
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeUser = this.getUserByEmail(user.email);
            if (existeUser) {
                throw new Error("Usuario já cadastrado");
            }
            else {
                const hashPassword = yield this.crypt.encrypt(user.password);
                user.password = hashPassword;
                this.users.push(user);
            }
        });
    }
    atenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getUserByEmail(email);
            if (user) {
                const passwordMatch = yield this.crypt.compare(password, user.password);
                if (passwordMatch) {
                    return true;
                }
                else {
                    return false;
                    throw new Error("Senha incorreta");
                }
            }
            else {
                return false;
                throw new Error("Usuario não encontrado");
            }
        });
    }
    //registerBike  cadastrar uma bike
    registerBike(bike) {
        const existeBike = this.getBikeById(bike.id);
        if (existeBike) {
            throw new Error("Bike já cadastrada");
        }
        else {
            this.bikes.push(bike);
        }
    }
    //removeUser  remover um usuário
    removeUser(email) {
        const user = this.getUserByEmail(email);
        if (user) {
            const index = this.users.indexOf(user);
            this.users.splice(index, 1);
        }
        else {
            throw new Error("Usuario não encontrado");
        }
    }
    //rentBike  cadastrar um aluguel de bike
    rentBike(bike, dateFrom, dateTo, user) {
        const overlappingRent = this.rents.find(rent => rent.bike === bike &&
            (dateFrom <= rent.dateTo && dateTo >= rent.dateFrom));
        if (overlappingRent) {
            throw new Error("Aluguel já cadastrado");
        }
        else {
            const newRent = rent_1.Rent.create(this.rents, bike, user, dateFrom, dateTo);
            this.rents.push(newRent);
        }
    }
    //returnDateBike  atualizar a data de retorno da bike, cadastrada inicialmento como 0
    returnDateBike(id, dateReturned) {
        const bike = this.getBikeById(id);
        if (bike) {
            const rent = this.rents.find(rent => rent.bike === bike);
            if (rent) {
                rent.dateReturned = dateReturned;
            }
            else {
                throw new Error("Aluguel não encontrado");
            }
        }
        else {
            throw new Error("Bike não encontrada");
        }
    }
    //getAllRents  listar todos os alugueis
    getAllRents() {
        console.log(this.rents);
    }
    //getAllUsers  listar todos os usuários
    getAllUsers() {
        console.log(this.users);
    }
    //getAllBikes  listar todas as bikes
    getBikes() {
        console.log(this.bikes);
    }
    listUers() {
        return this.users.slice();
    }
    listBikes() {
        return this.bikes.slice();
    }
    listRents() {
        return this.rents.slice();
    }
}
exports.App = App;
