import { CountryList } from './../../shared/models/country-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/shared/models/country';
import apiKey from '../apiKey';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  getCountryDetails(countryId: number) {
    return this.http.get<Country>(apiKey.api + `/country/${countryId}`);
  }
  getAllCountries() {
    return this.http.get<Country[]>(apiKey.api + `/api/v1/data/country/list`);
  }
  getAllCordenates() {
    return this.http.get<Country[]>(apiKey.api + `/country/coordenates`);
  }
  getCoordenates(countryId: number) {
    return this.http.get<Country>(
      apiKey.api + `/country/coordenates/${countryId}`
    );
  }
  getHistoricDataCountries(page: number, size: number) {
    return this.http.get<CountryList[]>(
      apiKey.api +
        `/api/v1/data/country/historic/list?page=${
          (page - 1) * size
        }&size=${size}`
    );
  }
  getCumulativeDataCountries(page: number, size: number) {
    return this.http.get<CountryList[]>(
      apiKey.api +
        `/api/v1/data/country/cumulative/list?page=${
          (page - 1) * size
        }&size=${size}`
    );
  }
  getWorldTotalData() {
    return this.http.get<number>(
      apiKey.api + `/api/v1/data/country/world/total`
    );
  }
}
