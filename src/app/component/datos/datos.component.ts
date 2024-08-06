import { Component, OnInit } from '@angular/core';
import { Resultados } from '../../../models/resultados.model';
import { Procesador } from '../../procesador';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent {
  datosProcesados: Resultados[] = [];

  constructor(private Procesador:Procesador){}

  onInit(): void {
    this.Procesador.datosProcesados$.subscribe(data => {
      this.datosProcesados = data;
    });
  }

}
