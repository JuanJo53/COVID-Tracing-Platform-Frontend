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
  getDepartmentDetails(deptoId: number) {
    return this.http.get<Department>(apiKey.api + `/country/${deptoId}`);
  }
  getAllDepartments() {
    return this.http.get<Department>(apiKey.api + `/country`);
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
