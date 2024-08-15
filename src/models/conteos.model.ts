export class Conteos {
    puro: number[];
    primeraMano: boolean[];
    mulligan: boolean[];
    postPrimeraManoYMulligan: number[];
    develado: boolean[];

    constructor(
        puro: number[], 
        primeraMano: boolean[], 
        mulligan: boolean[], 
        postPrimeraManoYMulligan:number[], 
        develado: boolean[]) {
            
        this.puro = puro;
        this.primeraMano = primeraMano;
        this.mulligan = mulligan;
        this.postPrimeraManoYMulligan = postPrimeraManoYMulligan;
        this.develado = develado;
}
}
