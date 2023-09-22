import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { Crypt } from "./crypt";
import { CepResponse, consultarCep } from "correios-brasil/dist";
import { Location } from "./location";
import { BikeNotFoundError } from "../Error/bike-not-found-error";
import { UserNotFoundError } from "../Error/user-not-found-error";
import { IncorrectPasswordError } from "../Error/incorrect-password-error";
import { BikeNotAvailableError } from "../Error/bike-not-available-error";
import { RentNotFindError } from "../Error/rent-not-found-error";
import { BikeNotRegistredError } from "../Error/bike-not-registred-erro";
import { CepNotRegistredError } from "../Error/cep-not-registred-error";
import { BikeAlreadyRegisteredError } from "../Error/bike-already-registred-Error";
import { UserAlreadyRegisteredError } from "../Error/user-already-registred-Error";

export class App {
    public rents: Rent[] = []
    public users: User[] = []
    public bikes: Bike[] = []
    public crypt: Crypt = new Crypt()

    //getUserByEmail  buscar um usuário pelo id
    getUserByEmail(email: string): User | undefined {
        const user= this.users.find((user) => user.email === email)
        return user
    }

    //getBikeById  buscar uma bike pelo id
    getBikeById(id: string): Bike | undefined {
        const bike = this.bikes.find((bike) => bike.id === id)
        return bike

    }

    //registerUser  cadastrar um usuário
    async registerUser(user: User): Promise<void> {
        const existeUser = this.getUserByEmail(user.email)
        if (existeUser) {
            throw new UserAlreadyRegisteredError()
        } else {
            const hashPassword = await this.crypt.encrypt(user.password)
            user.password = hashPassword
            this.users.push(user)
        }
    }

    //authenticateUser  autenticar um usuário
    async atenticateUser(email: string, password: string): Promise<boolean> {
        const user = this.getUserByEmail(email)
        if (user) {
            const passwordMatch = await this.crypt.compare(password, user.password)
            if (passwordMatch) {
                return true
            } else {
                throw new IncorrectPasswordError()
            }
        } else {
            throw new UserNotFoundError()
        }
    }

    //registerBike  cadastrar uma bike
    async registerBike(bike: Bike, cep: string): Promise<void> {
        const existeBike = this.getBikeById(bike.id);
        if (existeBike) {
            throw new BikeAlreadyRegisteredError();
        } else {
            const localidade = await findLocal(cep);
            bike.location = localidade; // Atribuir diretamente o objeto de localização
            this.bikes.push(bike);
        }
    }

    //removeUser  remover um usuário
    removeUser(email: string): void {
        const user = this.getUserByEmail(email)
        if (user) {
            const index = this.users.indexOf(user)
            this.users.splice(index, 1)
        } else {
            throw new UserNotFoundError()
        }
    }

    //rentBike  cadastrar um aluguel de bike
    rentBike(bikeId:string, userEmail:string): void {
        const bike = this.getBikeById(bikeId)
        const user = this.getUserByEmail(userEmail)
        if(!bike) {
            throw new BikeNotFoundError()
        }
        if(!user) {
            throw new UserNotFoundError()
        }
        if (!bike.available) {
            throw new BikeNotAvailableError()
        }
        bike.available = false
        const rent = new Rent(bike, user, new Date())
        this.rents.push(rent)
    }

    //returnBike  devolver uma bike e calcular o valor do aluguel
   async returnBike(bikeId: string, userEmail:string, cep:string):Promise<number> {
        const today = new Date()
        const bike = this.getBikeById(bikeId)
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === rent.user.email &&
            rent.end === undefined
        )
        if (rent && bike) {
            const location = await findLocal(cep)
            bike.location = location
            rent.end = today
            rent.bike.available = true
            const horas = diffHours(today, rent.start)
            return(rent.bike.rate * horas)
        }
        throw new RentNotFindError()
    }

    async atualizarEnderecoBike(bikeId: string, cep: string): Promise<void> {
        const bike = this.getBikeById(bikeId);
        if (!bike) {
            throw new BikeNotFoundError();
        } else {
            const localidade = await findLocal(cep);
            bike.location = localidade;
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
    getAllBikes() {
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

    //moveBikeTo  mover uma bike para uma localização específica
    async moveBikeTo(bikeId: string, cep: string): Promise<void> {
        const bike = this.getBikeById(bikeId)
        if (bike) {
            const cep1 = await findLocal(cep)
            bike.location = cep1
        } else {
            throw new BikeNotFoundError()
        }
    }

    //bikecadastrada  verificar se uma bike está cadastrada
    bikeCadastrada(bikeId: string): boolean {
        const bike = this.getBikeById(bikeId)
        if (bike) {
            return true
        } else {
            throw new BikeNotRegistredError()
        }
    }

}

//diffHours  calcular a diferença de horas entre duas datas
function diffHours(dt2: Date, dt1: Date) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);
  }

//funcao para buscar localizacao
async function findLocal(cep: string): Promise<Location> {
    try {
        const response: CepResponse = await consultarCep(cep);
        const location = new Location(
            response.cep,
            response.logradouro,
            response.bairro,
            response.localidade,
            response.uf
        );
        return location;
    } catch (err) {
        throw new CepNotRegistredError();
    }
}




