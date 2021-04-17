import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
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
  displayedColumns = ['date', 'country', 'cumulativeConfirmed'];

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

  selectedView = 'map';

  constructor(private worldService: CountryService) {}

  ngOnInit(): void {
    this.refreshDataView();
    this.fetchCountryNames();
  }
  fetchCountryNames() {
    this.countries = [];
    this.countryNames = [];
    this.worldService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
      console.log(this.countries);
      countries.forEach((country) => {
        this.countryNames.push(country.country);
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
