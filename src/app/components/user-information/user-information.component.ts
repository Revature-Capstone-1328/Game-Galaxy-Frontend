import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
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


  constructor(private userService:UserService) { }

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

}
