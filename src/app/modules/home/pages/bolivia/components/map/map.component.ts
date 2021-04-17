import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/shared/models/department';
import * as Leaflet from 'leaflet';
import { Municipality } from 'src/app/shared/models/municipality';
import { MunicipalityService } from 'src/app/core/http/municipality.service';
import { DecimalPipe } from '@angular/common';

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
  circles;

  confirmed: any[];
  deaths: any[];
  recovered: any[];
  vaccined: any[];

  constructor(
    private municipalityService: MunicipalityService,
    private _decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    console.log(this.depto);

    this.myMap = Leaflet.map('map');
    this.setMapLoc(this.depto.longitude, this.depto.latitude, 7); //needs zoom
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
            this.addCircles(municip, municip.confirmed, '#999999')
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
          this.addCircles(municip, municip.confirmed, '#999999')
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
    var circle = Leaflet.circle(
      [municipality.latitude, municipality.longitude],
      {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: volume * 5,
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
}
