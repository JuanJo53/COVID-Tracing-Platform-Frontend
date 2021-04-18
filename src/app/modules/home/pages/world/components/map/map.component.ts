import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { isEmpty } from 'rxjs/operators';
import { CountryService } from 'src/app/core/http/country.service';
import { Country } from 'src/app/shared/models/country';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() countries: Country[];

  circleDisplayType = 'confirmed';
  circles;

  confirmed: any[];
  deaths: any[];
  recovered: any[];
  vaccined: any[];

  myMap: Leaflet.Map;

  constructor(
    private countryService: CountryService,
    private _decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.confirmed = [];
    this.myMap = Leaflet.map('worldMap');

    this.setMapLoc(19.0303499, 19.0303499, 3);

    this.countries.forEach((country) => {
      this.confirmed.push(
        this.addCircles(country, country.cumulativeConfirmed, 'blue')
      );
      this.circles = Leaflet.layerGroup(this.confirmed);
      this.myMap.addLayer(this.circles);
    });
  }
  ngAfterViewInit(): void {}
  changeData() {
    this.confirmed = [];
    this.deaths = [];
    this.recovered = [];
    this.vaccined = [];

    this.myMap.removeLayer(this.circles);

    if (this.circleDisplayType == 'confirmed') {
      this.countries.forEach((country) => {
        this.confirmed.push(
          this.addCircles(country, country.cumulativeConfirmed, 'blue')
        );
        this.circles = Leaflet.layerGroup(this.confirmed);
        this.myMap.addLayer(this.circles);
      });
    } else if (this.circleDisplayType == 'deaths') {
      this.countries.forEach((country) => {
        this.deaths.push(
          this.addCircles(country, country.cumulativeDeaths, 'red')
        );
        this.circles = Leaflet.layerGroup(this.deaths);
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
  addCircles(country: Country, volume: number, color: string): any {
    let resizedRadius = 0;
    if (volume > 10000000) {
      resizedRadius = volume * 0.04;
    } else if (volume > 1000000) {
      resizedRadius = volume / (volume * 0.5);
    } else if (volume > 500000) {
      resizedRadius = volume;
    } else if (volume > 100000) {
      resizedRadius = volume * 2;
    } else {
      resizedRadius = volume * 5;
    }
    const circle = Leaflet.circle([country.latitude, country.longitude], {
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      radius: resizedRadius,
    });

    const detail = `<div id="detail" style="
    width: 100%;
    height: 100%;">
    <h1>${country.country}</h1>
    <br />
    <div style="
    text-align: center;
    display: inline-flex;">
      <h3>Confirmados:</h3>
      <span style="
      background-color: blue;
      border-radius: 3px;
      margin-left: 10px;
      padding: 3px;" id="confirmed">${this._decimalPipe.transform(
        country.cumulativeConfirmed
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
      padding: 3px;">${this._decimalPipe.transform(
        country.cumulativeDeaths
      )}</span>
    </div>
    <br />
  </div>`;
    circle.bindPopup(detail);

    return circle;
  }
}
