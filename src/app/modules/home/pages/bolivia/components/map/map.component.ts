import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/models/department';
import * as Leaflet from 'leaflet';
import { Municipality } from 'src/app/shared/models/municipality';
import { MunicipalityService } from 'src/app/core/http/municipality.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() depto: Department;
  @Input() municipalities: Municipality[];

  myMap: Leaflet.Map;

  constructor(private municipalityService: MunicipalityService) {}

  ngOnInit(): void {
    console.log(this.depto);

    this.myMap = Leaflet.map('map');
    this.setMapLoc(this.depto.longitude, this.depto.latitude, 7);
    this.getMunicipalities();
  }
  getMunicipalities() {
    this.municipalityService
      .getAllDepartmentMunicipalities(this.depto.iso)
      .subscribe((munis) => {
        console.log(munis);
        this.municipalities = munis;
        this.municipalities.forEach((municip) => {
          this.addCircles(
            municip.latitude,
            municip.longitude,
            municip.confirmed
          );
        });
      });
  }
  setMapLoc(lng, lat, zoom) {
    const location = {
      coords: new Leaflet.LatLng(lat, lng),
      zoom: zoom,
    };
    Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(this.myMap);
    this.myMap.setView(location.coords, location.zoom);
  }
  addCircles(lat: number, lng: number, volume: number): void {
    var circle = Leaflet.circle([lat, lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: volume * 5,
    }).addTo(this.myMap);
    var detail = document.getElementById('detail');
    circle.bindPopup(detail);
  }
}
