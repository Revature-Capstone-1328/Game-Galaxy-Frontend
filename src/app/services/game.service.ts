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

  favUrl: string = 'http://localhost:8087/wishlist/';

  cartGames:Game[] = [];

  constructor(private http: HttpClient) { }

  getGameFromAPI(gameID:number): Observable<any> {
    return this.http.get(this.apiUrl +"games?id="+gameID) as Observable<any>;
  }

  getDeal(dealId:string): Observable<any> {
    return this.http.get(this.apiUrl +"deals?id="+dealId) as Observable<any>;
  }

  getGameFromDatabase(gameID: number): Observable<any> {
    return this.http.get(this.dbUrl + gameID) as Observable<any>;
  }

  getAllGames(): Observable<any> {
    return this.http.get(this.dbUrl) as Observable<any>;
  }

  addGame(game:Game):Observable<Game>{
    console.log(game);
    return this.http.post(this.dbUrl,game) as Observable<Game>
  }

  getFavorite(id: number): Observable<any> {
    return this.http.get(this.favUrl + id) as Observable<Game>;
  }

  addGameToFavorite(gameID: number): Observable<unknown> {
    return this.http.post(this.favUrl + gameID ,null, { withCredentials: true });
  }

  getMyFavoriteGames(): Observable<any> {
    return this.http.get(this.favUrl, { withCredentials: true }) as Observable<any>;
  }

  deleteGameFromFavorite(gameID: number): Observable<unknown> {
    return this.http.delete(this.favUrl + gameID, { withCredentials: true });
  }

}
