import { Component, Input, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/core/http/department.service';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-bolivia-page',
  templateUrl: './bolivia-page.component.html',
  styleUrls: ['./bolivia-page.component.scss'],
})
export class BoliviaPageComponent implements OnInit {
  // deptos: Department[];
  deptos: Department[] = [
    {
      id: 1,
      name: 'La Paz',
      iso: 'BO-L',
      confirmed: 1000,
      deaths: 1000,
      recovered: 1000,
      vacined: 1000,
      latitude: -68.15,
      longitude: -16.5,
      zoom: 7,
    },
    {
      id: 1,
      name: 'Pando',
      iso: 'BO-N',
      confirmed: 1000,
      deaths: 1000,
      recovered: 1000,
      vacined: 1000,
      latitude: -68.76918,
      longitude: -11.02671,
      zoom: 7,
    },
    {
      id: 1,
      name: 'Tarija',
      iso: 'BO-T',
      confirmed: 1000,
      deaths: 1000,
      recovered: 1000,
      vacined: 1000,
      latitude: -64.72956,
      longitude: -21.53549,
      zoom: 7,
    },
  ];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    // this.departmentService.getAllDepartments().subscribe((deptos) => {
    //   console.log(deptos);
    //   this.deptos = deptos;
    // });
  }
}
