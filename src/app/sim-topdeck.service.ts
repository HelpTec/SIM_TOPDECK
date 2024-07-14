import { Injectable } from '@angular/core';
import { Mazo } from '../models/mazo.model';

@Injectable({
  providedIn: 'root'
})
export class SimTopdeckService {

  constructor() { }

  generarMazo(cartas:number, comodines: number | null) {
    let mazo: (number | string)[] = [];
    comodines = comodines ?? 0;

    for (let i = 1; i <= cartas; i++) {
      mazo.push(i);
    };
    for (let i = 0; i < comodines; i++) {
      mazo.push('C');
    }
    this.mezclador(mazo);
    return mazo;
  }


  mezclador(mazo:(number | string)[]){
    for (let i=mazo.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    };
  }

  topdeck(mazo:(number | string)[]): number {
    let contador = 0
    let bandera = true

    while (bandera && mazo.length > 0) {
      contador++;
      let carta: number | string = mazo.shift()!;

      if (carta === "C") {
        contador--;
      } else if (carta === 1) {
        bandera = false;
      }
    }
    return contador;
  }

  muestrario(comodines: (number), cartas: number): number {
    let intentosTotal: number = 0;
    for (let i = 0; i < 100; i++) {
      let mazo = this.generarMazo(comodines, cartas);
      intentosTotal += this.topdeck(mazo);
    }
    let valor = intentosTotal/100;
    return valor;
  }
}
