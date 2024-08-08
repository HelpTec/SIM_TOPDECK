export class Mazo<T>{
    cartas:T[];

    public clone(): Mazo<T> {
        return new Mazo<T>(this.cartas.map(carta => ({ ...carta })));
    }

    constructor(cartas: T[]) {
    this.cartas = cartas;
    }

    public getCartas(): T[] {
    return this.cartas;}
    }
