import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url:string = "'http://localhost:8087/cart/";

  constructor(private http:HttpClient) { }

  getCartItems(){

  }

  addToCart(gameId:number):Observable<Game>{
    return this.http.post(this.url+gameId,{withCredentials:true}) as Observable<Game>;
  }

  removeFromCart(gameId:number){
    return this.http.delete(this.url+gameId,{withCredentials:true}) as Observable<Game>;
  }

  removeAllCartItems(user:User){
    return this.http.delete(this.url+user,{withCredentials:true}) as Observable<Game>;
  }

}
