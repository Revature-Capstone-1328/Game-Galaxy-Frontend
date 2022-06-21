import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl: string = 'https://www.cheapshark.com/api/1.0/';
  dbUrl: string = 'http://localhost:8087/game/';


  constructor(private http: HttpClient) { }

  getGame(gameID:number): Observable<any> {
    return this.http.get(this.apiUrl +"games?id="+gameID) as Observable<any>;
  }

  getDeal(dealId:string): Observable<any> {
    return this.http.get(this.apiUrl +"deals?id="+dealId) as Observable<any>;
  }
  addGame(game:Game):Observable<Game>{
    console.log(game);
    return this.http.post(this.dbUrl,game) as Observable<Game>
  }



}
