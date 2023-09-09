import * as bcrypt from "bcryptjs";
import { Rent } from "./rent";
export class App {
    rents = [];
    users = [];
    bikes = [];
    //getUserByEmail  buscar um usuário pelo id
    getUserByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    //getBikeById  buscar uma bike pelo id
    getBikeById(id) {
        return this.bikes.find((bike) => bike.id === id);
    }
    async registerUser(user) {
        const existeUser = this.getUserByEmail(user.email);
        if (existeUser) {
            throw new Error("Usuário já cadastrado");
        }
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            this.users.push(user);
        }
        catch (err) {
            throw new Error("Erro ao criptografar senha");
        }
    }
    async authenticateUser(email, password) {
        const user = this.getUserByEmail(email);
        if (!user) {
            return false;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return true;
        }
        else {
            return false;
        }
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
            const newRent = Rent.create(this.rents, bike, user, dateFrom, dateTo);
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
}
