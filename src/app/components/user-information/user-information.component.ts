import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  newEmail:string="";
  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";
  eMail?:string = (this.userService.activeUser)?this.userService.activeUser.eMail:"";

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  update(){
    if(this.newEmail){
      this.userService.update(this.newEmail)?.subscribe({
        next:()=>{
          console.log("Email changed.");
        },
        error:()=>{
          console.log("Something went wrong changing the Email."); 
        }
      })
    }
  }

}
