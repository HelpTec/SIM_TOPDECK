import { Injectable } from '@angular/core';
import { CartaHs } from '../models/cartaHs';
import { Mazo } from '../models/mazo.model';
import { HsService } from './hs.service';
import { Promedios } from '../models/promedios.model';
import { Resultados } from '../models/resultados.model';
import { Conteos } from '../models/conteos.model';

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
      return mazo.cartas.some(carta => carta !== undefined && carta.id === buscar.id);
    } else {
      return false;
    }
  }

  drawhand(mazo:Mazo<CartaHs>): [Mazo<CartaHs>, Mazo<CartaHs>] {
    let primeraMano = new Mazo<CartaHs>(this.robarX(mazo, 3));
    return [primeraMano, new Mazo(mazo.cartas.filter(carta => !primeraMano.cartas.includes(carta)))];
  }

  contadorDrawHand(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null):[number[], boolean[], boolean[]] {
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
    return [[contadorPrimeraMano, contadorMulligan], resultadosPrimeraMano, resultadosMulligan];
  }

  robarX(mazo:Mazo<CartaHs>,robar:number):CartaHs[]{
    let robarX:CartaHs[]=[]
    for (let i = 0; i < robar; i++){
      robarX.push(mazo.cartas[i]);
    }
    return robarX
  }

  develarXTipo(mazo:Mazo<CartaHs>, tipo: string | null):Mazo<CartaHs>{
    let develadas = new Mazo<CartaHs>([]);
    if (tipo){
    while (develadas.cartas.length < 3 && mazo.cartas.length > 0) {
      let carta:CartaHs = mazo.cartas.shift()!;
      if (carta.tipo === tipo){
        develadas.cartas.push(carta);
      }
    }
    return develadas;
  } else {
    return develadas
  }
  }

  contadorDevelado(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null, tipo:string | null): [number, boolean[]]{
    let contador:boolean[] = [];
    if (mazo.cartas.length > 0){
      for (let i = 0; i < intentos; i++) {
      this.servicio.mezclador(mazo.cartas);
      let develar = this.develarXTipo(mazo, tipo);
      contador.push(this.buscarEn(develar, buscar));
      }}
    return [contador.filter(value => value).length, contador]
    }
  
  contadorPuro(mazo:Mazo<CartaHs>, buscar:CartaHs | null, intentos:number):[number, number[]]{
    let contadorTotal:number = 0
    let contadores:number[] = [];
    for (let i = 0; i < intentos; i++) {
      let mazoABuscar = mazo.clone();
      this.servicio.mezclador(mazoABuscar.cartas)
      let contador=this.topdeck(mazoABuscar, buscar)
      contadorTotal += contador
      contadores.push(contador);
    }
    return [contadorTotal, contadores]
  }

  promediador(contadores:number, intentos:number):number {
    let promedio = contadores/intentos;
    return promedio
  }

  buscarPostPrimeraManoYMulligan(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null):[number, number[]]{
    let contadorTotal:number=0
    let contadores:number[] = [];
    for (let i=0; i<intentos; i++) {
      this.servicio.mezclador(mazo.cartas);
      let contador = this.topdeck(this.drawhand(mazo)[1], buscar);
      contadorTotal += contador;
      contadores.push(contador);
    }
    return [contadorTotal, contadores];

  }

  casosDePrueba(mazo: Mazo<CartaHs>): Resultados[]{
    let intentos:number = 10;
    let tipos: string[] = ['Esbirro','Arma','Hechizo','Locacion','Héroe'];
    let rareza: string[] = ['comun', 'rara', 'epica', 'legendaria'];
    let listaResultados:Resultados[] = [];
    tipos.forEach(criterio => {
      rareza.forEach(rareza =>{
        let mazoABuscar = mazo.clone();
        let carta:CartaHs | null = this.selectorCombinado(mazoABuscar, criterio, rareza );
        if (carta){
          //puros
          let mazoABuscar1 = mazo.clone();
          let contadorPuro = this.contadorPuro(mazoABuscar1, carta, intentos)
          let puro = this.promediador(contadorPuro[0], intentos);
          //drawhand y mull
          let mazoABuscar2 = mazo.clone();
          let promsPrimYMull:any[] = this.contadorDrawHand(mazoABuscar2, intentos, carta)
          let primeraMano= this.promediador(promsPrimYMull[0][0], intentos);
          let mulligan= this.promediador(promsPrimYMull[0][1], intentos);
          //postPrimYMull
          let mazoABuscar3 = mazo.clone();
          let contPostPrimeraManoYMulligan = this.buscarPostPrimeraManoYMulligan(mazoABuscar3, intentos, carta)
          let postPrimeraManoYMulligan= this.promediador(contPostPrimeraManoYMulligan[0], intentos);
          //develado
          let mazoABuscar4 = mazo.clone();
          let contDevelado = this.contadorDevelado(mazoABuscar4, intentos, carta, carta.tipo)
          let develado= this.promediador(contDevelado[0], intentos);;
          let promedio = new Promedios(puro, primeraMano, mulligan, postPrimeraManoYMulligan, develado)
          let contadores = new Conteos(contadorPuro[1], promsPrimYMull[1], promsPrimYMull[2], contPostPrimeraManoYMulligan[1], contDevelado[1])
          listaResultados.push(new Resultados(carta, promedio, contadores))
        }
      });
    });
    return listaResultados;
  }
}
