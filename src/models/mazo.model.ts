export class Mazo {
    cartas:(number | string)[];

    constructor(cartas: (number | string)[]) {
    this.cartas = cartas;
    }

    public getCartas(): Array<number | string> {
    return this.cartas = [];}

    public setCartas(cartas: Array<number | string>): void {
    this.cartas = cartas;}
    }
