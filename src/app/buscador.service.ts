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
    let mazoABuscar = mazo
    if (mazoABuscar.cartas.length === 0){
      console.log("Mazo vacio o no hay mazo legible")
      return null;
    }
    const listaCartasSegunFiltro:CartaHs[] = [];

    if (tipo && rareza){
      for (const carta of mazoABuscar.cartas) {
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
      for (const carta of mazoABuscar.cartas){
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
      for (const carta of mazoABuscar.cartas){
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
      const idRandom = mazoABuscar.cartas[(Math.floor(Math.random() * mazoABuscar.cartas.length))];
      return idRandom
    }
    return null;
  }

  topdeck(mazo:Mazo<CartaHs>, buscar:CartaHs | null): number {
    let mazoABuscar = mazo
    let contador = 0
    if (!buscar){
      console.log("No hay nada que buscar");
      return 0
    }
    while (mazoABuscar.cartas.length > 0) {
      contador++;
      let carta: CartaHs = mazoABuscar.cartas.shift()!;
      if (carta.id === buscar.id) {
      return contador;
      }
    }
    console.log("no fue encontrada")
    return 0;
  }

  buscarEn(mazo:Mazo<CartaHs>, buscar:CartaHs | null): boolean {
    let mazoABuscar = mazo
    if (buscar) {
      return mazoABuscar.cartas.some(carta => carta !== undefined && carta.id === buscar.id);
    } else {
      return false;
    }
  }

  drawhand(mazo:Mazo<CartaHs>): [Mazo<CartaHs>, Mazo<CartaHs>] {
    let mazoABuscar = mazo
    let primeraMano = new Mazo<CartaHs>(this.robarX(mazoABuscar, 3));
    return [primeraMano, new Mazo(mazoABuscar.cartas.filter(carta => !primeraMano.cartas.includes(carta)))];
  }

  contadorDrawHand(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null):number[] {
    let mazoABuscar = mazo
    let resultadosPrimeraMano:boolean[] = []
    let resultadosMulligan:boolean[] = []
    for (let i = 0; i < intentos; i++) {
      this.servicio.mezclador(mazoABuscar.cartas)
      let mano = this.drawhand(mazoABuscar)[0]
      let mazoSinDrawHand = this.drawhand(mazoABuscar)[1]
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
    let mazoABuscar= mazo
    let robarX:CartaHs[]=[]
    for (let i = 0; i < robar; i++){
      robarX.push(mazoABuscar.cartas[i]);
    }
    return robarX
  }

  develarXTipo(mazo:Mazo<CartaHs>, tipo: string | null):Mazo<CartaHs>{
    let mazoABuscar = mazo
    let develadas = new Mazo<CartaHs>([]);
    if (tipo){
    while (develadas.cartas.length < 3 && mazoABuscar.cartas.length > 0) {
      let carta:CartaHs = mazoABuscar.cartas.shift()!;
      if (carta.tipo === tipo){
        develadas.cartas.push(carta);
      }
    }
    return develadas;
  } else {
    return develadas
  }
  }

  contadorDevelado(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null, tipo:string | null): number{
    let mazoABuscar = mazo;
    let contador:boolean[] = [];
    if (mazo.cartas.length > 0){
      for (let i = 0; i < intentos; i++) {
      this.servicio.mezclador(mazoABuscar.cartas);
      let develar = this.develarXTipo(mazoABuscar, tipo);
      contador.push(this.buscarEn(develar, buscar));
      }}
    return contador.filter(value => value).length;
    }

  promediador(contadores:number, intentos:number):number {
    let promedio = contadores/intentos;
    return promedio
  }

  buscarPostPrimeraManoYMulligan(mazo:Mazo<CartaHs>, intentos:number, buscar:CartaHs| null):number{
    let mazoABuscar = mazo;
    let contador:number=0
    for (let i=0; i<intentos; i++) {
      this.servicio.mezclador(mazoABuscar.cartas);
      contador =+ this.topdeck(this.drawhand(mazoABuscar)[1], buscar);
    }
    return contador;

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
          let mazoABuscar1 = mazo.clone();
          let puro = this.promediador(this.topdeck(mazoABuscar1, carta), intentos);
          let mazoABuscar2 = mazo.clone();
          let promsPrimYMull:number[] = this.contadorDrawHand(mazoABuscar2, intentos, carta)
          let primeraMano= this.promediador(promsPrimYMull[0], intentos);
          let mulligan= this.promediador(promsPrimYMull[1], intentos);
          let mazoABuscar3 = mazo.clone();
          let postPrimeraManoYMulligan= this.promediador(this.buscarPostPrimeraManoYMulligan(mazoABuscar3, intentos, carta), intentos);
          let mazoABuscar4 = mazo.clone();
          let develado= this.promediador(this.contadorDevelado(mazoABuscar4, intentos, carta, carta.tipo), intentos);;
          let promedio = new Promedios(puro, primeraMano, mulligan, postPrimeraManoYMulligan, develado)
          listaResultados.push(new Resultados(carta, promedio))
        }
      });
    });
    return listaResultados;
  }
}
