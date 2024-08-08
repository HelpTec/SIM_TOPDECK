import { Injectable } from '@angular/core';
import { Mazo } from '../models/mazo.model';
import { CartaHs } from '../models/cartaHs';
import { HsService } from './hs.service';
import { BuscadorService } from './buscador.service';
import { Armador } from '../models/armador';
import { BehaviorSubject } from 'rxjs';
import { Resultados } from '../models/resultados.model';
import { Promedios } from '../models/promedios.model';

@Injectable({
  providedIn: 'root'
})
export class Procesador {
  private listaProcesadas = new BehaviorSubject<Armador[]>([]);
  private datosProcesados = new BehaviorSubject<Resultados[]>([]);

/*  private carta = new CartaHs(0,'','',false);
  private promedio = new Promedios(0,0,0,0,0)
  private listaMazo = new BehaviorSubject<Armador>({
    tipo:'',
    comunes: 0,
    comunesPares: 0,
    raras: 0,
    rarasPares: 0,
    epicas: 0,
    epicasPares: 0,
    legendarias: 0,
    clase: false,
    total: 0
});
  listaProcesada$ = this.listaMazo.asObservable();
  private sujetoResultadoProcesado = new BehaviorSubject<Resultados>(new Resultados(
    this.carta,
    this.promedio
  ));
  datosProcesados$ = this.sujetoResultadoProcesado.asObservable();
*/
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
      const listaProcesada = armadores;
      this.listaProcesadas.next(listaProcesada);
      let mazo= this.generarMazoHs(armadores)
      const datosProcesados = this.Buscar.casosDePrueba(mazo)
      this.datosProcesados.next(datosProcesados);

      /*const datosProcesados = this.Buscar.casosDePrueba(this.generarMazoHs(armadores))
      this.sujetoResultadoProcesado.next(datosProcesados);*/
    }

    public getListaMazo() {
      return this.listaProcesadas.asObservable();
    }
    public getResultados() {
      return this.datosProcesados.asObservable();
    }
}