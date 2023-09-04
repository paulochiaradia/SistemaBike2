import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    public rents: Rent[] = []
    public users: User[] = []
    public bikes: Bike[] = []
    //registerbike
    //removeuser
    //rentbike
    //ruturnbike
    //getallrents

    //getUserById  buscar um usuário pelo id
    getUserByEmail(email: string): User | undefined {
        return this.users.find((user) => user.email === email)
    }

    //getBikeById  buscar uma bike pelo id
    getBikeById(id: string): Bike | undefined {
        return this.bikes.find((bike) => bike.id === id)
    }

    //registerBike  cadastrar uma bike
    registerUser(user: User): void {
        const existeUser = this.getUserByEmail(user.email)
        if (existeUser) {
            throw new Error("Usuario já cadastrado")
        } else {
            this.users.push(user)
        }
    }

    //registerBike  cadastrar uma bike
    registerBike(bike: Bike): void {
        const existeBike = this.getBikeById(bike.id)
        if (existeBike) {
            throw new Error("Bike já cadastrada")
        } else {
            this.bikes.push(bike)
        }
    }

    //removeUser  remover um usuário
    removeUser(email: string): void {
        const user = this.getUserByEmail(email)
        if (user) {
            const index = this.users.indexOf(user)
            this.users.splice(index, 1)
        } else {
            throw new Error("Usuario não encontrado")
        }
    }

    //rentBike  cadastrar um aluguel de bike
    rentBike(bike: Bike, dateFrom: Date, dateTo: Date, user: User): void {
        const overlappingRent = this.rents.find(rent =>
            rent.bike === bike &&
            (dateFrom <= rent.dateTo && dateTo >= rent.dateFrom)
        );

        if (overlappingRent) {
            throw new Error("Aluguel já cadastrado");
        } else {
            const newRent = Rent.create(this.rents, bike, user, dateFrom, dateTo);
            this.rents.push(newRent);
        }
    }

    //returnDateBike  atualizar a data de retorno da bike, cadastrada inicialmento como 0
    returnDateBike(id: string, dateReturned: Date): void {
        const bike = this.getBikeById(id)
        if (bike) {
            const rent = this.rents.find((rent) => rent.bike === bike)
            if (rent) {
                rent.dateReturned = dateReturned
            } else {
                throw new Error("Aluguel não encontrado")
            }

        } else {
            throw new Error("Bike não encontrada")
        }
    }

    //getAllRents  listar todos os alugueis
    getAllRents() {
        console.log(this.rents)
    }
    //getAllUsers  listar todos os usuários
    getAllUsers() {
        console.log(this.users)
    }
    //getAllBikes  listar todas as bikes
    getBikes() {
        console.log(this.bikes)
    }










}