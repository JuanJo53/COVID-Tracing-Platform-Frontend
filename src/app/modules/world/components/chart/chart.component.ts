import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';
import { Country } from 'src/app/shared/models/country';
import { CountryList } from 'src/app/shared/models/country-list';
import { CountryService } from 'src/app/core/http/country.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  initialDate: string;
  finalDate: string;

  isLoadingResults = true;

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

  dateRange: FormGroup;
  startDate: string;
  endDate: string;

  constructor(
    private worldService: CountryService,
    private datePipe: DatePipe
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.dateRange = new FormGroup({
      start: new FormControl(new Date(2020, 5, 1)),
      end: new FormControl(new Date(year, month, 30)),
    });
  }

  ngOnInit(): void {
    this.refreshDataType();
  }
  getDateRange() {
    const startDate = this.dateRange.get('start').value;
    const endDate = this.dateRange.get('end').value;
    const date = new Date(endDate);
    date.setDate(date.getDate() + 1);
    this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  fectchHistoricData(): void {
    this.confirmed = [];
    this.deaths = [];
    // this.recovered = [];
    this.chartLabels = [];
    this.chartData = [];

    this.isLoadingResults = true;

    this.worldService
      .getHistoricDataCountries(this.startDate, this.endDate)
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
        this.isLoadingResults = false;
      });
  }
  fectchCumulativeData(): void {
    this.data = [];
    this.confirmed = [];
    this.deaths = [];
    // this.recovered = [];
    this.chartLabels = [];
    this.chartData = [];

    this.isLoadingResults = true;

    this.worldService
      .getCumulativeDataCountries(this.startDate, this.endDate)
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
        this.isLoadingResults = false;
      });
  }
  refreshDataType() {
    this.getDateRange();
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
