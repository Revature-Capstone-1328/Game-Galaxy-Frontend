import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';

  sharedUser:User = new User(0,"","","");

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {   
  }

  login(){
    let user:User = new User(0, this.username, this.password, "",);
    this.userService.attemptLogin(user).subscribe(
      {
        next:(authUser:User)=>{
          this.userService.activeUser = authUser;
          this.userService.loggedIn = true;
          this.router.navigate(["/store"]);
          this.sharedUser = authUser;
        },
        error:()=>{
          this.userService.activeUser = null;
          console.log("login failed");
          this.userService.loggedIn = false;
          this.router.navigate(["/register"]);
        }
      }
    );    
  }
}