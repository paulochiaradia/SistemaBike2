export class CepNotRegistredError extends Error {
    public readonly name = "CepNotRegistredError"
    constructor() {
        super("Cep not registred.");
    }
}