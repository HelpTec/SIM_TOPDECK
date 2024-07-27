export class Armador{
    tipo: string;
    comunes: number;
    comunesPares: number;
    raras: number;
    rarasPares: number;
    epicas: number;
    epicasPares: number;
    legendarias: number;
    clase: boolean;
    total: number;

    constructor(tipo: string, comunes:number, comunesPares: number, raras:number, 
        rarasPares: number, epicas: number, epicasPares:number, legendarias:number, 
        clase: boolean, total:number){
        this.tipo= tipo;
        this.comunes=comunes;
        this.comunesPares=comunesPares;
        this.raras= raras;
        this.rarasPares= rarasPares;
        this.epicas= epicas;
        this.epicasPares= epicasPares;
        this.legendarias= legendarias;
        this.clase= clase;
        this.total= total;
    }
}
