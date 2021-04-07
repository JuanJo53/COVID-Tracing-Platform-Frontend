import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../authentication/token.service';
import apiKey from '../apiKey';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  authToken: string;
  headers: any;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  public upload(formData) {
    console.log(formData);
    return this.http.post<FormData>(apiKey.api, formData, {
      headers: this.headers,
      reportProgress: true,
      observe: 'events',
    });
  }
}
