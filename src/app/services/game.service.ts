import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl: string = 'https://www.cheapshark.com/api/1.0/';
  favUrl: string = 'http://localhost:8087/wishlist/game/';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl) as Observable<any>;
  }

  getDeal(dealId:string): Observable<any> {
    return this.http.get(this.apiUrl+dealId) as Observable<any>;
  }

  getFavorite(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id) as Observable<Game>;
  }

  addGameToFavorite(gameId: string): Observable<unknown> {
    return this.http.post(this.favUrl + gameId ,null, { withCredentials: true });
  }

  getMyFavoriteGames(): Observable<any> {
    return this.http.get(this.favUrl, { withCredentials: true }) as Observable<any>;
  }

  deleteGameFromFavorite(gameId: string): Observable<unknown> {
    return this.http.delete(this.favUrl + gameId, { withCredentials: true });
  }

}
