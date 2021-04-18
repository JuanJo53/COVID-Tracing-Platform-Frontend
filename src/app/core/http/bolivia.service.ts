import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bolivia } from 'src/app/shared/models/bolivia';
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
  getBoliviaHistoricData(page: number, size: number) {
    return this.http.get<BoliviaData[]>(
      apiKey.api +
        `/api/v1/data/country/BOL/historicList?page=${
          (page - 1) * size
        }&size=${size}`
    );
  }
  getBoliviaCumulativeData(page: number, size: number) {
    return this.http.get<BoliviaData[]>(
      apiKey.api +
        `/api/v1/data/country/BOL/historicList?page=${
          (page - 1) * size
        }&size=${size}`
    );
  }
  getBoliviaDetails() {
    return this.http.get<Bolivia>(
      apiKey.api + `/api/v1/data/country/BOL/general`
    );
  }
  getBoliviaTotal() {
    return this.http.get<number>(apiKey.api + `/country/coordenates/`);
  }
}
