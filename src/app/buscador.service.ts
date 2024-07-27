import { Injectable } from '@angular/core';
import { Carta } from '../models/carta';
import { Mazo } from '../models/mazo.model';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor() { }

topdeck(mazo:Mazo): number {
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
}