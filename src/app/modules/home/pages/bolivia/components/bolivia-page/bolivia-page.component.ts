import { Component, Input, OnInit } from '@angular/core';
import { BoliviaService } from 'src/app/core/http/bolivia.service';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Bolivia } from 'src/app/shared/models/bolivia';
import { BoliviaData } from 'src/app/shared/models/bolivia-data-list';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-bolivia-page',
  templateUrl: './bolivia-page.component.html',
  styleUrls: ['./bolivia-page.component.scss'],
})
export class BoliviaPageComponent implements OnInit {
  deptos: Department[];
  data: BoliviaData[];
  bolivia: Bolivia;

  displayedColumns = [
    'Fecha',
    'Casos Confirmados',
    'Muertes',
    'Recuperados',
    'Vacunados 1ra Dosis',
    'Vacunados 2da Dosis',
  ];

  mapReady = false;
  dataReady = false;

  selectedView = 'table';

  constructor(
    private departmentService: DepartmentService,
    private boliviaService: BoliviaService
  ) {}

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchBoliviaDataHistoric();
    this.getBoliviaDataCumulated();
    this.getBoliviaDetails();
  }
  fetchDepartments() {
    this.departmentService.getAllDepartments().subscribe((deptos) => {
      console.log(deptos);
      this.deptos = deptos;
    });
  }
  fetchBoliviaDataHistoric() {
    this.boliviaService.getBoliviaData().subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }
  getBoliviaDataCumulated() {
    this.boliviaService.getBoliviaDataVaccine().subscribe((data) => {
      this.data.forEach((d) => {
        data.forEach((d1) => {
          if (d1.dateCountry == d.dateCountry) {
            d['firstVaccine'] = d1.firstVaccine;
            d['secondVaccine'] = d1.secondVaccine;
          }
        });
      });
      console.log(this.data);
    });
  }
  getBoliviaDetails() {
    this.boliviaService.getBoliviaDetails().subscribe((bol) => {
      this.bolivia = bol;
      if (Object.keys(this.bolivia).length > 0) {
        this.dataReady = true;
      } else {
        this.dataReady = false;
      }
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
