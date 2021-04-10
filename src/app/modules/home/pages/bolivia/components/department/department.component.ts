import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @Input() depto: Department;
  deptos: Department[] = [
    { name: 'Hydrogen', description: 'HOLA' },
    { name: 'Helium', description: 'HOLo' },
    { name: 'Lithium', description: 'HOLi' },
    { name: 'Beryllium', description: 'HOLi' },
    { name: 'Boron', description: 'HOLi' },
    { name: 'Carbon', description: 'HOLi' },
    { name: 'Nitrogen', description: 'HOLi' },
    { name: 'Oxygen', description: 'HOLi' },
    { name: 'Fluorine', description: 'HOLi' },
    { name: 'Sodium', description: 'HOLi' },
    { name: 'Magnesium', description: 'HOLi' },
    { name: 'Aluminum', description: 'HOLi' },
    { name: 'Silicon', description: 'HOLi' },
    { name: 'Phosphoru', description: 'HOLi' },
    { name: 'Sulfur', description: 'HOLi' },
    { name: 'Chlorine', description: 'HOLi' },
    { name: 'Argon', description: 'HOLi' },
    { name: 'Potassium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
  ];
  displayedColumns = ['id', 'name'];
  selected = 'general';
  constructor() {}

  ngOnInit(): void {}
}
