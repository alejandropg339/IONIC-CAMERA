import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVariable } from '../configurations/enviroment.config';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private token = GlobalVariable.TOKEN;
  private guid = GlobalVariable.GUID;
  private baseUrl = GlobalVariable.BASE_URL;
  private url =  `${this.baseUrl}?dir=apiexternalfiles&component=FileInput&tkn=${this.token}&refImport=${this.guid}&isDealer=false`;

  constructor(private http: HttpClient) { }

  uploadPhoto(blobData){
    const formData = new FormData();
    formData.append('FileInput', blobData);
    return this.http.post(this.url, formData );
  }
}
