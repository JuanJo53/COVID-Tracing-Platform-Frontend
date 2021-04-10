import { Component, Input, OnInit } from '@angular/core';
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
      name: 'La Paz',
      description: 'La Paz descripcion',
    },
    {
      name: 'Cocha',
      description: 'Cocha descripcion',
    },
    {
      name: 'SC',
      description: 'SC descripcion',
    },
    {
      name: 'Beni',
      description: 'Beni descripcion',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
