import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../authentication/token.service';
import apiKey from '../apiKey';
import { FileRequest } from 'src/app/shared/models/file-request';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  authToken: string;
  headers: any;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authToken = this.tokenService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
  }

  public upload(formData, depto: string, municipality: boolean) {
    const userId = this.tokenService.getUserId();
    if (municipality) {
      console.log(municipality);
      return this.http.post<FormData>(
        apiKey.api + `/api/v1/data/${depto}/admin/${userId}`,
        formData,
        {
          headers: this.headers,
          reportProgress: true,
          observe: 'events',
        }
      );
    }
    console.log(depto);
    return this.http.post<FormData>(
      apiKey.api + `/api/v1/data/department/${depto}/admin/${userId}`,
      formData,
      {
        headers: this.headers,
        reportProgress: true,
        observe: 'events',
      }
    );
  }
  public download() {
    return this.http.get<any>(apiKey.api + '/download/MOCK_DATA.csv', {
      headers: this.headers,
      reportProgress: true,
      observe: 'events',
    });
  }
  getAllFiles() {
    return this.http.get<FileRequest[]>(apiKey.api, {
      headers: this.headers,
    });
  }
}
