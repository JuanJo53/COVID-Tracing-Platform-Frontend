import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'src/app/shared/models/department';
import apiKey from '../apiKey';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  getDepartmentAcumulativeData(deptoId: string, page: number, size: number) {
    return this.http.get<Department[]>(
      apiKey.api +
        `api/v1/data/department/${deptoId}/cumulative/list?page=${page}&size=${size}`
    );
  }
  getDepartmentHistoricData(deptoId: string, page: number, size: number) {
    return this.http.get<Department[]>(
      apiKey.api +
        `api/v1/data/department/${deptoId}/historic/list?page=${page}&size=${size}`
    );
  }
  getAllDepartments() {
    return this.http.get<Department[]>(apiKey.api + `/country`);
  }
  getAllDepartmentCordenates() {
    return this.http.get<Department>(apiKey.api + `/country/coordenates`);
  }
  getDepartmentCoordenates(deptoId: number) {
    return this.http.get<Department>(
      apiKey.api + `/country/coordenates/${deptoId}`
    );
  }
}
