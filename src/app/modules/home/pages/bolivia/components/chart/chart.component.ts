import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Department } from 'src/app/shared/models/department';
import { DepartmentList } from 'src/app/shared/models/department-list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() depto: Department;
  data: DepartmentList[];
  confirmed: number[];
  recovered: number[];
  deaths: number[];
  vaccined1: number[];
  vaccined2: number[];

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

  constructor(
    private deptoService: DepartmentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fectchCumulativeData(1);
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
        // this.dataSource = new MatTableDataSource(this.data);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
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

        // this.dataSource = new MatTableDataSource(this.data);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      });
  }
  refreshDataType() {
    if (this.dataType == 'acumulated') {
      this.fectchCumulativeData(this.actualPage + 1);
    } else {
      this.fectchHistoricData(this.actualPage + 1);
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

  public download(): void {
    // Only Change 3 values
    this.chartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40,
    ];
  }
}
