import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @Input() depto: Department;

  displayedColumns = [
    'Fecha',
    'Casos Confirmados',
    'Muertes',
    'Recuperados',
    'Vacunados 1ra Dosis',
    'Vacunados 2da Dosis',
  ];

  mapReady = false;

  selectedView = 'table';

  constructor() {}

  ngOnInit(): void {
    this.refreshDataView();
  }

  refreshDataView(): void {
    if (this.selectedView == 'map') {
      this.mapReady = true;
    } else {
      this.mapReady = false;
    }
  }
}
