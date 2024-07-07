import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HsService {

  constructor() { }

  generarMazo(cartas:number, repetidas:(number|null)) {
    let mazo: (number | string)[] = [];
    if (repetidas !== null) {
      let unicas: number = cartas-(repetidas*2);
      for (let i = 1; i <= repetidas; i++) {
        mazo.push(i as number);
        mazo.push(i as number);
      }
      for (let i = repetidas + 1; i <= repetidas+unicas; i++) {
        mazo.push(i as number);
      }
    } else {
        for (let i = 1; i <= cartas; i++) {
          mazo.push(i);
        }
    }
    this.mezclador(mazo);
    return mazo;
  }

  mezclador(mazo:(number | string)[]){
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    };
  }

  topdeck(cartas: number, repetidas: number): [(number | string)[], number, (number | string), string] {
    if (cartas <= 0){
      cartas = 30;
    }
    let mazo = this.generarMazo(cartas, repetidas);
    let mazoOriginal= [...mazo]
    let contador = 0
    let bandera = true
    let numeroIndice = 0
    let resultado: string= "";
    if (repetidas <= 0) {
      numeroIndice = Math.floor(Math.random() * mazo.length)
      } else{
        let unicas: number = cartas-(repetidas*2);
        numeroIndice = Math.floor(Math.random() * repetidas+unicas)
      }
    let cartaAbuscar: (number | string)= mazo[numeroIndice];

    while (bandera && mazo.length > 0) {
      contador++;
      let carta: number | string = mazo.shift()!;

      if (carta === "C") {
        contador--;
      }else if (carta === cartaAbuscar) {
        bandera = false;
      }
    }
    if (bandera) {
      contador = 0;
  }
  return [mazoOriginal, contador, cartaAbuscar, resultado];
}

  muestrario(cartas: number, repetidas:number): [number, number [],(number | string)[][], (number | string)[], string[]]{
    let intentosTotal: number = 0;
    let contadores: number[] = [];
    let mazos: (number | string)[][] = [];
    let numBuscados: (number | string)[] = [];
    let falla: string[] = [];

    for (let i = 0; i < 5; i++) {
      let resultados = this.topdeck(cartas, repetidas)
      contadores.push(resultados[1]);
      intentosTotal += contadores[i];
      mazos.push(resultados[0]);
      numBuscados.push(resultados[2]);
      falla.push(resultados[3]);
    }
    let valor = intentosTotal/5;
    return[valor, contadores, mazos, numBuscados, falla];;
  }
}