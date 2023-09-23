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
const dist_1 = require("correios-brasil/dist");
const location_1 = require("./location");
const bike_not_found_error_1 = require("../Error/bike-not-found-error");
const user_not_found_error_1 = require("../Error/user-not-found-error");
const incorrect_password_error_1 = require("../Error/incorrect-password-error");
const bike_not_available_error_1 = require("../Error/bike-not-available-error");
const rent_not_found_error_1 = require("../Error/rent-not-found-error");
const bike_not_registred_erro_1 = require("../Error/bike-not-registred-erro");
const cep_not_registred_error_1 = require("../Error/cep-not-registred-error");
const bike_already_registred_Error_1 = require("../Error/bike-already-registred-Error");
const user_already_registred_Error_1 = require("../Error/user-already-registred-Error");
class App {
    constructor() {
        this.rents = [];
        this.users = [];
        this.bikes = [];
        this.crypt = new crypt_1.Crypt();
    }
    //getUserByEmail  buscar um usuário pelo id
    getUserByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        return user;
    }
    //getBikeById  buscar uma bike pelo id
    getBikeById(id) {
        const bike = this.bikes.find((bike) => bike.id === id);
        return bike;
    }
    //registerUser  cadastrar um usuário
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeUser = this.getUserByEmail(user.email);
            if (existeUser) {
                throw new user_already_registred_Error_1.UserAlreadyRegisteredError();
            }
            else {
                const hashPassword = yield this.crypt.encrypt(user.password);
                user.password = hashPassword;
                this.users.push(user);
            }
        });
    }
    //authenticateUser  autenticar um usuário
    atenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getUserByEmail(email);
            if (user) {
                const passwordMatch = yield this.crypt.compare(password, user.password);
                if (passwordMatch) {
                    return true;
                }
                else {
                    throw new incorrect_password_error_1.IncorrectPasswordError();
                }
            }
            else {
                throw new user_not_found_error_1.UserNotFoundError();
            }
        });
    }
    //registerBike  cadastrar uma bike
    registerBike(bike, cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const existeBike = this.getBikeById(bike.id);
            if (existeBike) {
                throw new bike_already_registred_Error_1.BikeAlreadyRegisteredError();
            }
            else {
                const localidade = yield findLocal(cep);
                bike.location = localidade; // Atribuir diretamente o objeto de localização
                this.bikes.push(bike);
            }
        });
    }
    //removeUser  remover um usuário
    removeUser(email) {
        const user = this.getUserByEmail(email);
        if (user) {
            const index = this.users.indexOf(user);
            this.users.splice(index, 1);
        }
        else {
            throw new user_not_found_error_1.UserNotFoundError();
        }
    }
    //rentBike  cadastrar um aluguel de bike
    rentBike(bikeId, userEmail) {
        const bike = this.getBikeById(bikeId);
        const user = this.getUserByEmail(userEmail);
        if (!bike) {
            throw new bike_not_found_error_1.BikeNotFoundError();
        }
        if (!user) {
            throw new user_not_found_error_1.UserNotFoundError();
        }
        if (!bike.available) {
            throw new bike_not_available_error_1.BikeNotAvailableError();
        }
        bike.available = false;
        const rent = new rent_1.Rent(bike, user, new Date());
        this.rents.push(rent);
    }
    //returnBike  devolver uma bike e calcular o valor do aluguel
    returnBike(bikeId, userEmail, cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const bike = this.getBikeById(bikeId);
            const rent = this.rents.find(rent => rent.bike.id === bikeId &&
                rent.user.email === rent.user.email &&
                rent.end === undefined);
            if (rent && bike) {
                const location = yield findLocal(cep);
                bike.location = location;
                rent.end = today;
                rent.bike.available = true;
                const horas = diffHours(today, rent.start);
                return (rent.bike.rate * horas);
            }
            throw new rent_not_found_error_1.RentNotFoundError();
        });
    }
    atualizarEnderecoBike(bikeId, cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = this.getBikeById(bikeId);
            if (!bike) {
                throw new bike_not_found_error_1.BikeNotFoundError();
            }
            else {
                const localidade = yield findLocal(cep);
                bike.location = localidade;
            }
        });
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
    getAllBikes() {
        console.log(this.bikes);
    }
    //listUsers  listar todos os usuários vetor
    listUers() {
        return this.users.slice();
    }
    //listBikes  listar todas as bikes vetor
    listBikes() {
        return this.bikes.slice();
    }
    //listRents  listar todos os alugueis vetor
    listRents() {
        return this.rents.slice();
    }
    //moveBikeTo  mover uma bike para uma localização específica
    moveBikeTo(bikeId, cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const bike = this.getBikeById(bikeId);
            if (bike) {
                const cep1 = yield findLocal(cep);
                bike.location = cep1;
            }
            else {
                throw new bike_not_found_error_1.BikeNotFoundError();
            }
        });
    }
    //bikecadastrada  verificar se uma bike está cadastrada
    bikeCadastrada(bikeId) {
        const bike = this.getBikeById(bikeId);
        if (bike) {
            return true;
        }
        else {
            throw new bike_not_registred_erro_1.BikeNotRegistredError();
        }
    }
}
exports.App = App;
//diffHours  calcular a diferença de horas entre duas datas
function diffHours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
}
//funcao para buscar localizacao
function findLocal(cep) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, dist_1.consultarCep)(cep);
            const location = new location_1.Location(response.cep, response.logradouro, response.bairro, response.localidade, response.uf);
            return location;
        }
        catch (err) {
            throw new cep_not_registred_error_1.CepNotRegistredError();
        }
    });
}
