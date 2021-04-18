import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoliviaData } from 'src/app/shared/models/bolivia-data-list';
import { BoliviaVaccineData } from 'src/app/shared/models/bolivia-vaccine-data';
import apiKey from '../apiKey';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class BoliviaService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  getBoliviaData() {
    return this.http.get<BoliviaData[]>(
      apiKey.api + `/api/v1/data/country/BOL/listhistoric`
    );
  }
  getBoliviaDataVaccine() {
    return this.http.get<BoliviaVaccineData[]>(
      apiKey.api + `/api/v1/data/country/BOL/listhistoric/vaccine`
    );
  }
  getBoliviaDetails() {
    return this.http.get<BoliviaVaccineData[]>(
      apiKey.api + `/country/coordenates`
    );
  }
  getBoliviaTotal() {
    return this.http.get<number>(apiKey.api + `/country/coordenates/`);
  }
}