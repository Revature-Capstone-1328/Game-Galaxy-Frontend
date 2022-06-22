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

    let games:Game[] = this.gameService.cartGames;
    let result:number = 0;
    let retailPrice:number = 0;

    console.log(this.gameService.cartGames.length);
    console.log(games.length);
    for (let index = 0; index < games.length; index++) {
      retailPrice = 0;
      console.log("logic begins")
      console.log(games);
      let cartItem:Cart = new Cart(index,games[index],1);
      result= games.lastIndexOf(games[index]);
      console.log(result, index);
      if ((games[index].gameID == games[result].gameID ) && (result != index)){
        retailPrice =  Number(cartItem.game.retailPrice);
        do{
          cartItem.quantity += 1;
          retailPrice += Number(cartItem.game.retailPrice);
          games.splice(result,1);
          result= games.lastIndexOf(games[index]);
        }while((games[index].gameID == games[result].gameID ) && (result != index))
        cartItem.game.retailPrice = retailPrice;
        this.totalPrice +=  retailPrice;
        this.cart[index] = cartItem;
        /*
        console.log(result, index);
        console.log(games[index].gameId);
        console.log(games[result].gameId);
        console.log(games);
        console.log(games.length);
        console.log(result,index) */
      }else{
        this.totalPrice +=  Number(games[index].retailPrice);
        this.cart[index] = cartItem;
      }
     
      console.log(this.cart);
     
      
    }
      
  }
        
  

  removeFromCart(){
    console.log()
  }

}
