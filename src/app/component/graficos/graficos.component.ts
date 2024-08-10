import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Resultados } from '../../../models/resultados.model';
import { Procesador } from '../../procesador';
import { Armador } from '../../../models/armador';
declare var google: any;

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css'
})
export class GraficosComponent implements OnInit {
  datosProcesados: Resultados[] = [];
  listaprocesada: Armador[] = [];

  constructor(private Procesador:Procesador){}

  ngOnInit(): void {
    this.Procesador.getResultados().subscribe(data => {
      this.datosProcesados = data;
    });
    this.Procesador.getListaMazo().subscribe(dato => {
      this.listaprocesada = dato;
      this.drawChart()
    });
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart(): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Tipo');
    data.addColumn('number', 'Común');
    data.addColumn('number', 'Rara');
    data.addColumn('number', 'Épica');
    data.addColumn('number', 'Legendaria');
    for (let i = 0; i < this.listaprocesada.length; i++) {
      data.addRows([
      [this.listaprocesada[i].tipo,
      this.listaprocesada[i].comunes+this.listaprocesada[i].comunesPares,
      this.listaprocesada[i].raras+this.listaprocesada[i].rarasPares,
      this.listaprocesada[i].epicas+this.listaprocesada[i].epicasPares,
      this.listaprocesada[i].legendarias]]);}


    const options = {
      title: 'Composicion del Mazo',
      hAxis: { title: 'Cartas' },
      vAxis: { title: 'Tipos' },
      legend: 'Cada color indica su rareza'
    };

    const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
  }
