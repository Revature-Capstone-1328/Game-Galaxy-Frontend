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

    let games:Game[] = [];
    let subGames:Game[] = [];
    let retailPrice:number = 0;
    let cartIndex = 0;

    games =  this.gameService.cartGames.slice();
    this.cart = [];
    //console.log(this.gameService.cartGames.length);
    console.log(games.length);
    for (let index = 0; index < games.length; index++) {
      retailPrice = 0;
      let searchItem = this.cart.find(ct => ct.game.gameID == games[index].gameID);
      if (searchItem == undefined){
        let cartItem:Cart = new Cart(index,games[index],1);
        console.log("display price")
        console.log(games[index].retailPrice);
        retailPrice =  Number(games[index].retailPrice);
        subGames = games.filter(gm => {return gm.gameID == games[index].gameID});
       // console.log(subGames);
        for (let sub = 0; sub < subGames.length-1; sub++) {
          retailPrice +=  Number(cartItem.game.retailPrice);
          cartItem.quantity += 1;
        }
        cartItem.game.retailPrice = retailPrice;
        this.totalPrice +=  retailPrice;
        this.cart[cartIndex] = cartItem;
        cartIndex++;
      }
    }
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }
  
  removeFromCart(cartGame:Cart){
    let index:number = this.cart.indexOf(cartGame);
    this.totalPrice -= cartGame.game.retailPrice;
    this.totalPrice = Number(this.totalPrice.toFixed(2));
    this.cart.splice(index,1);
  }

}
