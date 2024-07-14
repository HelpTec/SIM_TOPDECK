import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HsService {

  constructor() { }

  generarMazo(cartas:number, repetidas:(number | null)) {
    let mazo: (number | string)[] = [];

    if (repetidas !== null && repetidas > 0) {
      for (let i = 1; i <= repetidas; i++) {
        mazo.push(i as number);
        mazo.push(i as number);
      }
      for (let i = +repetidas+1; i <= cartas && mazo.length<cartas; i++) {
        mazo.push(i);
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

  contarRepetidas(mazo:(number | string)[]):{cantidadesRepetidas: number, repeticiones: Map<string | number, number>}{
    /*inicializo un map para controlar concurrencias*/
    let contador: {[llave:string]:number}= {};
    /*y un array para almacenar esas concurrencias*/
    let elementosRepetidos: Set<string | number> = new Set();
    /*recorro el mazo con un for*/
    for (let i = 0; i < mazo.length; i++) {
      /*si mazo i figura en contador:*/
      if(contador[mazo[i]]){
        /*revisamos si ya figuraba en contador con un valor de 1 almenos*/
        if(contador[mazo[i]]===1){
          /*de ser asi, el mazo i se agrega a elementos repetidos*/
          elementosRepetidos.add(mazo[i]);
      }
      /*sumamos 1 al valor de esa clave */
    contador[mazo[i]]++;
    /*si no figura, simplemente agregamos con esta linea la clave a contador con valor 1 */
  }else{contador[mazo[i]]=1}
}
/*aprovechando el objeto repeticiones creamos un map para retener esa informacion valiosa*/
let repeticiones: Map<string | number, number> = new Map();
for (let key in contador){
  repeticiones.set(key, contador[key]);
}
    /*al terminar el for devolvemos el tamaño de elementos repetidos*/
    return {
      repeticiones: repeticiones,
      cantidadesRepetidas: elementosRepetidos.size};
  }

  topdeck(cartas: number, repetidas: number): [(number | string)[], number, (number | string), string, number, number] {
    if (cartas <= 0){
      cartas = 30;
    }
    let mazo = this.generarMazo(cartas, repetidas);
    let mazoOriginal= [...mazo]
    let contador = 0
    let bandera = true
    let numeroIndice = 0
    let resultado: string= "";
    let repetidasMazoOrig: number= this.contarRepetidas(mazo);
    let longitudMazoOrig: number= mazo.length;

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
  return [mazoOriginal, contador, cartaAbuscar, resultado, repetidasMazoOrig, longitudMazoOrig];
}

  muestrario(cartas: number, repetidas:number): [number, number [],(number | string)[][], (number | string)[], string[], number[], number[]]{
    let intentosTotal: number = 0;
    let contadores: number[] = [];
    let mazos: (number | string)[][] = [];
    let numBuscados: (number | string)[] = [];
    let falla: string[] = [];
    let tamañoMazos:number[] = [];
    let duplicadasMazos:number[] = [];

    for (let i = 0; i < 5; i++) {
      let resultados = this.topdeck(cartas, repetidas)
      contadores.push(resultados[1]);
      intentosTotal += contadores[i];
      mazos.push(resultados[0]);
      numBuscados.push(resultados[2]);
      falla.push(resultados[3]);
      tamañoMazos.push(resultados[5]);
      duplicadasMazos.push(resultados[4]);
    }
    let valor = intentosTotal/5;
    return[valor, contadores, mazos, numBuscados, falla, tamañoMazos, duplicadasMazos];;
  }
}