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
    return this.http.get<Country[]>(apiKey.api + `/country`);
  }
  getAllCordenates() {
    return this.http.get<Country[]>(apiKey.api + `/country/coordenates`);
  }
  getCoordenates(countryId: number) {
    return this.http.get<Country>(
      apiKey.api + `/country/coordenates/${countryId}`
    );
  }
}
