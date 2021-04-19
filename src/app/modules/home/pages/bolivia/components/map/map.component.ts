import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/models/department';
import * as Leaflet from 'leaflet';
import { Municipality } from 'src/app/shared/models/municipality';
import { MunicipalityService } from 'src/app/core/http/municipality.service';
import { DecimalPipe } from '@angular/common';
import { Bolivia } from 'src/app/shared/models/bolivia';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() depto: Department;
  @Input() bolivia: Bolivia;
  @Input() municipalities: Municipality[];
  @Input() deptos: Department[];
  @Input() type: string;

  myMap: Leaflet.Map;

  circleDisplayType = 'confirmed';
  circles;

  confirmed: any[];
  deaths: any[];
  recovered: any[];
  vaccined: any[];

  constructor(
    private municipalityService: MunicipalityService,
    private _decimalPipe: DecimalPipe
  ) {}

  mapZoom = 3;
  ngOnInit(): void {
    this.myMap = Leaflet.map('map');

    if (this.type == 'department') {
      this.setMapLoc(
        this.depto.longitude,
        this.depto.latitude,
        this.depto.zoom
      );
      this.getMunicipalities();
    } else if (this.type == 'bolivia') {
      this.setMapLoc(this.bolivia.longitude, this.bolivia.latitude, 6);
      this.confirmed = [];
      this.deptos.sort((a, b) => b.confirmed - a.confirmed);
      this.deptos.forEach((depto) => {
        this.confirmed.push(
          this.addCirclesDept(depto, depto.confirmed, '#313947')
        );
        this.circles = Leaflet.layerGroup(this.confirmed);
        this.myMap.addLayer(this.circles);
      });
    }
  }
  getMunicipalities() {
    this.confirmed = [];
    this.municipalityService
      .getAllDepartmentMunicipalities(this.depto.iso)
      .subscribe((munis) => {
        console.log(munis);
        this.municipalities = munis;
        this.municipalities.sort((a, b) => b.confirmed - a.confirmed);
        this.municipalities.forEach((municip) => {
          this.confirmed.push(
            this.addCircles(municip, municip.confirmed, '#313947')
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
    if (this.type == 'department') {
      if (this.circleDisplayType == 'confirmed') {
        this.municipalities.forEach((municip) => {
          this.confirmed.push(
            this.addCircles(municip, municip.confirmed, '#313947')
          );
          this.circles = Leaflet.layerGroup(this.confirmed);
          this.myMap.addLayer(this.circles);
        });
      } else if (this.circleDisplayType == 'deaths') {
        this.municipalities.forEach((municip) => {
          this.deaths.push(this.addCircles(municip, municip.deaths, 'red'));
          this.circles = Leaflet.layerGroup(this.deaths);
          this.myMap.addLayer(this.circles);
        });
      } else if (this.circleDisplayType == 'recovered') {
        this.municipalities.forEach((municip) => {
          this.recovered.push(
            this.addCircles(municip, municip.recovered, 'green')
          );
          this.circles = Leaflet.layerGroup(this.recovered);
          this.myMap.addLayer(this.circles);
        });
      } else if (this.circleDisplayType == 'vaccined') {
        this.municipalities.forEach((municip) => {
          this.vaccined.push(this.addCircles(municip, municip.vacined, 'blue'));
          this.circles = Leaflet.layerGroup(this.vaccined);
          this.myMap.addLayer(this.circles);
        });
      }
    } else if (this.type == 'bolivia') {
      if (this.circleDisplayType == 'confirmed') {
        this.deptos.forEach((depto) => {
          this.confirmed.push(
            this.addCirclesDept(depto, depto.confirmed, '#313947')
          );
          this.circles = Leaflet.layerGroup(this.confirmed);
          this.myMap.addLayer(this.circles);
        });
      } else if (this.circleDisplayType == 'deaths') {
        this.deptos.forEach((depto) => {
          this.deaths.push(this.addCirclesDept(depto, depto.deaths, 'red'));
          this.circles = Leaflet.layerGroup(this.deaths);
          this.myMap.addLayer(this.circles);
        });
      } else if (this.circleDisplayType == 'recovered') {
        this.deptos.forEach((depto) => {
          this.recovered.push(
            this.addCirclesDept(depto, depto.recovered, 'green')
          );
          this.circles = Leaflet.layerGroup(this.recovered);
          this.myMap.addLayer(this.circles);
        });
      }
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
  addCircles(municipality: Municipality, volume: number, color: string): any {
    const resizedRadius = 0.025 * (volume / this.mapZoom) ** 0.5;
    var circle = Leaflet.circle(
      [municipality.latitude, municipality.longitude],
      {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: volume * resizedRadius,
      }
    );
    const detail = `<div id="detail" style="
    width: 100%;
    height: 100%;">
    <h1>${municipality.municipality}</h1>
    <br />
    <div style="
    text-align: center;
    display: inline-flex;">
      <h3>Confirmados:</h3>
      <span style="
      background-color: black;
      border-radius: 3px;
      margin-left: 10px;
      padding: 3px;" id="confirmed">${this._decimalPipe.transform(
        municipality.confirmed
      )}
      </span>
    </div>
    <br />
    <div style="
    text-align: center;
    display: inline-flex;">
      <h3>Muertes:</h3>
      <span style="
      margin-left: 10px;
      padding: 3px;
      background-color: red;
      border-radius: 3px; 
      margin-left: 10px;
      padding: 3px;">${this._decimalPipe.transform(municipality.deaths)}</span>
    </div>
    <br />
    <div style="
    text-align: center;
    display: inline-flex;">
      <h3>Recuperados:</h3>
      <span style="
      margin-left: 10px;
      padding: 3px;
      background-color: green;
      border-radius: 3px;">${this._decimalPipe.transform(
        municipality.recovered
      )}</span>
    </div>
    <br />
  </div>`;
    circle.bindPopup(detail);
    // let popup=Leaflet.popup({

    // }).setPopupContent()
    return circle;
  }
  addCirclesDept(depto: Department, volume: number, color: string): any {
    const resizedRadius = 1000 * (volume / this.mapZoom) ** 0.5;
    var circle = Leaflet.circle([depto.latitude, depto.longitude], {
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      radius: resizedRadius,
    });
    const detail = `<div id="detail" style="
    width: 100%;
    height: 100%;">
    <h1>${depto.department}</h1>
    <br />
    <div style="
    text-align: center;
    display: inline-flex;">
      <h3>Confirmados:</h3>
      <span style="
      background-color: black;
      border-radius: 3px;
      margin-left: 10px;
      padding: 3px;" id="confirmed">${this._decimalPipe.transform(
        depto.confirmed
      )}
      </span>
    </div>
    <br />
    <div style="
    text-align: center;
    display: inline-flex;">
      <h3>Muertes:</h3>
      <span style="
      margin-left: 10px;
      padding: 3px;
      background-color: red;
      border-radius: 3px; 
      margin-left: 10px;
      padding: 3px;">${this._decimalPipe.transform(depto.deaths)}</span>
    </div>
    <br />
    <div style="
    text-align: center;
    display: inline-flex;">
      <h3>Recuperados:</h3>
      <span style="
      margin-left: 10px;
      padding: 3px;
      background-color: green;
      border-radius: 3px;">${this._decimalPipe.transform(
        depto.recovered
      )}</span>
    </div>
    <br />
  </div>`;
    circle.bindPopup(detail);
    // let popup=Leaflet.popup({

    // }).setPopupContent()
    return circle;
  }
}
