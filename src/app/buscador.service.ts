import { Injectable } from '@angular/core';
import { CartaHs } from '../models/cartaHs';
import { Mazo } from '../models/mazo.model';
import { HsService } from './hs.service';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private servicio: HsService) { }

  selectorCombinado(mazo:Mazo<CartaHs>,tipo?:string, rareza?:string): number | null{
    if (mazo.cartas.length === 0){
      console.log("Mazo vacio o no hay mazo legible")
      return null;
    }
    const listaCartasSegunFiltro:CartaHs[] = [];

    if (tipo && rareza){
      for (const carta of mazo.cartas) {
        if (carta.rareza === rareza && carta.tipo === tipo){
          listaCartasSegunFiltro.push(carta)
        }
      } if (listaCartasSegunFiltro.length === 0){
          console.log("No se encontraron cartas con el criterio")
          return null;
        }
        const idRandom = listaCartasSegunFiltro[(Math.floor(Math.random() * listaCartasSegunFiltro.length))];
        return idRandom.id
    }
    if (!tipo && rareza){
      for (const carta of mazo.cartas){
        if (carta.rareza === rareza){
          listaCartasSegunFiltro.push(carta)
        }
      }
      if (listaCartasSegunFiltro.length === 0){
        console.log("No se encontraron cartas con el criterio")
        return null;
      }
      const idRandom = listaCartasSegunFiltro[(Math.floor(Math.random() * listaCartasSegunFiltro.length))];
      return idRandom.id
    } 
    if (tipo && !rareza){
      for (const carta of mazo.cartas){
        if (carta.tipo === tipo){
          listaCartasSegunFiltro.push(carta)
        }
      }
      if (listaCartasSegunFiltro.length === 0){
        console.log("No se encontraron cartas con el criterio")
        return null;
      }
      const idRandom = listaCartasSegunFiltro[(Math.floor(Math.random() * listaCartasSegunFiltro.length))];
      return idRandom.id
    }
    if (!tipo && !rareza){
      const idRandom = mazo.cartas[(Math.floor(Math.random() * mazo.cartas.length))];
      return idRandom.id
    }
    return null;
  }

  topdeck(mazo:Mazo<CartaHs>, buscar:number): number {
    let contador = 0
    while (mazo.cartas.length > 0) {
      contador++;
      let carta: CartaHs = mazo.cartas.shift()!;
      if (carta.id === buscar) {
        return contador;
      }
    }
    console.log("no fue encontrada")
    return contador=0;
  }

  drawhand(mazo:Mazo<CartaHs>, buscar:number): [number, boolean] {
    /*variables para manejo de primera mano*/
    let primeramano:CartaHs[]= this.robarX(mazo, 3);
    /*reviso si en primera mano esta la carta*/
    if (primeramano.some(carta => carta.id === buscar)){
      console.log("Encontrada en primera mano")
      return [1, true]
    }
    /*un log para ver el mazo antes de sacar primera mano  */
    console.log(mazo.cartas)
    /*filtro la primera mano */
    const mazoSinPrimeraMano = mazo.cartas.filter(carta => !primeramano.includes(carta))
    let mazoSinManoInicial = new Mazo(mazoSinPrimeraMano);
    /*un log para ver el mazo post sacada primera mano */
    console.log(mazo.cartas)
    /*una variable para el mulligan */
    let mulligan:CartaHs[] = this.robarX(mazoSinManoInicial, 3);
    /**reviso si en el mulligan no esta la carta que busco */
     if (mulligan.some(carta => carta.id === buscar)){
      console.log("Encontrada en mulligan")
      return [2, true]
    }
    const mazoSinMulligan:CartaHs[]= mazo.cartas.filter(carta => !mulligan.includes(carta))
    /*un log para ver el mazo sin mezclar y sin mulligan */
    console.log(mazoSinMulligan)
    this.servicio.mezclador(mazoSinMulligan)
    /*un log para ver el mazo mezclado y sin mulligan */
    console.log(mazoSinMulligan)
    /**genero objeto mazo ahora sin mulligan y como no aparecio en primera ni en mulli se devuelve false */
    mazoSinManoInicial = new Mazo(mazoSinMulligan);
    console.log(primeramano)
    console.log(mulligan)
    console.log(mazoSinPrimeraMano)
    console.log(mazoSinMulligan)
    return [this.topdeck(mazo, buscar), false];
  }

  robarX(mazo:Mazo<CartaHs>,robar:number):CartaHs[]{
    let robarX:CartaHs[]=[]
    for (let i = 0; i < robar; i++){
      robarX.push(mazo.cartas[i]);
    }
    return robarX
  }


}
