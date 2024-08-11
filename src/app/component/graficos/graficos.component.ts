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

    this.drawPieChart();
    this.drawLineChart();
    this.drawAreaChart();
    this.drawScatterChart();
    this.drawBubbleChart();
    this.drawDonutChart();
    this.drawHistogram();
    this.drawGaugeChart();
    this.drawCandlestickChart();
  }
  drawPieChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Category', 'Value'],
      ['A', 45],
      ['B', 26],
      ['C', 29]
    ]);

    const options = { title: 'Proporciones de Categorías', is3D: true };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  drawLineChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Time', 'Value'],
      ['2024-01', 1000],
      ['2024-02', 1170],
      ['2024-03', 660],
      ['2024-04', 1030]
    ]);

    const options = { title: 'Tendencia Mensual', curveType: 'function', legend: { position: 'bottom' } };

    const chart = new google.visualization.LineChart(document.getElementById('linechart'));
    chart.draw(data, options);
  }

  drawAreaChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Year', 'Sales'],
      ['2019', 1000],
      ['2020', 1170],
      ['2021', 660],
      ['2022', 1030]
    ]);

    const options = { title: 'Ventas Anuales', hAxis: { title: 'Año', titleTextStyle: { color: '#333' } }, vAxis: { minValue: 0 } };

    const chart = new google.visualization.AreaChart(document.getElementById('areachart'));
    chart.draw(data, options);
  }

  drawScatterChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Age', 'Height'],
      [8, 12],
      [4, 5.5],
      [11, 14],
      [4, 5],
      [3, 3.5],
      [6.5, 7]
    ]);

    const options = { title: 'Altura vs Edad', hAxis: { title: 'Edad' }, vAxis: { title: 'Altura' }, legend: 'none' };

    const chart = new google.visualization.ScatterChart(document.getElementById('scatterchart'));
    chart.draw(data, options);
  }

  drawBubbleChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['ID', 'X', 'Y', 'Size', 'Color'],
      ['A', 80, 167, 120, 30],
      ['B', 79, 136, 130, 50],
      ['C', 78, 184, 50, 60]
    ]);

    const options = { title: 'Relaciones Complejas', hAxis: { title: 'X Axis' }, vAxis: { title: 'Y Axis' }, bubble: { textStyle: { fontSize: 11 } } };

    const chart = new google.visualization.BubbleChart(document.getElementById('bubblechart'));
    chart.draw(data, options);
  }

  drawDonutChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Category', 'Value'],
      ['A', 45],
      ['B', 26],
      ['C', 29]
    ]);

    const options = { title: 'Proporciones de Categorías', pieHole: 0.4 };

    const chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  drawHistogram(): void {
    const data = google.visualization.arrayToDataTable([
      ['Dinosaur', 'Length'],
      ['Acrocanthosaurus', 12.2],
      ['Albertosaurus', 9.1],
      ['Allosaurus', 12.2],
      ['Apatosaurus', 22.9],
      ['Archaeopteryx', 0.5]
    ]);

    const options = { title: 'Distribución de Longitud de Dinosaurios', legend: { position: 'none' } };

    const chart = new google.visualization.Histogram(document.getElementById('histogram'));
    chart.draw(data, options);
  }

  drawGaugeChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Memory', 80],
      ['CPU', 55],
      ['Network', 68]
    ]);

    const options = { width: 400, height: 120, greenFrom: 0, greenTo: 70, yellowFrom: 70, yellowTo: 90, redFrom: 90, redTo: 100, minorTicks: 5 };

    const chart = new google.visualization.Gauge(document.getElementById('gaugechart'));
    chart.draw(data, options);
  }

  drawCandlestickChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Day', 'Low', 'Open', 'Close', 'High'],
      ['Mon', 20, 28, 38, 45],
      ['Tue', 31, 38, 55, 66],
      ['Wed', 50, 55, 77, 80],
      ['Thu', 77, 77, 66, 50],
      ['Fri', 68, 66, 22, 15]
    ]);

    const options = { title: 'Precios de la Semana', legend: 'none' };

    const chart = new google.visualization.CandlestickChart(document.getElementById('candlestickchart'));
    chart.draw(data, options);
  }

  }
