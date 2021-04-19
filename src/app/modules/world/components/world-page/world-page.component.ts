import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/core/http/country.service';
import { Country } from 'src/app/shared/models/country';
import { WorldDetail } from 'src/app/shared/models/world-detail';

@Component({
  selector: 'app-world-page',
  templateUrl: './world-page.component.html',
  styleUrls: ['./world-page.component.scss'],
})
export class WorldPageComponent implements OnInit {
  countries: Country[];
  countryNames: string[];
  worldDetail: WorldDetail;
  displayedColumns = ['Fecha', 'Casos Confirmados', 'Muertes'];

  selected = 'general';

  mapReady = false;

  selectedView = 'map';

  constructor(private worldService: CountryService) {}

  ngOnInit(): void {
    this.fetchWorldDetail();
    this.fetchCountryNames();
  }
  fetchCountryNames() {
    this.countries = [];
    this.countryNames = [];
    this.worldService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
      countries.forEach((country) => {
        this.countryNames.push(country.country);
        this.refreshDataView();
      });
    });
  }
  fetchWorldDetail() {
    this.worldService.getWorldTotalDetail().subscribe((detail) => {
      this.worldDetail = detail;
    });
  }
  refreshDataView(): void {
    if (this.selectedView == 'map') {
      this.mapReady = true;
    } else {
      this.mapReady = false;
    }
  }
}
