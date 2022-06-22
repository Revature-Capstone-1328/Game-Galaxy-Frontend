import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";
  //username:string = "tanuja";
 
 cart:Cart[] = [];
 totalPrice:number = 0;
 

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
      this.loadCart();
  }


  loadCart(){

     /* if(this.username){
      // go to database
    }else{

      // display it from an array from store component
    } */

    let subGames:Game[] = [];
    let cartIndex = 0;
    let retailPrice:number = 0;

    this.cart = [];
    for (let index = 0; index < this.gameService.cartGames.length; index++) {
      retailPrice = 0;
      let searchItem = this.cart.find(ct => ct.game.gameID == this.gameService.cartGames[index].gameID);
      if (searchItem == undefined){
        retailPrice =  Number(this.gameService.cartGames[index].retailPrice);
        let cartItem:Cart = new Cart(index,this.gameService.cartGames[index],1,retailPrice);
        subGames = this.gameService.cartGames.filter(gm => {return gm.gameID == this.gameService.cartGames[index].gameID});
        for (let sub = 0; sub < subGames.length-1; sub++) {
          retailPrice += Number(this.gameService.cartGames[index].retailPrice) ;
          cartItem.quantity += 1;
        }
        cartItem.price = Number(retailPrice.toFixed(2)) ;
        this.totalPrice +=retailPrice;
        this.cart[cartIndex] = cartItem;
        cartIndex++;
      }
    }
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }
  
  removeFromCart(cartGame:Cart){
    let index:number = this.cart.indexOf(cartGame);
    this.totalPrice -= cartGame.price;
    this.totalPrice = Number(this.totalPrice.toFixed(2));
    this.cart.splice(index,1);

    let deleteIndex:number = 0;
    while( index <this.gameService.cartGames.length){
       if(this.gameService.cartGames[index].gameID == cartGame.game.gameID){
         this.gameService.cartGames.splice(index,1);
      }else{
        index++;
      }
    }

  }

}
