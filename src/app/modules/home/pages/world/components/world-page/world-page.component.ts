import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/core/http/country.service';
import { Country } from 'src/app/shared/models/country';

@Component({
  selector: 'app-world-page',
  templateUrl: './world-page.component.html',
  styleUrls: ['./world-page.component.scss'],
})
export class WorldPageComponent implements OnInit {
  countries: Country[];
  countryNames: string[];
  displayedColumns = ['Fecha', 'Casos Confirmados', 'Muertes'];

  selected = 'general';

  mapReady = false;

  selectedView = 'map';

  constructor(private worldService: CountryService) {}

  ngOnInit(): void {
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
  refreshDataView(): void {
    if (this.selectedView == 'map') {
      this.mapReady = true;
    } else {
      this.mapReady = false;
    }
  }
}
