import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Leaflet from 'leaflet';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-world-page',
  templateUrl: './world-page.component.html',
  styleUrls: ['./world-page.component.scss'],
})
export class WorldPageComponent implements OnInit {
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
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
    { name: 'Calcium', description: 'HOLi' },
  ];
  displayedColumns = ['description', 'name'];

  chartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 560], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90, 500], label: 'Series B' },
    {
      data: [180, 480, 770, 90, 1000, 270, 400, 100],
      label: 'Series C',
    },
  ];
  chartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  chartType: ChartType = 'line';

  selected = 'general';

  mapReady = false;

  selectedView = 'chart';

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
