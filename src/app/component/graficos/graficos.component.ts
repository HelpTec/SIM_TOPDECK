import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css'
})
export class GraficosComponent implements OnInit {

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart(): void {
    const data = google.visualization.arrayToDataTable([
      ['Day', 'Sales'],
      ['Mon', 30],
      ['Tue', 40],
      ['Wed', 35],
      ['Thu', 50],
      ['Fri', 49],
      ['Sat', 60],
      ['Sun', 70]
    ]);

    const options = {
      title: 'Sales Data',
      hAxis: { title: 'Day' },
      vAxis: { title: 'Sales' },
      legend: 'none'
    };

    const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
}
