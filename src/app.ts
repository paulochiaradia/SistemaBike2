import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { Crypt } from "./crypt";

export class App {
    public rents: Rent[] = []
    public users: User[] = []
    public bikes: Bike[] = []
    public crypt: Crypt = new Crypt()
    //getUserByEmail  buscar um usuário pelo id
    getUserByEmail(email: string): User | undefined {
        return this.users.find((user) => user.email === email)
    }

    //getBikeById  buscar uma bike pelo id
    getBikeById(id: string): Bike | undefined {
        return this.bikes.find((bike) => bike.id === id)
    }

    //registerUser  cadastrar um usuário
    async registerUser(user: User): Promise<void> {
        const existeUser = this.getUserByEmail(user.email)
        if (existeUser) {
            throw new Error("Usuario já cadastrado")
        } else {
            const hashPassword = await this.crypt.encrypt(user.password)
            user.password = hashPassword
            this.users.push(user)
        }
    }

    async atenticateUser(email: string, password: string): Promise<boolean> {
        const user = this.getUserByEmail(email)
        if (user) {
            const passwordMatch = await this.crypt.compare(password, user.password)
            if (passwordMatch) {
                return true
            } else {
                return false
                throw new Error("Senha incorreta")
            }
        } else {
            return false
            throw new Error("Usuario não encontrado")
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
            (dateFrom == rent.start)
        );

        if (overlappingRent) {
            throw new Error("Bike já alugada")
        } else {
            const newRent = Rent.create(this.rents, bike, user, dateFrom, dateTo);
            bike.available = false;
            this.rents.push(newRent);
        }
    }

     returnBike(bikeId: string, userEmail: string):number {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail 
        )
        if (rent) {
            rent.end = today
            const horas= Math.abs(rent.end.getTime() - rent.start.getTime()) / 36e5
            rent.bike.available = true
            return(rent.bike.rate * horas)
        }
        throw new Error('Rent not found.')
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

    listUers():User[] {
        return this.users.slice()
    }

    listBikes():Bike[] {
        return this.bikes.slice()
    }

    listRents():Rent[] {
        return this.rents.slice()
    }
}