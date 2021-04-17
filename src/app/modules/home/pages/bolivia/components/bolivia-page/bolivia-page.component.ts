import { Component, Input, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-bolivia-page',
  templateUrl: './bolivia-page.component.html',
  styleUrls: ['./bolivia-page.component.scss'],
})
export class BoliviaPageComponent implements OnInit {
  deptos: Department[];

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
