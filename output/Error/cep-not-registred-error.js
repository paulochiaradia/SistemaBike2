"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CepNotRegistredError = void 0;
class CepNotRegistredError extends Error {
    constructor() {
        super("Cep not registred.");
        this.name = "CepNotRegistredError";
    }
}
exports.CepNotRegistredError = CepNotRegistredError;
