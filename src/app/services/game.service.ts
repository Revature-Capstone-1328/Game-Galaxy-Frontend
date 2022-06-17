import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl: string = 'https://www.cheapshark.com/api/1.0/';


  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl) as Observable<any>;
  }

  getDeal(dealId:string): Observable<any> {
    return this.http.get(this.apiUrl+dealId) as Observable<any>;
  }



}
