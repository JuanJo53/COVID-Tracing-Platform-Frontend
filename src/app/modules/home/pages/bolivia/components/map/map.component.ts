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

  circleDisplayType = 'confirmed';

  confirmed: any[];
  deaths: any[];
  recovered: any[];
  vaccined: any[];

  constructor(private municipalityService: MunicipalityService) {}
  circles;
  ngOnInit(): void {
    console.log(this.depto);

    this.myMap = Leaflet.map('map');
    this.setMapLoc(this.depto.longitude, this.depto.latitude, 7);
    this.getMunicipalities();
  }
  getMunicipalities() {
    this.confirmed = [];
    this.municipalityService
      .getAllDepartmentMunicipalities(this.depto.iso)
      .subscribe((munis) => {
        console.log(munis);
        this.municipalities = munis;
        this.municipalities.forEach((municip) => {
          this.confirmed.push(
            this.addCircles(
              municip.latitude,
              municip.longitude,
              municip.confirmed,
              '#999999'
            )
          );
          this.circles = Leaflet.layerGroup(this.confirmed);
          this.myMap.addLayer(this.circles);
        });
      });
  }
  changeData() {
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.vaccined = [];

    this.myMap.removeLayer(this.circles);
    if (this.circleDisplayType == 'confirmed') {
      console.log(this.circleDisplayType);
      this.municipalities.forEach((municip) => {
        this.confirmed.push(
          this.addCircles(
            municip.latitude,
            municip.longitude,
            municip.confirmed,
            '#999999'
          )
        );
        this.circles = Leaflet.layerGroup(this.confirmed);
        this.myMap.addLayer(this.circles);
      });
    } else if (this.circleDisplayType == 'deaths') {
      this.municipalities.forEach((municip) => {
        this.deaths.push(
          this.addCircles(
            municip.latitude,
            municip.longitude,
            municip.deaths,
            'red'
          )
        );
        this.circles = Leaflet.layerGroup(this.deaths);
        this.myMap.addLayer(this.circles);
      });
    } else if (this.circleDisplayType == 'recovered') {
      this.municipalities.forEach((municip) => {
        this.recovered.push(
          this.addCircles(
            municip.latitude,
            municip.longitude,
            municip.recovered,
            'green'
          )
        );
        this.circles = Leaflet.layerGroup(this.recovered);
        this.myMap.addLayer(this.circles);
      });
    } else if (this.circleDisplayType == 'vaccined') {
      this.municipalities.forEach((municip) => {
        this.vaccined.push(
          this.addCircles(
            municip.latitude,
            municip.longitude,
            municip.vacined,
            'blue'
          )
        );
        this.circles = Leaflet.layerGroup(this.vaccined);
        this.myMap.addLayer(this.circles);
      });
    }
  }
  setMapLoc(lng, lat, zoom) {
    const location = {
      coords: new Leaflet.LatLng(lat, lng),
      zoom: zoom,
      layers: [this.confirmed, this.deaths, this.recovered, this.vaccined],
    };
    Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(this.myMap);
    this.myMap.setView(location.coords, location.zoom);
  }
  addCircles(lat: number, lng: number, volume: number, color: string): any {
    var circle = Leaflet.circle([lat, lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      radius: volume * 5,
    });
    var detail = document.getElementById('detail');
    circle.bindPopup(detail);
    return circle;
  }
  removeCircles(lat: number, lng: number, volume: number, color: string): any {
    var circle = Leaflet.circle([lat, lng], {
      fillOpacity: 0.5,
      radius: volume * 5,
    }).remove();
    return circle;
  }
}
