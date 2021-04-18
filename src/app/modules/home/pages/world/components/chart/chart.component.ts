import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';
import { Country } from 'src/app/shared/models/country';
import { CountryList } from 'src/app/shared/models/country-list';
import { CountryService } from 'src/app/core/http/country.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() countries: Country[];
  data: CountryList[];
  confirmed: number[];
  // recovered: number[];
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

  constructor(
    private worldService: CountryService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fectchCumulativeData(1);
  }

  fectchHistoricData(page: number): void {
    this.confirmed = [];
    this.deaths = [];
    // this.recovered = [];
    this.chartLabels = [];
    this.chartData = [];

    this.worldService
      .getHistoricDataCountries(page, this.size)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
        this.data.forEach((elem) => {
          this.confirmed.push(elem.confirmed);
          this.deaths.push(elem.deaths);
          // this.recovered.push(elem.recovered);
          this.chartLabels.push(
            this.datePipe.transform(elem.date, 'dd-MM-yyyy')
          );
        });
        this.chartData = [
          { data: this.confirmed, label: 'Casos Confirmados' },
          { data: this.deaths, label: 'Muertes' },
          // { data: this.recovered, label: 'Recuperados' },
        ];
      });
  }
  fectchCumulativeData(page: number): void {
    this.data = [];
    this.confirmed = [];
    this.deaths = [];
    // this.recovered = [];
    this.chartLabels = [];
    this.chartData = [];

    this.worldService
      .getCumulativeDataCountries(page, this.size)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
        this.data.forEach((elem) => {
          this.confirmed.push(elem.confirmed);
          this.deaths.push(elem.deaths);
          this.chartLabels.push(
            this.datePipe.transform(elem.date, 'dd-MM-yyyy')
          );
        });
        this.chartData = [
          { data: this.confirmed, label: 'Casos Confirmados' },
          { data: this.deaths, label: 'Muertes' },
          // { data: this.recovered, label: 'Recuperados' },
        ];
      });
  }
  refreshDataType() {
    if (this.dataType == 'acumulated') {
      this.fectchCumulativeData(1);
    } else {
      this.fectchHistoricData(1);
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
