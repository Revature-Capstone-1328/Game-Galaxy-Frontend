import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { UserService } from 'src/app/services/user.service';
import { GameService } from 'src/app/services/game.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";
  chCart:Cart[] = [];
  totalPrice:number = 0;
  visible:boolean = true;
  messageVisible:boolean = false;

  constructor(private userService:UserService, private cartService:CartService,private gameService:GameService,) { }

  ngOnInit(): void {
    this.displayCart();
  }

  displayCart(){
 //   console.log(this.cartService.checkoutCart);
    this.chCart = this.cartService.checkoutCart;
    this.totalPrice = 0;
    for (let index = 0; index < this.chCart.length; index++) 
        this.totalPrice +=Number(this.chCart[index].game.retailPrice) * Number(this.chCart[index].quantity);
    this.totalPrice = Number(this.totalPrice.toFixed(2));

  }

  saveOrder(){
    console.log("saving order");
    
    // save the order to DB only if the user is logged in.
    if (this.username != "" && this.chCart.length > 0 ){
        let orderGames:Game[] = [];
        let gameIndex=0;
        for(let index=0; index<this.chCart.length; index++){
          for(let num=0; num<this.chCart[index].quantity; num++){
            orderGames[gameIndex++] = this.chCart[index].game;
          }
        }
        
        //console.log(orderGames);
        
        let now = new Date();
        let order:Order = new Order(0,orderGames,now);
        console.log(order)
          this.cartService.saveOrder(order).subscribe({
            next:()=>{
              console.log("Order saved.");
              this.messageVisible = true;
              this.visible = false

              this.cartService.checkoutCart = [];
              this.gameService.cartGames = [];
              //this.chCart = []; 
              //this.totalPrice = 0;
            },
            error:()=>{
              console.log("Couldn't save order."); 
            }
          })
      }else{
        this.messageVisible = true;
        this.visible = false
    
        this.cartService.checkoutCart = [];
        this.gameService.cartGames = [];
        //this.chCart = []; 
        //this.totalPrice = 0;
    }
  }

}

