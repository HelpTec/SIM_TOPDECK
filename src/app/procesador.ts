import { Injectable } from '@angular/core';
import { Mazo } from '../models/mazo.model';
import { CartaHs } from '../models/cartaHs';
import { HsService } from './hs.service';
import { BuscadorService } from './buscador.service';
import { Armador } from '../models/armador';
import { BehaviorSubject } from 'rxjs';
import { Resultados } from '../models/resultados.model';

@Injectable({
  providedIn: 'root'
})
export class Procesador {
  private listaProcesadas = new BehaviorSubject<Armador[]>([]);
  private datosProcesados = new BehaviorSubject<Resultados[]>([]);

  constructor(
    private GenerarMazo: HsService,
    private Buscar: BuscadorService
    ) { }

    generarMazoHs(armadores:Armador[]): Mazo<CartaHs>{
    let mazoParcial: Mazo<CartaHs>[] = [];
      for (let armador of armadores){
        let mazoGenerado:Mazo<CartaHs> = this.GenerarMazo.generadorMazoHsPorTipo(armador)
        mazoParcial.push(mazoGenerado)};
      return this.GenerarMazo.generarMazoFinal(mazoParcial)
    }

    procesarDatos(armadores:Armador[]): void{
      
      this.listaProcesadas.next(armadores);
      console.log(this.listaProcesadas)

      let mazo= this.generarMazoHs(armadores)

      const datosProcesados = this.Buscar.casosDePrueba(mazo)
      console.log("Datos Procesados:", datosProcesados);
      this.datosProcesados.next(datosProcesados);

    }

    public getListaMazo() {
      return this.listaProcesadas.asObservable();
    }
    public getResultados() {
      return this.datosProcesados.asObservable();
    }
}