import { Carta } from "./carta";
export class CartaHs extends Carta {
    clase:boolean;

    constructor(id: number, tipo: string, rareza: string, clase:boolean){
        super(id, tipo, rareza);
        this.clase = clase;
    }
}
