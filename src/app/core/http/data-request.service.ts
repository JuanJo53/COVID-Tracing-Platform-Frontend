import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileRequest } from 'src/app/shared/models/file-request';
import apiKey from '../apiKey';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class DataRequestService {
  authToken: string;
  headers: any;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }
  getGlobalTotal() {
    return this.http.get<number>(apiKey.api + `/api/v1/data/world/total`, {
      headers: this.headers,
    });
  }

  getGlobalRequest(page: number, size: number) {
    return this.http.get<FileRequest[]>(
      apiKey.api + `/api/v1/data/world?page=${(page - 1) * size}&size=${size}`,
      { headers: this.headers }
    );
  }
  getBoliviaTotal() {
    return this.http.get<number>(apiKey.api + `/api/v1/data/department/total`, {
      headers: this.headers,
    });
  }
  getBoliviaRequest(page: number, size: number) {
    return this.http.get<FileRequest[]>(
      apiKey.api +
        `/api/v1/data/department?page=${(page - 1) * size}&size=${size}`
    );
  }
}
