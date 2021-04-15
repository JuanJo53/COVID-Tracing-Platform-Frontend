import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/models/department';
import * as Leaflet from 'leaflet';
import { Municipality } from 'src/app/shared/models/municipality';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() depto: Department;
  @Input() municipalities: Municipality[];

  myMap: Leaflet.Map;

  constructor() {}

  ngOnInit(): void {
    this.myMap = Leaflet.map('map');
    const location = {
      coords: new Leaflet.LatLng(this.depto.longitude, this.depto.latitude),
      zoom: this.depto.zoom,
    };
    Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(this.myMap);
    this.myMap.setView(location.coords, location.zoom);
    // this.municipalities.forEach((municip) => {
    //   this.addCircles(municip.latitude, municip.longitude);
    // });
  }
  addCircles(lat: number, lng: number): void {
    var circle = Leaflet.circle([lng, lat], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50000,
    }).addTo(this.myMap);
    circle.bindPopup('I am a circle.');
  }
}
