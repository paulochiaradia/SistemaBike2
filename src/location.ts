export class Location {
    constructor(
        public cep: string,
        public logradouro: string,
        public bairro: string,
        public cidade: string,
        public estado: string,
    ) { }
}