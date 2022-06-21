import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl: string = 'https://www.cheapshark.com/api/1.0/';


  constructor(private http: HttpClient) { }

  getGame(gameId:string): Observable<any> {
    return this.http.get(this.apiUrl +"games?id="+gameId) as Observable<any>;
  }

  getDeal(dealId:string): Observable<any> {
    return this.http.get(this.apiUrl +"deals?id="+dealId) as Observable<any>;
  }
  addGame(game:Game):Observable<Game>{
    console.log(game);
    return this.http.post(this.apiUrl,game) as Observable<Game>
  }



}
