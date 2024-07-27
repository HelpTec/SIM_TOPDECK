export class Mazo<T>{
    cartas:T[];

    constructor(cartas: T[]) {
    this.cartas = cartas;
    }

    public getCartas(): T[] {
    return this.cartas;}
    }
