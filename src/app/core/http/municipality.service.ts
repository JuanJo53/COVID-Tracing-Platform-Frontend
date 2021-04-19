import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipality } from 'src/app/shared/models/municipality';
import apiKey from '../apiKey';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class MunicipalityService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  getAllDepartmentMunicipalities(deptoIso: string) {
    return this.http.get<Municipality[]>(
      apiKey.api + `/api/v1/data/municipality/BOL/${deptoIso}/list`
    );
  }
}
