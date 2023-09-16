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
                throw new Error("Senha incorreta")
            }
        } else {
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
    rentBike(bikeId:string, userEmail:string): void {
        const bike = this.getBikeById(bikeId)
        const user = this.getUserByEmail(userEmail)
        if(!bike) {
            throw new Error('Bicicleta nao encontrada.')
        }
        if(!user) {
            throw new Error('Usuario nao encontrado.')
        }
        if (!bike.available) {
            throw new Error('Bicicleta indisponivel.')
        }
        bike.available = false
        const rent = new Rent(bike, user, new Date())
        this.rents.push(rent)
    }

     returnBike(bikeId: string, userEmail:string):number {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === rent.user.email &&
            rent.end === undefined
        )
        if (rent) {
            rent.end = today
            rent.bike.available = true
            const horas = diffHours(today, rent.start)
            return(rent.bike.rate * horas)
        }
        throw new Error('Aluguel não encontrado.')
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

    //listUsers  listar todos os usuários vetor
    listUers():User[] {
        return this.users.slice()
    }

    //listBikes  listar todas as bikes vetor
    listBikes():Bike[] {
        return this.bikes.slice()
    }

    //listRents  listar todos os alugueis vetor
    listRents():Rent[] {
        return this.rents.slice()
    }
}

//diffHours  calcular a diferença de horas entre duas datas
function diffHours(dt2: Date, dt1: Date) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
  }