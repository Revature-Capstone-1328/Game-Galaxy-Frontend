import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Game } from 'src/app/models/game';
import { Order } from 'src/app/models/order';
import { Orderhistory } from 'src/app/models/orderhistory';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";
  eMail?:string = (this.userService.activeUser)?this.userService.activeUser.eMail:"";
  newEmail:string="";
  newPassword:string="";
  confirmPassword:string="";
  unmatchedPassword:boolean = false;
  optionsVisibility:boolean = false;
  orders:Order[] = [];
  orderHistory:Orderhistory[] = [];


  constructor(private userService:UserService, private cartService:CartService) { }


  ngOnInit(): void {
  }

  updateEmail(){
    if(this.newEmail){
      this.userService.updateEmail(this.newEmail)?.subscribe({
        next:()=>{
          console.log("Email changed.");
          this.eMail = (this.userService.activeUser)?this.userService.activeUser.eMail:"";
        },
        error:()=>{
          console.log("Something went wrong changing the Email."); 
        }
      })
    }
  }

  updatePwd(){
    if (this.newPassword !== this.confirmPassword) {
      this.unmatchedPassword = true;
      console.log("Passwords don't match.")
    }
    if(this.newPassword === this.confirmPassword){
      this.unmatchedPassword = false;
      console.log("Changing password.");
      this.userService.updatePwd(this.newPassword)?.subscribe({
        next:()=>{
          console.log("Password changed.");
          this.eMail = (this.userService.activeUser)?this.userService.activeUser.eMail:"";
        },
        error:()=>{
          console.log("Something went wrong changing the Email."); 
        }
      })
    }
  }

  updateOptionsVisibility(){
    this.optionsVisibility = true;
  }

  updateUserInfo(){
    this.username = this.userService.activeUser?this.userService.activeUser.username:"";
    this.eMail = this.userService.activeUser?this.userService.activeUser.eMail:"";
  }

  register(){
  
    const m = 4;
    const n = 2;
    let arr = Array.from(Array(m),() => new Array(n));
    arr[0] = ["hello",2];
   // let arr = Array(m).fill().map(() => Array(n));
    console.log(arr);
  
   }

   
  
  viewHistory(){
    this.cartService.getOrderHistory().subscribe({
      next:(data:Order[])=>{
        console.log("Fetching Order history");
        console.log(data);
        if(data != null){            
          this.orders = data;
          this.orderHistory = [];
          let quantity:number = 0;
          let ordIndex = 0
          let gm = 0;
          let i = 0;
          let total:number = 0;
         
          for (let index =0; index< this.orders.length; index++){
            quantity = 0;
            gm = 0;
            i = 0;
            ordIndex = 0
            total = 0;
            let historyItem:Cart[] = [];

            while ( i < this.orders[index].games.length){
              if(this.orders[index].games[gm].gameID == this.orders[index].games[i].gameID){
                quantity += 1;
              }else{

                let cartItem:Cart = new Cart(ordIndex,this.orders[index].games[gm],quantity);
                historyItem[ordIndex] = cartItem;
                total += Number(this.orders[index].games[gm].retailPrice)*quantity;
                ordIndex++;
                quantity = 1;
                gm = i;
              }
             i++;
            }
            let cartItem:Cart = new Cart(ordIndex,this.orders[index].games[gm],quantity);
            historyItem[ordIndex] = cartItem;
            total += Number(this.orders[index].games[gm].retailPrice)*quantity;
            total = Number(total.toFixed(2));
            this.orderHistory[index] = new Orderhistory(this.orders[index].orderId, this.orders[index].orderDate, historyItem, total);
          }

      /*    for (let index=0; index < this.orderHistory.length; index++){
            console.log(this.orderHistory[index].orderId);
            console.log(this.orderHistory[index].orderDate);
        
            console.log(this.orderHistory[index].games);
            console.log(this.orderHistory[index].games[0].game.gameID);
            console.log(this.orderHistory[index].games[0].quantity);
            console.log(this.orderHistory[index].games.length);

            console.log("--------------------");
          }*/
        }else{
          console.log("Orders length is zero!");
        }
      },
      error:()=>{
        console.log("No Orders."); 
      }
    })
  }
}
