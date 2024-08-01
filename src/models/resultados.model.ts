import { CartaHs } from "./cartaHs";
import { Promedios } from "./promedios.model";

export class Resultados {
    carta:CartaHs;
    promedio:Promedios;

    constructor(carta:CartaHs, promedios:Promedios) {
        this.carta = carta;
        this.promedio = promedios;
    }
}
