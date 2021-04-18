import { Component, Input, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Bolivia } from 'src/app/shared/models/bolivia';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-bolivia-page',
  templateUrl: './bolivia-page.component.html',
  styleUrls: ['./bolivia-page.component.scss'],
})
export class BoliviaPageComponent implements OnInit {
  deptos: Department[];
  bolivia: Bolivia = {
    id: 1,
    department: 'string',
    iso: 'BOL',
    confirmed: 1,
    deaths: 1,
    recovered: 1,
    vacined: 1,
    latitude: 1,
    longitude: 1,
    zoom: 1,
  };

  displayedColumns = ['Fecha', 'Casos Confirmados', 'Muertes', 'Recuperados'];

  mapReady = false;

  selectedView = 'table';

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe((deptos) => {
      console.log(deptos);
      this.deptos = deptos;
    });
  }
  refreshDataView(): void {
    if (this.selectedView == 'map') {
      this.mapReady = true;
    } else {
      this.mapReady = false;
    }
  }
}
