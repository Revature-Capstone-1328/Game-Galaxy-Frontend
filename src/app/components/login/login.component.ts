import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {   
  }

  login(){
    let user:User = new User(0, this.username, this.password, "");
    this.userService.attemptLogin(user).subscribe(
      {
        next:(authUser:User)=>{
          if (this.compareHash(user.password, authUser.password)) {
            console.log("Logged in correctly");
            this.userService.activeUser = authUser;
            this.userService.isLoggedIn = true;
            this.router.navigate(["/store"]);
          } else {
            this.userService.activeUser = null;
            console.log("Login credentials incorrect");
            this.router.navigate(["/register"]);
          }
        },
        error:()=>{
          this.userService.activeUser = null;
          console.log("login failed");
          this.router.navigate(["/register"]);
        }
      }
    );    
  }

compareHash(password:string, hashed:string){
  return bcrypt.compareSync(password, hashed);
}

}