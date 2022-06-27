import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Game } from '../models/game';
import { User } from '../models/user';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl:string = 'http://localhost:8087/cart/';

  constructor(private http:HttpClient) { }

  checkoutCart:Cart[] = [];

  getCartItems(){

  }

  addToCart(cart:Cart):Observable<Game>{
    return this.http.post(this.cartUrl,cart,{withCredentials:true}) as Observable<Game>;
  }

  removeFromCart(gameId:number){
    return this.http.delete(this.cartUrl+gameId,{withCredentials:true}) as Observable<Game>;
  }

  removeAllCartItems(user:User){
    return this.http.delete(this.cartUrl+user,{withCredentials:true}) as Observable<Game>;
  }


  getOrderHistory():Observable<any>{
    console.log(this.cartUrl);
    return this.http.get(this.cartUrl+"order",{withCredentials:true});
  }

  saveOrder(order:Order):Observable<any>{
    return this.http.post(this.cartUrl,order,{withCredentials:true});
  }

  
}
