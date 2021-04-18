import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';
import { Country } from 'src/app/shared/models/country';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() countries: Country[];
  confirmed: number[];
  recovered: number[];
  deaths: number[];

  length = 12;
  size = 383;
  order = 'id';
  asc = true;
  actualPage = 0;

  dataType = 'acumulated';

  chartData: ChartDataSets[];
  chartLabels: Label[];

  public chartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno',
          },
        },
      ],
    },
  };

  public chartLegend = true;
  public lineChartPlugins = [zoomPlugin];

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fectchCumulativeData();
  }

  fectchHistoricData(): void {
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.chartLabels = [];
    this.chartData = [];

    this.countries.forEach((elem) => {
      this.confirmed.push(elem.cumulativeConfirmed);
      this.deaths.push(elem.cumulativeDeaths);
      this.chartLabels.push(this.datePipe.transform(elem.date, 'dd-MM-yyyy'));
    });
    this.chartData = [
      { data: this.confirmed, label: 'Casos Confirmados' },
      { data: this.deaths, label: 'Muertes' },
      // { data: this.recovered, label: 'Recuperados' },
    ];
  }
  fectchCumulativeData(): void {
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.chartLabels = [];
    this.chartData = [];

    this.countries.forEach((elem) => {
      this.confirmed.push(elem.cumulativeConfirmed);
      this.deaths.push(elem.cumulativeDeaths);
      this.chartLabels.push(this.datePipe.transform(elem.date, 'dd-MM-yyyy'));
    });
    this.chartData = [
      { data: this.confirmed, label: 'Casos Confirmados' },
      { data: this.deaths, label: 'Muertes' },
    ];
  }
  refreshDataType() {
    if (this.dataType == 'acumulated') {
      this.fectchCumulativeData();
    } else {
      this.fectchHistoricData();
    }
  }

  // events
  chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }
}
