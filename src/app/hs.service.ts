import { Injectable } from '@angular/core';
import { CartaHs } from '../models/cartaHs';
import { Armador } from '../models/armador';
import { Mazo } from '../models/mazo.model';
  @Injectable({
  providedIn: 'root'
})

export class HsService {
  constructor() { }

  mezclador(cartas:CartaHs[]) {
    for (let i = cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    };
  }
  generadorMazoHsPorTipo(armador:Armador):Mazo<CartaHs>{
    let cartas:CartaHs[]= [];
    let id:number = 1
    let rarezaUnica:string[] = ["comunes","raras","epicas", "legendarias"];
    let rarezaPar:string[] = ["comunesPares","rarasPares","epicasPares"];

    for (let i of rarezaUnica){
      for (let c = 0; c < (armador as any)[i]; c++){
        let carta = new CartaHs(id, armador.tipo, i, false);
        cartas.push(carta);
        id++;}}
        console.log(cartas);
    for (let i of rarezaPar){
      for (let c = 0; c < (armador as any)[i]; c++){
        let carta = new CartaHs(id, armador.tipo, i, false);
        cartas.push(carta);
        cartas.push(carta);
        id++;
      }
    }
    console.log(cartas);
    let mazo = new Mazo<CartaHs>(cartas);
    console.log(mazo);
    return mazo;
  }
  generarMazoFinal(mazos:Mazo<CartaHs>[]):Mazo<CartaHs>{
    let cartasCombinadas:CartaHs[] = [];
    mazos.forEach(mazo => {
      cartasCombinadas = cartasCombinadas.concat(mazo.getCartas());
    });
    this.mezclador(cartasCombinadas);
      return new Mazo<CartaHs>(cartasCombinadas);
  }

}