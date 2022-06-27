import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";
  chCart:Cart[] = [];

  constructor(private userService:UserService, private cartService:CartService) { }

  ngOnInit(): void {
    this.displayCart();
  }

  displayCart(){
    console.log(this.cartService.checkoutCart);
    this.chCart = this.cartService.checkoutCart;
  }

  saveOrder(){
    console.log("saving order");
    
    let orderGames:Game[] = [];
    let gameIndex=0;
    for(let index=0; index<this.chCart.length; index++){
      for(let num=0; num<this.chCart[index].quantity; num++){
        orderGames[gameIndex++] = this.chCart[index].game;
      }
    }
    
    console.log(orderGames);
    
    let now = new Date();
    let order:Order = new Order(0,orderGames,now);
      console.log(order);
      this.cartService.saveOrder(order).subscribe({
        next:()=>{
          console.log("Order saved.");
        },
        error:()=>{
          console.log("Couldn't save order."); 
        }
      })
  }

}
