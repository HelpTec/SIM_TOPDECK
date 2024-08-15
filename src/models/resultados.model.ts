import { CartaHs } from "./cartaHs";
import { Conteos } from "./conteos.model";
import { Promedios } from "./promedios.model";

export class Resultados {
    carta:CartaHs;
    promedio:Promedios;
    conteos:Conteos;

    constructor(carta:CartaHs, promedios:Promedios, conteos:Conteos) {
        this.carta = carta;
        this.promedio = promedios;
        this.conteos = conteos;
    }
}
