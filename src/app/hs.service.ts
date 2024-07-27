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
    /*generarMazo(cantCartas:number, armador:Armador[] ):Mazo<CartaHs>[] {
    let mazo: Mazo<CartaHs>[] = [];
    let carta: CartaHs={
      id:0,
      tipo:"",
      rareza:"",
      clase:false,
    }
    let idCarta: number = 0;

    function mezclador(mazo:CartaHs[]){
      for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
      };
    }

    function creadorCarta(i:any): CartaHs{
      idCarta++;
      return{
      id: idCarta,
      tipo: armador[i].tipo,
      rareza: "",
      clase: armador[i].clase,
      };
    };
 
    for (let i = 0; i < armador.length; i++){
        for (let c= 0; c<= armador[i].comunesPares;c++){
          let carta = creadorCarta(i)
          carta.rareza="comun";
          mazo.push(carta);
          mazo.push({ ...carta });
        };
        for (let d= +armador[i].comunesPares+1; d<= armador[i].comunes;d++){
          carta = creadorCarta(i)
          carta.rareza="comun";
          mazo.push(carta);
        }
        for (let e= 0; e<= armador[i].rarasPares;e++){
          carta = creadorCarta(i)
          carta.rareza="rara";
          mazo.push(carta);
          mazo.push({ ...carta });
        };
        for (let f= +armador[i].rarasPares+1; f<= armador[i].raras;f++){
          carta = creadorCarta(i)
          carta.rareza="rara";
          mazo.push(carta);
        }
        for (let g= 0; g<= armador[i].epicasPares;g++){
          carta = creadorCarta(i)
          carta.rareza="epica";
          mazo.push(carta);
          mazo.push({ ...carta });
        };
        for (let h= +armador[i].epicasPares+1; h<= armador[i].epicas;h++){
          carta = creadorCarta(i)
          carta.rareza="epica";
          mazo.push(carta);
        }
        for (let b= 0; b<= armador[i].legendarias;b++){
          carta = creadorCarta(i)
          carta.rareza="legendaria";
          mazo.push(carta);
        }
      }
      mezclador(mazo);
    return mazo;
    }*/
    