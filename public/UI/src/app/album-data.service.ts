import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumDataService {
  private baseURL: string = environment.baseURL + environment.musicSubRouteURL;

  constructor(private httpClient: HttpClient) {}

  public getAll(offset: number, limit: number): Observable<any[]> {
    const url = this.baseURL + environment.offsetSubRouteURL + offset + environment.limitSubRouteURL + limit;
    return this.httpClient.get<any[]>(url);
  }

  public getById(id: string): Observable<any> {
    const url = this.baseURL + '/' + id;
    return this.httpClient.get<any>(url);
  }

  public add(albumObject: any): Observable<any> {
    const apiUrl = this.baseURL;
    return this.httpClient.post(apiUrl, albumObject);
  }

  public update(albumObject: any, id: string): Observable<any> {
    const apiUrl = this.baseURL + '/' + id;
    return this.httpClient.patch(apiUrl, albumObject);
  }

  public delete(id: string): Observable<any> {
    const apiUrl = this.baseURL + '/' + id;
    return this.httpClient.delete(apiUrl);
  }
}
