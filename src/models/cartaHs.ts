export class CartaHs{
    id:number;
    tipo:string;
    rareza:string;
    clase:boolean;
    constructor(id:number, tipo:string, rareza: string, clase:boolean){
        this.id = id;
        this.tipo = tipo;
        this.rareza = rareza;
        this.clase = clase;
    }
}
