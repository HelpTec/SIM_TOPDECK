import { Injectable } from '@angular/core';
import { CartaHs } from '../models/cartaHs';
import { Mazo } from '../models/mazo.model';
import { HsService } from './hs.service';
import { Promedios } from '../models/promedios.model';
import { Resultados } from '../models/resultados.model';

@Injectable({
  providedIn: 'root'
})


export class BuscadorService {

  constructor(private servicio: HsService) { }

  selectorCombinado(mazo:Mazo<CartaHs>,tipo?:string, rareza?:string): CartaHs | null{
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
        return idRandom
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
      return idRandom
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
      return idRandom
    }
    if (!tipo && !rareza){
      const idRandom = mazo.cartas[(Math.floor(Math.random() * mazo.cartas.length))];
      return idRandom
    }
    return null;
  }

  topdeck(mazo:Mazo<CartaHs>, buscar:CartaHs | null): number {
    let contador = 0
    if (!buscar){
      console.log("No hay nada que buscar");
      return 0
    }
    while (mazo.cartas.length > 0) {
      contador++;
      let carta: CartaHs = mazo.cartas.shift()!;
      if (carta.id === buscar.id) {
      return contador;
      }
    }
    console.log("no fue encontrada")
    return 0;
  }

  buscarEn(mazo:Mazo<CartaHs>, buscar:CartaHs | null): boolean {
    if (buscar) {
    return (mazo.cartas.some(carta => carta.id === buscar.id))
    } else {
      return false;
    }
  }

  drawhand(mazo:Mazo<CartaHs>): [Mazo<CartaHs>, Mazo<CartaHs>] {
    let primeraMano = new Mazo<CartaHs>(this.robarX(mazo, 3));
    return [primeraMano, new Mazo(mazo.cartas.filter(carta => !primeraMano.cartas.includes(carta)))];
  }

  contadorDrawHand(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null):number[] {
    let resultadosPrimeraMano:boolean[] = []
    let resultadosMulligan:boolean[] = []
    for (let i = 0; i < intentos; i++) {
      this.servicio.mezclador(mazo.cartas)
      let mano = this.drawhand(mazo)[0]
      let mazoSinDrawHand = this.drawhand(mazo)[1]
      if (this.buscarEn(mano, buscar)){
        resultadosPrimeraMano.push(true)
      } else {
        resultadosPrimeraMano.push(false)
        let mano = this.drawhand(mazoSinDrawHand)[0]
        resultadosMulligan.push(this.buscarEn(mano, buscar))
      }
    }
    let contadorPrimeraMano:number = resultadosPrimeraMano.filter(value => value).length;
    let contadorMulligan:number = resultadosMulligan.filter(value => value).length;
    return [contadorPrimeraMano, contadorMulligan];
  }

  robarX(mazo:Mazo<CartaHs>,robar:number):CartaHs[]{
    let robarX:CartaHs[]=[]
    for (let i = 0; i < robar; i++){
      robarX.push(mazo.cartas[i]);
    }
    return robarX
  }

  develarXTipo(mazo:Mazo<CartaHs>, tipo: string | null):Mazo<CartaHs>{
    if (tipo){
    let develadas = new Mazo<CartaHs>([]);
    while (develadas.cartas.length < 3) {
      let carta:CartaHs = mazo.cartas.shift()!;
      if (carta.tipo === tipo){
        develadas.cartas.push(carta);
      }
    }
    return develadas;
  } else {
    return mazo
  }
  }

  contadorDevelado(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null, tipo:string | null): number{
    let contador:boolean[] = [];
    for (let i = 0; i < intentos; i++) {
      this.servicio.mezclador(mazo.cartas);
      let develar = this.develarXTipo(mazo, tipo);
      contador.push(this.buscarEn(develar, buscar));
      }
    return contador.filter(value => value).length;
    }

  promediador(contadores:number, intentos:number):number {
    let promedio = contadores/intentos;
    return promedio
  }

  buscarPostPrimeraManoYMulligan(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null):number{
    let contador:number=0
    for (let i=0; i<intentos; i++) {
      this.servicio.mezclador(mazo.cartas);
      contador =+ this.topdeck(this.drawhand(mazo)[1], buscar);
    }
    return contador;

  }

  casosDePrueba(mazo: Mazo<CartaHs>): Resultados[]{
    let intentos:number = 100;
    let tipos: string[] = ['Esbirro','Arma','Hechizo','Locacion','Héroe'];
    let rareza: string[] = ['comun', 'rara', 'epica', 'legendaria'];
    let listaResultados:Resultados[] = [];
    tipos.forEach(criterio => {
      rareza.forEach(rareza =>{
        let carta:CartaHs | null = this.selectorCombinado(mazo, criterio, rareza );
        if (carta){
          let puro = this.promediador(this.topdeck(mazo, carta), intentos);
          let promsPrimYMull:number[] = this.contadorDrawHand(mazo, intentos, carta)
          let primeraMano= this.promediador(promsPrimYMull[0], intentos);
          let mulligan= this.promediador(promsPrimYMull[1], intentos);
          let postPrimeraManoYMulligan= this.promediador(this.buscarPostPrimeraManoYMulligan(mazo, intentos, carta), intentos);
          let develado= this.promediador(this.contadorDevelado(mazo, intentos, carta, carta.tipo), intentos);;
          let promedio = new Promedios(puro, primeraMano, mulligan, postPrimeraManoYMulligan, develado)
          listaResultados.push(new Resultados(carta, promedio))
        }
      });
    });
    return listaResultados;
  }
}
