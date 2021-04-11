import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/models/department';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() depto: Department;

  myMap: Leaflet.Map;

  constructor() {}

  ngOnInit(): void {
    this.myMap = Leaflet.map('map');
    const location = {
      coords: new Leaflet.LatLng(-16.2419521, -64.0511615),
      zoom: 6,
    };
    Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(this.myMap);
    this.myMap.setView(location.coords, location.zoom);
    this.addCircles();
  }
  addCircles(): void {
    var circle = Leaflet.circle([-16.2419521, -64.0511615], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50000,
    }).addTo(this.myMap);
    circle.bindPopup('I am a circle.');
  }
}
