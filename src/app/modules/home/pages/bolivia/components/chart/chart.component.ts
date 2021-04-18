import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Department } from 'src/app/shared/models/department';
import { DepartmentList } from 'src/app/shared/models/department-list';
import { DatePipe } from '@angular/common';
import { BoliviaService } from 'src/app/core/http/bolivia.service';
import { BoliviaData } from 'src/app/shared/models/bolivia-data-list';
import * as zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() depto: Department;
  @Input() type: string;

  dataBol: BoliviaData[];
  data: DepartmentList[];

  confirmed: number[];
  recovered: number[];
  deaths: number[];
  vaccined1: number[];
  vaccined2: number[];

  isLoadingResults = true;

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
    private deptoService: DepartmentService,
    private datePipe: DatePipe,
    private boliviaService: BoliviaService
  ) {}

  ngOnInit(): void {
    if (this.type == 'department') {
      this.fectchCumulativeData(1);
    } else if (this.type == 'bolivia') {
      this.fetchBoliviaDataCumulated(1);
    }
  }
  fetchBoliviaDataHistoric(page: number) {
    this.dataBol = [];
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.vaccined1 = [];
    this.vaccined2 = [];
    this.chartLabels = [];
    this.chartData = [];

    this.isLoadingResults = true;

    this.boliviaService
      .getBoliviaHistoricData(page, this.size)
      .subscribe((data) => {
        this.dataBol = data;
        console.log(data);
        this.dataBol.forEach((elem) => {
          this.confirmed.push(elem.confirmed);
          this.deaths.push(elem.deaths);
          this.recovered.push(elem.recovered);
          this.chartLabels.push(
            this.datePipe.transform(elem.dateCountry, 'dd-MM-yyyy')
          );
        });
        this.chartData = [
          { data: this.confirmed, label: 'Casos Confirmados' },
          { data: this.deaths, label: 'Muertes' },
          { data: this.recovered, label: 'Recuperados' },
        ];
        this.isLoadingResults = false;
      });
  }
  fetchBoliviaDataCumulated(page: number) {
    this.dataBol = [];
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.vaccined1 = [];
    this.vaccined2 = [];
    this.chartLabels = [];
    this.chartData = [];

    this.isLoadingResults = true;

    this.boliviaService
      .getBoliviaCumulativeData(page, this.size)
      .subscribe((data) => {
        this.dataBol = data;
        console.log(data);
        this.dataBol.forEach((elem) => {
          this.confirmed.push(elem.confirmed);
          this.deaths.push(elem.deaths);
          this.recovered.push(elem.recovered);
          this.vaccined1.push(elem.firstVaccine);
          this.vaccined2.push(elem.secondVaccine);
          this.chartLabels.push(
            this.datePipe.transform(elem.dateCountry, 'dd-MM-yyyy')
          );
        });
        this.chartData = [
          { data: this.confirmed, label: 'Casos Confirmados' },
          { data: this.deaths, label: 'Muertes' },
          { data: this.recovered, label: 'Recuperados' },
          { data: this.vaccined1, label: 'Vacuna 1ra Dosis' },
          { data: this.vaccined2, label: 'Vacuna 2da Dosis' },
        ];
        this.isLoadingResults = false;
      });
  }
  fectchHistoricData(page: number): void {
    this.data = [];
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.vaccined1 = [];
    this.vaccined2 = [];
    this.chartLabels = [];
    this.chartData = [];

    this.isLoadingResults = true;

    this.deptoService
      .getDepartmentHistoricData(this.depto.iso, page, this.size)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
        this.data.forEach((elem) => {
          this.confirmed.push(elem.confirmed);
          this.deaths.push(elem.deaths);
          this.recovered.push(elem.recovered);
          this.chartLabels.push(
            this.datePipe.transform(elem.date, 'dd-MM-yyyy')
          );
        });
        this.chartData = [
          { data: this.confirmed, label: 'Casos Confirmados' },
          { data: this.deaths, label: 'Muertes' },
          { data: this.recovered, label: 'Recuperados' },
        ];

        this.isLoadingResults = false;
      });
  }
  fectchCumulativeData(page: number): void {
    this.data = [];
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.vaccined1 = [];
    this.vaccined2 = [];
    this.chartLabels = [];
    this.chartData = [];

    this.isLoadingResults = true;

    this.deptoService
      .getDepartmentAcumulativeData(this.depto.iso, page, this.size)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
        this.data.forEach((elem) => {
          this.confirmed.push(elem.confirmed);
          this.deaths.push(elem.deaths);
          this.recovered.push(elem.recovered);
          this.vaccined1.push(elem.firstVaccine);
          this.vaccined2.push(elem.secondVaccine);
          this.chartLabels.push(
            this.datePipe.transform(elem.date, 'dd-MM-yyyy')
          );
        });
        this.chartData = [
          { data: this.confirmed, label: 'Casos Confirmados' },
          { data: this.deaths, label: 'Muertes' },
          { data: this.recovered, label: 'Recuperados' },
          { data: this.vaccined1, label: 'Vacunados 1ra Dosis' },
          { data: this.vaccined2, label: 'Vacunados 2da Dosis' },
        ];

        this.isLoadingResults = false;
      });
  }
  refreshDataType() {
    if (this.type == 'department') {
      if (this.dataType == 'acumulated') {
        this.fectchCumulativeData(this.actualPage + 1);
      } else {
        this.fectchHistoricData(this.actualPage + 1);
      }
    } else if (this.type == 'bolivia') {
      if (this.dataType == 'acumulated') {
        this.fetchBoliviaDataCumulated(this.actualPage + 1);
      } else {
        this.fetchBoliviaDataHistoric(this.actualPage + 1);
      }
    }
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
