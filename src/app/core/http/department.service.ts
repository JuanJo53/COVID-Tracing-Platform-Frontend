import { DepartmentList } from './../../shared/models/department-list';
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
    return this.http.get<DepartmentList[]>(
      apiKey.api +
        `/api/v1/data/department/${deptoId}/cumulative/list?page=${
          (page - 1) * size
        }&size=${size}`
    );
  }
  getDepartmentHistoricData(deptoId: string, page: number, size: number) {
    return this.http.get<DepartmentList[]>(
      apiKey.api +
        `/api/v1/data/department/${deptoId}/historic/list?page=${
          (page - 1) * size
        }&size=${size}`
    );
  }
  getAllDepartments() {
    return this.http.get<Department[]>(
      apiKey.api + `/api/v1/data/department/BOL/list`
    );
  }

  getDepartmentCoordenates(deptoId: number) {
    return this.http.get<Department>(
      apiKey.api + `/country/coordenates/${deptoId}`
    );
  }
  getDepartmentTotalData(deptoId: string) {
    return this.http.get<number>(
      apiKey.api + `/api/v1/data/department/${deptoId}/total`
    );
  }
}
